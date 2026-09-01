// SauravKanchan NewsAPI Integration (No API Key Required) + Official NewsAPI fallback

const BASE_URL = 'https://saurav.tech/NewsAPI';
const SUPPORTED_COUNTRIES = ['in', 'us', 'gb', 'au', 'fr', 'ru'];
const VALID_CATEGORIES = ['general', 'business', 'technology', 'science', 'sports', 'entertainment', 'health'];

const normalizeNewsApiArticle = (article, country, category = 'general') => {
  return {
    title: article.title || 'News Headline',
    description: article.description || '',
    image: (article.urlToImage && article.urlToImage.startsWith('http')) ? article.urlToImage : null,
    source: article.source ? (article.source.name || 'News') : 'News',
    sourceId: article.source?.id || null,
    country: (country || 'WORLD').toUpperCase(),
    category: category || 'general',
    url: article.url,
    publishedAt: article.publishedAt ? new Date(article.publishedAt) : new Date()
  };
};

const fetchTopHeadlines = async ({ countries = ['IN'], categories = ['general', 'technology', 'business'], pageSize = 50 }) => {
  let allArticles = [];

  for (const country of countries) {
    const code = (country || 'in').toLowerCase();
    
    // If supported in SauravKanchan NewsAPI
    if (SUPPORTED_COUNTRIES.includes(code)) {
      const catsToFetch = categories.length > 0 ? categories.slice(0, 3) : ['general', 'business', 'technology'];
      
      for (const cat of catsToFetch) {
        const categoryKey = VALID_CATEGORIES.includes(cat.toLowerCase()) ? cat.toLowerCase() : 'general';
        const url = `${BASE_URL}/top-headlines/category/${categoryKey}/${code}.json`;
        
        try {
          const res = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.status === 'ok' && Array.isArray(data.articles)) {
              const normalized = data.articles
                .filter(a => a.url && a.title && a.title !== '[Removed]')
                .map(a => normalizeNewsApiArticle(a, country, categoryKey));
              allArticles = allArticles.concat(normalized);
            }
          }
        } catch (err) {
          console.warn(`Saurav NewsAPI error for ${code}/${categoryKey}:`, err.message);
        }
      }
    }
  }

  return allArticles;
};

const fetchEverything = async ({ q, sources, from, to, page = 1 }) => {
  if (sources && ['bbc-news', 'cnn', 'fox-news', 'google-news'].includes(sources)) {
    try {
      const url = `${BASE_URL}/everything/${sources}.json`;
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'ok' && Array.isArray(data.articles)) {
          return data.articles
            .filter(a => a.url && a.title && a.title !== '[Removed]')
            .map(a => normalizeNewsApiArticle(a, 'WORLD'));
        }
      }
    } catch (e) {
      console.warn('Fetch everything error:', e.message);
    }
  }
  return [];
};

module.exports = {
  fetchTopHeadlines,
  fetchEverything,
  normalizeNewsApiArticle
};
