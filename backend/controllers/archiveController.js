const caArticles = require('../data/caArticles');
const { 
  generalStudentArticles, 
  neetArticles, 
  jeeArticles, 
  satArticles, 
  ieltsArticles, 
  toeflArticles 
} = require('../data/examArticles');
const rssFetcher = require('../services/rssFetcher');

const archiveSectionsConfig = {
  ca: { 
    title: 'Chartered Accountancy — 60+ High-Yield Study Articles (2026 Edition)',
    subsections: ['foundation', 'intermediate', 'final'], 
    topics: ['All Topics', 'Auditing & Assurance', 'Taxation', 'Corporate Law', 'Accounting Standards (Ind AS)', 'Strategic Financial Management', 'Exam Preparation & Career'] 
  },
  students: {
    title: 'General Students Learning & Academic Archive',
    topics: ['All Topics', 'Education', 'Science', 'Technology', 'Current Affairs', 'Career', 'Economics']
  },
  neet: {
    title: 'NEET Medical Entrance Exam Archive (Biology, Chemistry, Physics)',
    topics: ['All Topics', 'Biology', 'Chemistry', 'Physics', 'Genetics', 'Human Physiology', 'Biomolecules']
  },
  jee: {
    title: 'JEE Engineering Entrance Exam Archive (Physics, Chemistry, Mathematics)',
    topics: ['All Topics', 'Physics', 'Chemistry', 'Mathematics', 'Mechanics', 'Calculus', 'Electrodynamics']
  },
  sat: {
    title: 'Digital SAT Exam Prep Archive (Reading, Writing & Math)',
    topics: ['All Topics', 'Reading & Writing', 'Math', 'Grammar', 'Algebra', 'Advanced Math']
  },
  ielts: {
    title: 'IELTS Prep Exam & Vocabulary Archive',
    topics: ['All Topics', 'Writing', 'Reading', 'Speaking', 'Listening', 'Vocabulary', 'Current Affairs']
  },
  toefl: {
    title: 'TOEFL Prep Exam & Academic English Archive',
    topics: ['All Topics', 'Writing', 'Reading', 'Academic English', 'Listening', 'Speaking', 'Vocabulary']
  }
};

const getArchiveSections = (req, res) => res.json(archiveSectionsConfig);

// Distribute articles across years 2017–2026 by index position
// so each year deterministically shows a unique subset of articles
const ALL_YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];

function assignYears(pool) {
  const total = pool.length;
  const perYear = Math.max(1, Math.ceil(total / ALL_YEARS.length));
  return pool.map((article, idx) => {
    const assignedYear = ALL_YEARS[Math.floor(idx / perYear)] || ALL_YEARS[ALL_YEARS.length - 1];
    return { ...article, year: assignedYear };
  });
}

const getArchiveArticles = async (req, res) => {
  try {
    let { section = 'ca', topic, year, page = 1, limit = 20, q } = req.query;
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;

    // Normalize section names
    if (section === 'general') section = 'students';

    let curatedPool = [];
    if (section === 'ca') {
      curatedPool = caArticles;
    } else if (section === 'students') {
      curatedPool = generalStudentArticles;
    } else if (section === 'neet') {
      curatedPool = neetArticles || [];
    } else if (section === 'jee') {
      curatedPool = jeeArticles || [];
    } else if (section === 'sat') {
      curatedPool = satArticles || [];
    } else if (section === 'ielts') {
      curatedPool = ieltsArticles;
    } else if (section === 'toefl') {
      curatedPool = toeflArticles;
    } else {
      curatedPool = generalStudentArticles;
    }

    let filtered = [...curatedPool];

    // Year filtering — only apply if a specific year is selected
    if (year && parseInt(year)) {
      const yearNum = parseInt(year);
      filtered = filtered.filter(a => a.year === yearNum);
    }

    // Topic filtering
    if (topic && topic.trim() && topic.toLowerCase() !== 'all-topics' && topic.toLowerCase() !== 'all topics') {
      const normTopic = topic.toLowerCase().replace(/[^a-z0-9]/g, '');
      filtered = filtered.filter(a => {
        const aTopic = (a.topic || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const aCat = (a.categoryName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const aCore = (a.coreConcept || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const aTitle = (a.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        return aTopic.includes(normTopic) || aCat.includes(normTopic) || aCore.includes(normTopic) || aTitle.includes(normTopic) || normTopic.includes(aTopic);
      });
    }

    // Search query filtering
    if (q && q.trim()) {
      const queryLower = q.toLowerCase();
      filtered = filtered.filter(a =>
        (a.title || '').toLowerCase().includes(queryLower) ||
        (a.description || '').toLowerCase().includes(queryLower) ||
        (a.coreConcept || '').toLowerCase().includes(queryLower) ||
        (a.content || '').toLowerCase().includes(queryLower)
      );
    }

    // Supplement with live topic articles if filtered is empty and a specific search query was requested
    if (filtered.length === 0 && q && q.trim()) {
      try {
        let liveSearchTopic = q;
        const liveArticles = await rssFetcher.fetchSearchFeed(liveSearchTopic);
        
        liveArticles.forEach((la, idx) => {
          filtered.push({
            id: `${section.toUpperCase()}-LIVE-${idx+1}`,
            code: `${section.toUpperCase()}-LIVE-${idx+1}`,
            title: la.title,
            description: la.description,
            content: la.description,
            section,
            topic: topic || 'Current Affairs',
            categoryName: section === 'ielts' ? 'IELTS Reading Material' : (section === 'toefl' ? 'TOEFL Academic Passage' : 'Academic Article'),
            difficulty: 'Intermediate',
            wordCount: Math.floor(Math.random() * 300) + 350,
            coreConcept: 'Key analytical and critical reading material for exam preparation and contextual analysis.',
            syllabus: 'Academic English & Comprehension Standards',
            url: la.url,
            isTextbookArticle: false,
            publishedAt: la.publishedAt || new Date(),
            year: 2026
          });
        });
      } catch (err) {}
    }

    const total = filtered.length;
    const skip = (pageNum - 1) * limitNum;
    const paginated = filtered.slice(skip, skip + limitNum);

    return res.json({
      articles: paginated.map(a => ({
        ...a,
        section,
        url: a.url || `javascript:openCaArticleModal('${a.id}')`,
        isTextbookArticle: a.content && a.content.length > 200,
        publishedAt: a.publishedAt || new Date(`${a.year || 2026}-01-01T00:00:00Z`)
      })),
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      availableYears: ALL_YEARS,
      source: 'curated-study-archive'
    });

  } catch (error) {
    console.error('getArchiveArticles error:', error);
    res.status(500).json({ message: 'Server error loading archive' });
  }
};

const getYearStats = (req, res) => {
  res.json({
    years: ALL_YEARS,
    totalArticles: 150
  });
};

module.exports = {
  getArchiveSections,
  getArchiveArticles,
  getYearStats
};