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
  'technology': 'https://news.google.com/rss/search?q=technology+AI+software+when:2d&hl=en-US&gl=US&ceid=US:en',
  'tech': 'https://news.google.com/rss/search?q=technology+AI+software+when:2d&hl=en-US&gl=US&ceid=US:en',
  'business': 'https://news.google.com/rss/search?q=business+finance+economy+when:2d&hl=en-US&gl=US&ceid=US:en',
  'science': 'https://news.google.com/rss/search?q=science+research+space+when:2d&hl=en-US&gl=US&ceid=US:en',
  'sports': 'https://news.google.com/rss/search?q=sports+football+cricket+when:2d&hl=en-US&gl=US&ceid=US:en',
  'entertainment': 'https://news.google.com/rss/search?q=entertainment+movies+cinema+when:2d&hl=en-US&gl=US&ceid=US:en',
  'health': 'https://news.google.com/rss/search?q=health+medicine+healthcare+when:2d&hl=en-US&gl=US&ceid=US:en',
  'world': 'https://news.google.com/rss/search?q=world+news+global+when:2d&hl=en-US&gl=US&ceid=US:en',
  'education': 'https://news.google.com/rss/search?q=education+university+students+exams+colleges+when:2d&hl=en-US&gl=US&ceid=US:en'
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

const CATEGORY_EDITORIAL_IMAGES = {
  technology: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  ],
  business: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80'
  ],
  science: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80'
  ],
  sports: [
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512719994953-9cfdd9284ec0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80'
  ],
  education: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80'
  ],
  world: [
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1508672019048-805b876b67e2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80'
  ]
};

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < (str || '').length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return hash;
}

function assignUniqueArticleImages(articles) {
  if (!Array.isArray(articles)) return [];
  const usedImages = new Set();

  return articles.map((a, idx) => {
    let img = a.image;
    const cat = (a.category || 'world').toLowerCase();
    const pool = CATEGORY_EDITORIAL_IMAGES[cat] || CATEGORY_EDITORIAL_IMAGES.world;

    if (!img || typeof img !== 'string' || !img.startsWith('http') || usedImages.has(img)) {
      let chosen = null;
      let startIdx = (Math.abs(hashString(a.title || 'news' + idx)) + idx) % pool.length;
      for (let i = 0; i < pool.length; i++) {
        const candidate = pool[(startIdx + i) % pool.length];
        if (!usedImages.has(candidate)) {
          chosen = candidate;
          break;
        }
      }
      if (!chosen) {
        const fallbackPool = CATEGORY_EDITORIAL_IMAGES.world;
        for (let i = 0; i < fallbackPool.length; i++) {
          const candidate = fallbackPool[(startIdx + i) % fallbackPool.length];
          if (!usedImages.has(candidate)) {
            chosen = candidate;
            break;
          }
        }
      }
      img = chosen || `${pool[idx % pool.length]}&sig=${idx}`;
    }

    usedImages.add(img);
    return { ...a, image: img };
  });
}

function parseFeedXml(xmlText, defaultCountry = 'WORLD', defaultCategory = 'world', defaultSource = null) {
  const articles = [];
  const items = xmlText.match(/<item[\s\S]*?<\/item>/gi) || [];

  for (const item of items) {
    const rawTitle = (item.match(/<title[\s\S]*?>([\s\S]*?)<\/title>/i) || [])[1] || '';
    const rawLink = (item.match(/<link[\s\S]*?>([\s\S]*?)<\/link>/i) || [])[1] || '';
    const rawPubDate = (item.match(/<pubDate[\s\S]*?>([\s\S]*?)<\/pubDate>/i) || [])[1] || '';
    const rawDesc = (item.match(/<description[\s\S]*?>([\s\S]*?)<\/description>/i) || [])[1] || '';
    const rawContent = (item.match(/<content:encoded[\s\S]*?>([\s\S]*?)<\/content:encoded>/i) || [])[1] || '';
    const rawSource = (item.match(/<source[\s\S]*?>([\s\S]*?)<\/source>/i) || [])[1] || '';

    // Advanced Multi-Source Image Extraction
    let img = (item.match(/<media:(?:content|thumbnail)[^>]+url=["']([^"']+)["']/i) || [])[1] ||
              (item.match(/<enclosure[^>]+url=["']([^"']+)["']/i) || [])[1] || null;

    if (!img) {
      // Check for <img src="..." in description or content:encoded
      const combinedHtml = rawContent + ' ' + rawDesc;
      const imgMatch = combinedHtml.match(/<img[^>]+src=["']([^"'>]+)["']/i);
      if (imgMatch) img = imgMatch[1];
    }

    // Clean & validate extracted image URL
    if (img) {
      img = img.replace(/&amp;/g, '&').trim();
      if (img.startsWith('//')) img = 'https:' + img;
      if (img.includes('1x1') || img.includes('pixel') || img.includes('feedburner') || img.includes('spacer.gif') || !img.startsWith('http')) {
        img = null;
      }
    }

    const { title, source: extractedSource } = parseTitleAndSource(rawTitle);
    const finalSource = cleanHtml(rawSource) || (defaultSource ? defaultSource.name : (extractedSource || 'Global News'));
    const link = cleanHtml(rawLink);

    const finalImage = img || null;

    let parsedDate = rawPubDate ? new Date(rawPubDate) : new Date();
    if (isNaN(parsedDate.getTime())) parsedDate = new Date();

    if (title && link) {
      articles.push({
        title,
        description: cleanHtml(rawDesc).slice(0, 350),
        image: finalImage,
        source: finalSource,
        sourceId: defaultSource ? defaultSource.id : 'gnews-live',
        country: defaultCountry,
        category: defaultCategory,
        url: link,
        publishedAt: parsedDate
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

  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(countryName)}+when:2d&hl=en-US&gl=US&ceid=US:en`;
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
  assignUniqueArticleImages,
  normalizeArticle: (item, source) => item,
  extractImageFromContent: () => null,
  COUNTRY_MAP
};
