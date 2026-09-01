const mongoose = require('mongoose');
const Article = require('../models/Article');
const sourcesConfig = require('../config/sources');
const rssFetcher = require('../services/rssFetcher');
const newsApiService = require('../services/newsApiService');
const scorer = require('../services/scorer');
const keywordMatcher = require('../services/keywordMatcher');
const imageScraper = require('../services/imageScraper');

// Profession to category search mapping
const PROFESSION_TOPICS = {
  'student': ['education', 'science', 'technology', 'career'],
  'developer': ['technology', 'ai', 'software', 'startups'],
  'it-employee': ['technology', 'ai', 'cybersecurity', 'business'],
  'teacher': ['education', 'science', 'technology'],
  'business-professional': ['business', 'finance', 'economics', 'startups'],
  'investor': ['finance', 'stock-market', 'business', 'economics'],
  'healthcare': ['health', 'science', 'medicine'],
  'legal': ['politics', 'business', 'world'],
  'scientist': ['science', 'space', 'technology', 'research'],
  'engineer': ['technology', 'engineering', 'science'],
  'marketing': ['business', 'startups', 'technology'],
  'journalist': ['world', 'politics', 'technology'],
  'government': ['politics', 'economics', 'education'],
  'entrepreneur': ['startups', 'business', 'technology', 'finance']
};

/**
 * 1. GET /api/news/feed ("FOR YOU" / "My News")
 * Personalized Magazine: Focuses on user's selected interests, profession, and preferred topics.
 */
const getFeed = async (req, res) => {
  try {
    const user = req.user || {};
    let userCountries = [];
    if (req.query.countries) {
      userCountries = req.query.countries.split(',').map(c => c.trim().toUpperCase()).filter(Boolean);
    } else if (user.countries && user.countries.length > 0) {
      userCountries = user.countries.map(c => c.trim().toUpperCase());
    }

    let userInterests = [];
    if (req.query.interests) {
      userInterests = req.query.interests.split(',').map(i => i.trim().toLowerCase()).filter(Boolean);
    } else if (user.interests && user.interests.length > 0) {
      userInterests = user.interests.map(i => i.trim().toLowerCase());
    }

    const profession = (req.query.profession || user.profession || '').toLowerCase();
    const targetCountries = userCountries.length > 0 ? userCountries : ['IN'];
    const targetInterests = userInterests.length > 0 ? userInterests : ['technology', 'business', 'science'];

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    let feedArticles = [];

    // A. Fetch category-specific news matching user's interests
    const interestFetchPromises = targetInterests.slice(0, 4).map(async (interest) => {
      try {
        return await rssFetcher.fetchCategoryFeed(interest);
      } catch (e) {
        return [];
      }
    });

    // B. Fetch profession-related news
    const professionTopics = PROFESSION_TOPICS[profession] || [];
    const professionFetchPromises = professionTopics.slice(0, 2).map(async (topic) => {
      try {
        return await rssFetcher.fetchCategoryFeed(topic);
      } catch (e) {
        return [];
      }
    });

    // C. Fetch country news for ALL user's selected countries
    const countryFetchPromises = targetCountries.map(async (code) => {
      try {
        return await rssFetcher.fetchCountryFeed(code);
      } catch (e) {
        return [];
      }
    });

    // Run all fetches in parallel
    const [interestResults, professionResults, countryResults] = await Promise.all([
      Promise.all(interestFetchPromises),
      Promise.all(professionFetchPromises),
      Promise.all(countryFetchPromises)
    ]);

    interestResults.forEach(list => { if (Array.isArray(list)) feedArticles = feedArticles.concat(list); });
    professionResults.forEach(list => { if (Array.isArray(list)) feedArticles = feedArticles.concat(list); });

    // Include 2-3 top headlines from each user selected country
    targetCountries.forEach((code, idx) => {
      const list = countryResults[idx] || [];
      feedArticles = feedArticles.concat(list.slice(0, 3));
    });

    // Fallback if still low
    if (feedArticles.length < 10) {
      try {
        const topWorld = await rssFetcher.fetchCategoryFeed('world');
        feedArticles = feedArticles.concat(topWorld);
      } catch (e) {}
    }

    // Enrich and Score general interest articles
    const scoringUser = {
      countries: targetCountries,
      interests: targetInterests,
      profession,
      preferredSources: []
    };

    const enriched = feedArticles.map(a => keywordMatcher.enrichArticle(a));
    const dedupMap = new Map();
    enriched.forEach(a => { if (a && a.url && a.title) dedupMap.set(a.url, a); });
    let unique = Array.from(dedupMap.values());
    unique.forEach(a => { a.score = scorer.scoreArticle(a, scoringUser); });
    unique.sort((a, b) => (b.score - a.score) || (new Date(b.publishedAt) - new Date(a.publishedAt)));

    const outputArticles = unique;

    // Cache in DB if available
    if (mongoose.connection.readyState === 1 && outputArticles.length > 0) {
      Article.insertMany(outputArticles.slice(0, 40), { ordered: false }).catch(() => {});
    }

    // Paginate
    const skip = (page - 1) * limit;
    let paginatedArticles = outputArticles.slice(skip, skip + limit);

    // Scrape real og:image for articles missing images
    paginatedArticles = await imageScraper.enrichArticlesWithImages(paginatedArticles);

    res.json({
      articles: paginatedArticles,
      total: outputArticles.length,
      page,
      totalPages: Math.ceil(outputArticles.length / limit) || 1
    });

  } catch (error) {
    console.error('getFeed error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * 2. GET /api/news/my-countries ("MY COUNTRIES")
 * Pure National & Domestic News: Top domestic headlines, politics, governance and national affairs for each selected country.
 */
const getMyCountriesFeed = async (req, res) => {
  try {
    const user = req.user || {};
    let countries = [];
    if (req.query.countries) {
      countries = req.query.countries.split(',').map(c => c.trim().toUpperCase()).filter(Boolean);
    } else if (user.countries && user.countries.length > 0) {
      countries = user.countries.map(c => c.trim().toUpperCase());
    } else {
      countries = ['IN'];
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // Fetch EACH selected country's domestic news in parallel
    const countryFetchPromises = countries.map(async (c) => {
      let cArticles = [];
      const code = c.toUpperCase();

      // 1. Dynamic country news feed (Bing News RSS + Google News RSS with real photos)
      try {
        const countryNews = await rssFetcher.fetchCountryFeed(code);
        if (countryNews.length > 0) cArticles = cArticles.concat(countryNews);
      } catch (e) {}

      // 2. Curated national sources for this specific country
      try {
        const matchingSources = sourcesConfig.filter(s =>
          (s.country && s.country.toUpperCase() === code) ||
          (s.countries && s.countries.map(co => co.toUpperCase()).includes(code))
        ).slice(0, 6);
        if (matchingSources.length > 0) {
          const rssArts = await rssFetcher.fetchMultipleFeeds(matchingSources);
          if (rssArts.length > 0) {
            cArticles = cArticles.concat(rssArts.map(a => { a.country = code; return a; }));
          }
        }
      } catch (e) {}

      // 3. SauravKanchan general news for country
      try {
        const apiArts = await newsApiService.fetchTopHeadlines({ countries: [code], categories: ['general'] });
        if (apiArts.length > 0) cArticles = cArticles.concat(apiArts);
      } catch (e) {}

      return { country: code, articles: cArticles };
    });

    const results = await Promise.all(countryFetchPromises);

    // Freshness & deduplication per country
    const now = Date.now();
    const twentyFourHoursAgo = now - (24 * 60 * 60 * 1000);
    const fortyEightHoursAgo = now - (48 * 60 * 60 * 1000);

    const countryQueues = {};
    results.forEach(cr => {
      const enriched = cr.articles.map(a => keywordMatcher.enrichArticle(a));
      const map = new Map();
      enriched.forEach(a => { if (a && a.url && a.title) map.set(a.url, a); });
      let list = Array.from(map.values());

      // Sort by recency
      list.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

      const r24 = list.filter(a => new Date(a.publishedAt).getTime() >= twentyFourHoursAgo);
      countryQueues[cr.country] = (r24.length >= 4) ? r24 : list.filter(a => new Date(a.publishedAt).getTime() >= fortyEightHoursAgo);
      if (!countryQueues[cr.country] || countryQueues[cr.country].length === 0) {
        countryQueues[cr.country] = list;
      }
    });

    // Balanced Round-Robin Interleaving across all selected countries
    let interleaved = [];
    let hasMore = true;
    let index = 0;
    while (hasMore) {
      hasMore = false;
      for (const country of countries) {
        const queue = countryQueues[country] || [];
        if (index < queue.length) {
          interleaved.push(queue[index]);
          hasMore = true;
        }
      }
      index++;
      if (interleaved.length >= 100) break;
    }

    const combinedMap = new Map();
    interleaved.forEach(a => { if (a.url) combinedMap.set(a.url, a); });
    let finalArticles = Array.from(combinedMap.values());

    const skip = (page - 1) * limit;
    let pageArticles = finalArticles.slice(skip, skip + limit);
    pageArticles = await imageScraper.enrichArticlesWithImages(pageArticles);

    res.json({
      articles: pageArticles,
      total: finalArticles.length,
      page,
      totalPages: Math.ceil(finalArticles.length / limit) || 1
    });

  } catch (error) {
    console.error('getMyCountriesFeed error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * 3. GET /api/news/world ("WORLD")
 */
const getWorldNews = async (req, res) => {
  try {
    let articles = [];
    try {
      const apiArticles = await newsApiService.fetchTopHeadlines({
        countries: ['US', 'GB'],
        categories: ['general']
      });
      articles = articles.concat(apiArticles);
    } catch (e) {}

    const globalSources = sourcesConfig.filter(s => s.countries.includes('WORLD') || s.country === 'GB' || s.country === 'US').slice(0, 8);
    const liveArticles = await rssFetcher.fetchMultipleFeeds(globalSources);
    articles = articles.concat(liveArticles);

    try {
      const gNews = await rssFetcher.fetchCategoryFeed('world');
      articles = articles.concat(gNews);
    } catch (e) {}

    const map = new Map();
    articles.forEach(a => { if (a && a.url) map.set(a.url, a); });
    const unique = Array.from(map.values());
    unique.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    let result = unique.slice(0, 30);
    result = await imageScraper.enrichArticlesWithImages(result);
    res.json({ articles: result });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * 4. GET /api/news/category/:category
 */
const getCategoryFeed = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const categoryMap = {
      'tech': 'technology',
      'technology': 'technology',
      'business': 'business',
      'science': 'science',
      'sports': 'sports',
      'entertainment': 'entertainment',
      'education': 'education',
      'health': 'health'
    };
    const normCat = categoryMap[(category || '').toLowerCase()] || (category || '').toLowerCase();

    const user = req.user || {};
    let targetCountries = ['IN', 'US', 'GB'];
    if (req.query.countries) {
      targetCountries = req.query.countries.split(',').map(c => c.trim().toUpperCase()).filter(Boolean);
    } else if (user.countries && user.countries.length > 0) {
      targetCountries = user.countries.map(c => c.trim().toUpperCase());
    }

    let articles = [];

    // 1. Fetch from SauravKanchan NewsAPI
    try {
      const apiArticles = await newsApiService.fetchTopHeadlines({
        countries: targetCountries,
        categories: [normCat]
      });
      if (apiArticles.length > 0) {
        articles = articles.concat(apiArticles.map(a => { a.category = normCat; return a; }));
      }
    } catch (e) {}

    // 2. Fetch from curated sources matching category
    try {
      const catSources = sourcesConfig.filter(s => s.category === normCat || s.category === category).slice(0, 8);
      if (catSources.length > 0) {
        const liveRss = await rssFetcher.fetchMultipleFeeds(catSources);
        articles = articles.concat(liveRss.map(a => { a.category = normCat; return a; }));
      }
    } catch (e) {}

    // 3. Dynamic category news for target countries
    try {
      for (const code of targetCountries.slice(0, 4)) {
        const dynamicCatNews = await rssFetcher.fetchCategoryFeed(normCat, code);
        if (dynamicCatNews.length > 0) {
          articles = articles.concat(dynamicCatNews);
        }
      }
      const globalCatNews = await rssFetcher.fetchCategoryFeed(normCat);
      if (globalCatNews.length > 0) {
        articles = articles.concat(globalCatNews);
      }
    } catch (e) {}

    // Keyword enrichment & deduplication
    articles = articles.map(a => keywordMatcher.enrichArticle(a));
    const map = new Map();
    articles.forEach(a => { if (a && a.url) map.set(a.url, a); });
    let unique = Array.from(map.values());

    // Score & Sort
    const scoringUser = {
      countries: targetCountries,
      interests: [normCat],
      profession: user.profession || '',
      preferredSources: []
    };
    unique.forEach(a => { a.score = scorer.scoreArticle(a, scoringUser); });
    unique.sort((a, b) => (b.score - a.score) || (new Date(b.publishedAt) - new Date(a.publishedAt)));

    // 24-Hour filter
    const now = Date.now();
    const twentyFourHoursAgo = now - (24 * 60 * 60 * 1000);
    const fortyEightHoursAgo = now - (48 * 60 * 60 * 1000);
    const r24 = unique.filter(a => new Date(a.publishedAt).getTime() >= twentyFourHoursAgo);
    const finalArticles = (r24.length >= 8) ? r24 : unique.filter(a => new Date(a.publishedAt).getTime() >= fortyEightHoursAgo);
    const outputArticles = (finalArticles.length > 0) ? finalArticles : unique;

    const skip = (page - 1) * limit;
    let pageArticles = outputArticles.slice(skip, skip + limit);
    pageArticles = await imageScraper.enrichArticlesWithImages(pageArticles);

    res.json({
      articles: pageArticles,
      total: outputArticles.length,
      page,
      totalPages: Math.ceil(outputArticles.length / limit) || 1
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * 5. GET /api/news/search
 */
const searchArticles = async (req, res) => {
  try {
    const { q, country, category } = req.query;
    const allSources = sourcesConfig.slice(0, 12);
    const fetched = await rssFetcher.fetchMultipleFeeds(allSources);
    const queryLower = (q || '').toLowerCase();
    
    let articles = fetched.filter(a =>
      (!q || a.title?.toLowerCase().includes(queryLower) || a.description?.toLowerCase().includes(queryLower)) &&
      (!country || a.country === country) &&
      (!category || a.category === category)
    );

    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * 6. GET /api/news/live-stats
 */
const getLiveStats = async (req, res) => {
  try {
    let totalArticles = 120;
    let lastUpdated = new Date();
    if (mongoose.connection.readyState === 1) {
      try {
        totalArticles = await Article.countDocuments();
        const latestArticle = await Article.findOne().sort({ fetchedAt: -1 });
        if (latestArticle) lastUpdated = latestArticle.fetchedAt;
      } catch (e) {}
    }
    
    res.json({
      totalArticles,
      lastUpdated,
      storiesCount: totalArticles
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getFeed,
  getWorldNews,
  getCategoryFeed,
  searchArticles,
  getMyCountriesFeed,
  getLiveStats
};
