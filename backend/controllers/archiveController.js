const caArticles = require('../data/caArticles');
const { generalStudentArticles, ieltsArticles, toeflArticles } = require('../data/examArticles');
const rssFetcher = require('../services/rssFetcher');

const archiveSectionsConfig = {
  ca: { 
    title: 'Chartered Accountancy — 50 High-Yield Study Articles (2026 Edition)',
    subsections: ['foundation', 'intermediate', 'final'], 
    topics: ['Auditing & Assurance', 'Taxation', 'Corporate Law', 'Accounting Standards (Ind AS)', 'Strategic Financial Management', 'Exam Preparation & Career'] 
  },
  students: {
    title: 'General Students Learning & Academic Archive',
    topics: ['All Topics', 'Education', 'Science', 'Technology', 'Current Affairs', 'Career', 'Economics']
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

function getAvailableYears() {
  const years = [];
  for (let y = 2026; y >= 2017; y--) years.push(y);
  return years;
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
    } else if (section === 'ielts') {
      curatedPool = ieltsArticles;
    } else if (section === 'toefl') {
      curatedPool = toeflArticles;
    } else {
      curatedPool = generalStudentArticles;
    }

    let filtered = [...curatedPool];

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

    // Supplement with live topic articles if requested or for variety
    if (filtered.length < limitNum && section !== 'ca') {
      try {
        let liveSearchTopic = topic || section;
        if (section === 'ielts' || section === 'toefl') liveSearchTopic = 'academic reading ' + (topic || 'essay');
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
            publishedAt: la.publishedAt || new Date()
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
        publishedAt: a.publishedAt || new Date('2026-01-01T00:00:00Z')
      })),
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      availableYears: getAvailableYears(),
      source: 'curated-study-archive'
    });

  } catch (error) {
    console.error('getArchiveArticles error:', error);
    res.status(500).json({ message: 'Server error loading archive' });
  }
};

const getYearStats = (req, res) => {
  res.json({
    years: getAvailableYears(),
    totalArticles: 150
  });
};

module.exports = {
  getArchiveSections,
  getArchiveArticles,
  getYearStats
};