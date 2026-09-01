// Ultra-fast RSS & XML Feed Fetcher with Built-in Memory Cache (5-min TTL)

const feedCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getCached(key) {
  const item = feedCache.get(key);
  if (item && Date.now() - item.time < CACHE_TTL_MS) {
    return item.data;
  }
  return null;
}

function setCached(key, data) {
  feedCache.set(key, { time: Date.now(), data });
}

const COUNTRY_MAP = {
  'AF': 'Afghanistan', 'AL': 'Albania', 'DZ': 'Algeria', 'AO': 'Angola', 'AR': 'Argentina',
  'AM': 'Armenia', 'AU': 'Australia', 'AT': 'Austria', 'AZ': 'Azerbaijan', 'BD': 'Bangladesh',
  'BY': 'Belarus', 'BE': 'Belgium', 'BO': 'Bolivia', 'BA': 'Bosnia', 'BR': 'Brazil',
  'BG': 'Bulgaria', 'KH': 'Cambodia', 'CM': 'Cameroon', 'CA': 'Canada', 'CL': 'Chile',
  'CN': 'China', 'CO': 'Colombia', 'CG': 'Congo', 'HR': 'Croatia', 'CU': 'Cuba',
  'CZ': 'Czech Republic', 'DK': 'Denmark', 'EG': 'Egypt', 'ET': 'Ethiopia', 'FI': 'Finland',
  'FR': 'France', 'GH': 'Ghana', 'GR': 'Greece', 'GT': 'Guatemala', 'HN': 'Honduras',
  'HU': 'Hungary', 'IN': 'India', 'ID': 'Indonesia', 'IR': 'Iran', 'IQ': 'Iraq',
  'IE': 'Ireland', 'IL': 'Israel', 'IT': 'Italy', 'JM': 'Jamaica', 'JP': 'Japan',
  'JO': 'Jordan', 'KZ': 'Kazakhstan', 'KE': 'Kenya', 'KR': 'South Korea', 'KW': 'Kuwait',
  'LA': 'Laos', 'LB': 'Lebanon', 'LY': 'Libya', 'MY': 'Malaysia', 'MX': 'Mexico',
  'MA': 'Morocco', 'MM': 'Myanmar', 'NP': 'Nepal', 'NL': 'Netherlands', 'NZ': 'New Zealand',
  'NG': 'Nigeria', 'NO': 'Norway', 'OM': 'Oman', 'PK': 'Pakistan', 'PH': 'Philippines',
  'PL': 'Poland', 'PT': 'Portugal', 'QA': 'Qatar', 'RO': 'Romania', 'RU': 'Russia',
  'RW': 'Rwanda', 'SA': 'Saudi Arabia', 'SN': 'Senegal', 'RS': 'Serbia', 'SG': 'Singapore',
  'SK': 'Slovakia', 'ZA': 'South Africa', 'SS': 'South Sudan', 'ES': 'Spain', 'LK': 'Sri Lanka',
  'SD': 'Sudan', 'SE': 'Sweden', 'CH': 'Switzerland', 'SY': 'Syria', 'TW': 'Taiwan',
  'TZ': 'Tanzania', 'TH': 'Thailand', 'TN': 'Tunisia', 'TR': 'Turkey', 'UG': 'Uganda',
  'UA': 'Ukraine', 'AE': 'UAE', 'GB': 'United Kingdom', 'US': 'United States', 'UY': 'Uruguay',
  'UZ': 'Uzbekistan', 'VE': 'Venezuela', 'VN': 'Vietnam', 'YE': 'Yemen', 'ZM': 'Zambia', 'ZW': 'Zimbabwe'
};

const TOPIC_URLS = {
  'technology': 'https://news.google.com/rss/search?q=technology+AI+software+when:3d&hl=en-US&gl=US&ceid=US:en',
  'tech': 'https://news.google.com/rss/search?q=technology+AI+software+when:3d&hl=en-US&gl=US&ceid=US:en',
  'business': 'https://news.google.com/rss/search?q=business+finance+economy+when:3d&hl=en-US&gl=US&ceid=US:en',
  'science': 'https://news.google.com/rss/search?q=science+research+space+when:3d&hl=en-US&gl=US&ceid=US:en',
  'sports': 'https://news.google.com/rss/search?q=sports+football+cricket+when:3d&hl=en-US&gl=US&ceid=US:en',
  'entertainment': 'https://news.google.com/rss/search?q=entertainment+movies+cinema+when:3d&hl=en-US&gl=US&ceid=US:en',
  'health': 'https://news.google.com/rss/search?q=health+medicine+healthcare+when:3d&hl=en-US&gl=US&ceid=US:en',
  'world': 'https://news.google.com/rss/search?q=world+news+global+when:3d&hl=en-US&gl=US&ceid=US:en',
  'education': 'https://news.google.com/rss/search?q=education+university+students+exams+colleges+when:3d&hl=en-US&gl=US&ceid=US:en'
};

function cleanHtml(str) {
  if (!str) return '';
  return str
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

function parseTitleAndSource(rawTitle) {
  let title = cleanHtml(rawTitle || 'News Update');
  let source = 'News Source';
  if (title.includes(' - ')) {
    const parts = title.split(' - ');
    source = parts.pop().trim();
    title = parts.join(' - ').trim();
  }
  return { title, source };
}

function parseFeedXml(xmlText, defaultCountry = 'WORLD', defaultCategory = 'world', defaultSource = null) {
  const articles = [];
  const items = xmlText.match(/<item[\s\S]*?<\/item>/gi) || [];

  for (const item of items) {
    const rawTitle = (item.match(/<title[\s\S]*?>([\s\S]*?)<\/title>/i) || [])[1] || '';
    const rawLink = (item.match(/<link[\s\S]*?>([\s\S]*?)<\/link>/i) || [])[1] || '';
    const rawPubDate = (item.match(/<pubDate[\s\S]*?>([\s\S]*?)<\/pubDate>/i) || [])[1] || '';
    const rawDesc = (item.match(/<description[\s\S]*?>([\s\S]*?)<\/description>/i) || [])[1] || '';
    const rawSource = (item.match(/<source[\s\S]*?>([\s\S]*?)<\/source>/i) || [])[1] || '';

    // Extract Image
    let img = (item.match(/<media:(?:content|thumbnail)[^>]+url="([^"]+)"/i) || [])[1] ||
              (item.match(/<enclosure[^>]+url="([^"]+)"/i) || [])[1] || null;

    if (!img) {
      const imgMatch = rawDesc.match(/<img[^>]+src=["']([^"'>]+)["']/i);
      if (imgMatch) img = imgMatch[1];
    }

    if (img && (img.includes('feedburner') || img.includes('1x1') || img.includes('pixel'))) {
      img = null;
    }

    const { title, source: extractedSource } = parseTitleAndSource(rawTitle);
    const finalSource = cleanHtml(rawSource) || (defaultSource ? defaultSource.name : (extractedSource || 'Global News'));
    const link = cleanHtml(rawLink);

    if (title && link) {
      articles.push({
        title,
        description: cleanHtml(rawDesc).slice(0, 350),
        image: img || null,
        source: finalSource,
        sourceId: defaultSource ? defaultSource.id : 'gnews-live',
        country: defaultCountry,
        category: defaultCategory,
        url: link,
        publishedAt: rawPubDate ? new Date(rawPubDate) : new Date()
      });
    }
  }
  return articles;
}

async function fetchWithTimeout(url, timeoutMs = 12000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*'
      }
    });
    clearTimeout(t);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.text();
  } catch (err) {
    clearTimeout(t);
    return null;
  }
}

const fetchFeed = async (source) => {
  const cacheKey = `src:${source.id || source.rssUrl}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const xml = await fetchWithTimeout(source.rssUrl, 4000);
  if (!xml) return [];
  const articles = parseFeedXml(xml, source.country || 'WORLD', source.category || 'world', source);
  setCached(cacheKey, articles);
  return articles;
};

const fetchMultipleFeeds = async (sources) => {
  const promises = sources.map(s => fetchFeed(s));
  const results = await Promise.allSettled(promises);
  let articles = [];
  results.forEach(r => {
    if (r.status === 'fulfilled' && Array.isArray(r.value)) {
      articles = articles.concat(r.value);
    }
  });
  return articles;
};

const fetchCountryFeed = async (countryCode) => {
  const code = (countryCode || 'IN').toUpperCase();
  const countryName = COUNTRY_MAP[code] || code;

  const cacheKey = `country:${code}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(countryName)}+when:3d&hl=en-US&gl=US&ceid=US:en`;
  const xml = await fetchWithTimeout(url, 12000);
  if (!xml) return [];

  const articles = parseFeedXml(xml, code, 'world');
  setCached(cacheKey, articles);
  return articles;
};

const fetchCategoryFeed = async (category, countryCode = null) => {
  const cat = (category || 'general').toLowerCase();
  const cacheKey = `cat:${cat}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const targetUrl = TOPIC_URLS[cat] || `https://news.google.com/rss/search?q=${encodeURIComponent(cat)}+when:3d&hl=en-US&gl=US&ceid=US:en`;
  const xml = await fetchWithTimeout(targetUrl, 12000);
  if (!xml) return [];

  const normCat = cat === 'tech' ? 'technology' : cat;
  const articles = parseFeedXml(xml, 'WORLD', normCat);
  setCached(cacheKey, articles);
  return articles;
};

const fetchSearchFeed = async (query, countryCode = null) => {
  if (!query || !query.trim()) return [];
  const q = query.trim();
  const cacheKey = `search:${q.toLowerCase()}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}+when:7d&hl=en-US&gl=US&ceid=US:en`;
  const xml = await fetchWithTimeout(url, 12000);
  if (!xml) return [];

  const articles = parseFeedXml(xml, countryCode ? countryCode.toUpperCase() : 'WORLD', 'world');
  setCached(cacheKey, articles);
  return articles;
};

module.exports = {
  fetchFeed,
  fetchMultipleFeeds,
  fetchCountryFeed,
  fetchCategoryFeed,
  fetchSearchFeed,
  normalizeArticle: (item, source) => item,
  extractImageFromContent: () => null,
  COUNTRY_MAP
};
