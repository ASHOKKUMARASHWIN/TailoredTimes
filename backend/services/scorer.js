const professionCategoryMap = {
  'student': ['education','technology','science','career','world'],
  'it-employee': ['technology','ai','cybersecurity','startups','business'],
  'teacher': ['education','technology','science','world'],
  'business-professional': ['business','finance','economics','startups','world'],
  'stock-market': ['finance','stock-market','economics','business'],
  'healthcare': ['health','science','technology','world'],
  'legal': ['politics','world','business','economics'],
  'scientist': ['science','technology','ai','space','environment'],
  'engineer': ['technology','ai','space','engineering','science'],
  'marketing': ['business','startups','technology','economics'],
  'journalist': ['world','politics','technology','business'],
  'government': ['politics','world','economics','education'],
  'developer': ['technology','ai','cybersecurity','startups','gaming'],
  'entrepreneur': ['startups','business','technology','finance','innovation']
};

const professionCategoryMatch = (profession, category) => {
  if (!profession || !category) return false;
  const mappedCategories = professionCategoryMap[profession.toLowerCase()];
  if (!mappedCategories) return false;
  return mappedCategories.includes(category.toLowerCase());
};

const freshnessBonus = (publishedAt) => {
  if (!publishedAt) return 0;
  const now = new Date();
  const diffHours = (now - new Date(publishedAt)) / (1000 * 60 * 60);
  
  if (diffHours <= 24) return 20;
  if (diffHours <= 48) return 10;
  return 0;
};

const keywordMatcher = require('./keywordMatcher');

const scoreArticle = (article, userPrefs) => {
  let score = 0;
  
  // 1. Primary: User's selected topic interests (+100)
  if (userPrefs.interests && userPrefs.interests.some(i => (article.category || '').toLowerCase() === i.toLowerCase())) {
    score += 100;
  }
  
  // 2. Profession alignment (+60)
  if (professionCategoryMatch(userPrefs.profession, article.category)) {
    score += 60;
  }
  
  // 3. User's selected country bonus (+30)
  if (userPrefs.countries && userPrefs.countries.includes(article.country)) {
    score += 30;
  }
  
  // 4. Preferred source (+20)
  if (userPrefs.preferredSources && userPrefs.preferredSources.includes(article.sourceId)) {
    score += 20;
  }

  // 5. Keyword relevance bonus from title and description
  score += keywordMatcher.calculateKeywordScore(article, userPrefs);
  
  // 6. Recency freshness bonus (0-20)
  score += freshnessBonus(article.publishedAt);
  
  return score;
};

module.exports = {
  scoreArticle,
  professionCategoryMap,
  professionCategoryMatch,
  freshnessBonus
};
