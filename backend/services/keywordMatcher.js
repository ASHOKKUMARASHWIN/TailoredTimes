const COUNTRY_KEYWORDS = {
  'IN': ['india', 'indian', 'delhi', 'mumbai', 'bengaluru', 'bangalore', 'chennai', 'hyderabad', 'kolkata', 'modi', 'narendra modi', 'sensex', 'nifty', 'rupee', 'isro', 'rbi', 'lok sabha', 'tamil nadu', 'karnataka', 'maharashtra', 'gujarat', 'uttar pradesh', 'bihar', 'punjab', 'kerala', 'bollywood', 'bcci', 'ipl', 'adani', 'tata', 'reliance'],
  'US': ['united states', 'usa', 'america', 'american', 'washington', 'new york', 'california', 'texas', 'florida', 'biden', 'trump', 'donald trump', 'kamala harris', 'white house', 'capitol', 'pentagon', 'wall street', 'nasdaq', 'dow jones', 'federal reserve', 'fed', 'fbi', 'cia', 'silicon valley', 'hollywood', 'sec', 'supreme court'],
  'GB': ['united kingdom', 'uk', 'britain', 'british', 'england', 'scotland', 'wales', 'london', 'manchester', 'birmingham', 'starmer', 'keir starmer', 'sunak', 'rishi sunak', 'downing street', 'westminster', 'parliament', 'bank of england', 'nhs', 'pound sterling', 'premier league', 'bbc', 'ftse'],
  'AF': ['afghanistan', 'afghan', 'afghans', 'kabul', 'kandahar', 'herat', 'taliban', 'pajhwok', 'tolo', 'taliban regime'],
  'BR': ['brazil', 'brazilian', 'brasilia', 'sao paulo', 'rio de janeiro', 'lula', 'da silva', 'bolsonaro', 'petrobras', 'amazon rainforest', 'real', 'bovespa', 'copacabana'],
  'AU': ['australia', 'australian', 'canberra', 'sydney', 'melbourne', 'brisbane', 'perth', 'albanese', 'anthony albanese', 'asx', 'rba', 'afl', 'great barrier reef'],
  'CA': ['canada', 'canadian', 'ottawa', 'toronto', 'vancouver', 'montreal', 'quebec', 'trudeau', 'justin trudeau', 'bank of canada', 'parliament hill', 'tsx'],
  'DE': ['germany', 'german', 'berlin', 'munich', 'frankfurt', 'hamburg', 'scholz', 'olaf scholz', 'bundestag', 'bundeswehr', 'dax', 'lufthansa', 'volkswagen', 'siemens'],
  'FR': ['france', 'french', 'paris', 'marseille', 'lyon', 'macron', 'emmanuel macron', 'elysee', 'cac 40', 'louvre', 'seine'],
  'JP': ['japan', 'japanese', 'tokyo', 'osaka', 'kyoto', 'kishida', 'fumio kishida', 'yen', 'bank of japan', 'nikkei', 'diet', 'honda', 'toyota', 'sony'],
  'CN': ['china', 'chinese', 'beijing', 'shanghai', 'shenzhen', 'guangzhou', 'xi jinping', 'communist party', 'yuan', 'renminbi', 'pboc', 'pla', 'taiwan strait', 'alibaba', 'tencent'],
  'RU': ['russia', 'russian', 'moscow', 'st petersburg', 'putin', 'vladimir putin', 'kremlin', 'duma', 'ruble', 'gazprom', 'tass'],
  'SG': ['singapore', 'singaporean', 'changi', 'jurong', 'lawrence wong', 'lee hsien loong', 'mas', 'sgx', 'straits times', 'temasek'],
  'AE': ['uae', 'united arab emirates', 'dubai', 'abu dhabi', 'sharjah', 'emirates', 'dirham', 'burj khalifa'],
  'SA': ['saudi arabia', 'saudi', 'riyadh', 'jeddah', 'mecca', 'medina', 'crown prince', 'mbs', 'aramco', 'riyal'],
  'IL': ['israel', 'israeli', 'jerusalem', 'tel aviv', 'netanyahu', 'knesset', 'idf', 'mossad', 'shekel'],
  'ZA': ['south africa', 'south african', 'johannesburg', 'cape town', 'pretoria', 'ramaphosa', 'anc', 'rand'],
  'PK': ['pakistan', 'pakistani', 'islamabad', 'karachi', 'lahore', 'rawalpindi', 'shehbaz sharif', 'imran khan', 'rupee'],
  'BD': ['bangladesh', 'bangladeshi', 'dhaka', 'chittagong', 'yunus', 'muhammad yunus', 'hasina', 'taka']
};

const CATEGORY_KEYWORDS = {
  'technology': ['ai', 'artificial intelligence', 'machine learning', 'software', 'hardware', 'chip', 'semiconductor', 'nvidia', 'apple', 'google', 'microsoft', 'meta', 'openai', 'cybersecurity', 'crypto', 'blockchain', 'algorithm', 'app', 'coding', 'developer', 'tech', 'cloud', 'gadgets'],
  'business': ['market', 'stock', 'shares', 'revenue', 'profit', 'economy', 'economic', 'inflation', 'gdp', 'trade', 'tariff', 'banking', 'acquisition', 'merger', 'investor', 'wall street', 'ceo', 'quarterly', 'finance', 'fintech'],
  'science': ['research', 'study', 'space', 'nasa', 'isro', 'planet', 'galaxy', 'quantum', 'physics', 'biology', 'climate', 'species', 'discovery', 'scientist', 'laboratory', 'vaccine', 'dna', 'genetic', 'astronomy', 'telescope'],
  'sports': ['cricket', 'football', 'soccer', 'tennis', 'nfl', 'nba', 'golf', 'formula 1', 'f1', 'olympics', 'match', 'tournament', 'championship', 'world cup', 'athlete', 'score', 'goal', 'wicket', 'ipl', 'uefa'],
  'education': ['university', 'college', 'school', 'student', 'exam', 'degrees', 'ielts', 'toefl', 'campus', 'scholarship', 'professor', 'academic', 'curriculum', 'education', 'learning', 'tuition', 'study abroad'],
  'health': ['health', 'hospital', 'doctor', 'patient', 'medical', 'medicine', 'disease', 'virus', 'fda', 'who', 'cancer', 'treatment', 'drug', 'mental health', 'diet', 'wellness', 'pharma']
};

/**
 * Massive Curated Non-Repeating Unsplash Editorial Image Pool
 */
const TOPIC_IMAGES = {
  'technology': [
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
    'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  ],
  'business': [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1444653614773-995cb1ef9028?auto=format&fit=crop&w=800&q=80'
  ],
  'science': [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1457364887197-9150188c107b?auto=format&fit=crop&w=800&q=80'
  ],
  'sports': [
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80'
  ],
  'education': [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'
  ],
  'health': [
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80'
  ],
  'entertainment': [
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
  ],
  'world': [
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80'
  ]
};

function getEditorialImage(article) {
  if (article.image && typeof article.image === 'string' && article.image.startsWith('http') && !article.image.includes('placeholder.com') && !article.image.includes('1x1') && !article.image.includes('pixel')) {
    return article.image;
  }
  const cat = (article.category || 'world').toLowerCase();
  const photos = TOPIC_IMAGES[cat] || TOPIC_IMAGES['world'];
  let hash = 0;
  const str = (article.title || 'news') + (article.url || '') + (article.source || '');
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % photos.length;
  return photos[index];
}

function detectCountry(text) {
  if (!text) return null;
  const lower = text.toLowerCase();
  
  for (const [code, keywords] of Object.entries(COUNTRY_KEYWORDS)) {
    for (const kw of keywords) {
      const regex = new RegExp('\\b' + kw.replace(/[-\\/\\\\^$*+?.()|[\\]{}]/g, '\\$&') + '\\b', 'i');
      if (regex.test(lower)) {
        return code;
      }
    }
  }
  return null;
}

function detectCategory(text) {
  if (!text) return 'world';
  const lower = text.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const kw of keywords) {
      const regex = new RegExp('\\b' + kw.replace(/[-\\/\\\\^$*+?.()|[\\]{}]/g, '\\$&') + '\\b', 'i');
      if (regex.test(lower)) {
        return cat;
      }
    }
  }
  return 'world';
}

function enrichArticle(article) {
  const fullText = (article.title || '') + ' ' + (article.description || '');
  
  // 1. Detect country ONLY if not already explicitly assigned a specific country
  if (!article.country || article.country === 'WORLD' || article.country === 'GLOBAL') {
    const detectedCountry = detectCountry(fullText);
    if (detectedCountry) {
      article.country = detectedCountry;
    }
  }
  
  // 2. Detect category
  if (!article.category || article.category === 'world' || article.category === 'general') {
    const detectedCat = detectCategory(fullText);
    if (detectedCat && detectedCat !== 'world') {
      article.category = detectedCat;
    }
  }

  // 3. Assign rich non-repeating Unsplash image if missing or low quality
  if (!article.image || !article.image.startsWith('http') || article.image.includes('placeholder')) {
    article.image = getEditorialImage(article);
  }
  
  return article;
}

function calculateKeywordScore(article, userPrefs) {
  let score = 0;
  const fullText = ((article.title || '') + ' ' + (article.description || '')).toLowerCase();
  
  if (userPrefs.countries && userPrefs.countries.length > 0) {
    for (const c of userPrefs.countries) {
      const keywords = COUNTRY_KEYWORDS[c] || [];
      for (const kw of keywords) {
        if (fullText.includes(kw.toLowerCase())) {
          score += 60;
          break;
        }
      }
    }
  }
  
  if (userPrefs.interests && userPrefs.interests.length > 0) {
    for (const interest of userPrefs.interests) {
      const keywords = CATEGORY_KEYWORDS[interest] || [];
      for (const kw of keywords) {
        if (fullText.includes(kw.toLowerCase())) {
          score += 30;
          break;
        }
      }
    }
  }
  
  return score;
}

module.exports = {
  detectCountry,
  detectCategory,
  enrichArticle,
  calculateKeywordScore,
  getEditorialImage,
  COUNTRY_KEYWORDS,
  CATEGORY_KEYWORDS,
  TOPIC_IMAGES
};
