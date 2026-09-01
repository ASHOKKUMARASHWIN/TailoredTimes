const sources = [
  // Global
  { id: 'bbc-news', name: 'BBC News', country: 'GB', countries: ['GB', 'WORLD'], category: 'world', rssUrl: 'https://feeds.bbci.co.uk/news/world/rss.xml', website: 'https://www.bbc.com/news', language: 'en', newsApiId: 'bbc-news' },
  { id: 'the-guardian-uk', name: 'The Guardian', country: 'GB', countries: ['GB', 'WORLD'], category: 'world', rssUrl: 'https://www.theguardian.com/world/rss', website: 'https://www.theguardian.com', language: 'en', newsApiId: 'the-guardian-uk' },
  { id: 'al-jazeera-english', name: 'Al Jazeera', country: 'QA', countries: ['QA', 'WORLD'], category: 'world', rssUrl: 'https://www.aljazeera.com/xml/rss/all.xml', website: 'https://www.aljazeera.com', language: 'en', newsApiId: 'al-jazeera-english' },
  { id: 'cnn', name: 'CNN', country: 'US', countries: ['US', 'WORLD'], category: 'world', rssUrl: 'http://rss.cnn.com/rss/edition.rss', website: 'https://edition.cnn.com', language: 'en', newsApiId: 'cnn' },
  { id: 'dw-news', name: 'DW News', country: 'DE', countries: ['DE', 'WORLD'], category: 'world', rssUrl: 'https://rss.dw.com/rdf/rss-en-world', website: 'https://www.dw.com', language: 'en', newsApiId: null },
  { id: 'france24', name: 'France24', country: 'FR', countries: ['FR', 'WORLD'], category: 'world', rssUrl: 'https://www.france24.com/en/rss', website: 'https://www.france24.com', language: 'en', newsApiId: null },

  // US & Tech
  { id: 'techcrunch', name: 'TechCrunch', country: 'US', countries: ['US', 'WORLD'], category: 'technology', rssUrl: 'https://techcrunch.com/feed/', website: 'https://techcrunch.com', language: 'en', newsApiId: 'techcrunch' },
  { id: 'the-verge', name: 'The Verge', country: 'US', countries: ['US', 'WORLD'], category: 'technology', rssUrl: 'https://www.theverge.com/rss/index.xml', website: 'https://www.theverge.com', language: 'en', newsApiId: 'the-verge' },
  { id: 'wired', name: 'Wired', country: 'US', countries: ['US', 'WORLD'], category: 'technology', rssUrl: 'https://www.wired.com/feed/rss', website: 'https://www.wired.com', language: 'en', newsApiId: 'wired' },
  { id: 'ars-technica', name: 'Ars Technica', country: 'US', countries: ['US', 'WORLD'], category: 'technology', rssUrl: 'https://feeds.arstechnica.com/arstechnica/index', website: 'https://arstechnica.com', language: 'en', newsApiId: 'ars-technica' },
  { id: 'cnbc', name: 'CNBC', country: 'US', countries: ['US', 'WORLD'], category: 'business', rssUrl: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100003114', website: 'https://www.cnbc.com', language: 'en', newsApiId: null },

  // UK
  { id: 'sky-news', name: 'Sky News', country: 'GB', countries: ['GB'], category: 'world', rssUrl: 'https://feeds.skynews.com/feeds/rss/home.xml', website: 'https://news.sky.com', language: 'en', newsApiId: null },
  { id: 'the-independent', name: 'The Independent', country: 'GB', countries: ['GB'], category: 'world', rssUrl: 'https://www.independent.co.uk/news/rss', website: 'https://www.independent.co.uk', language: 'en', newsApiId: null },

  // India
  { id: 'the-hindu', name: 'The Hindu', country: 'IN', countries: ['IN'], category: 'world', rssUrl: 'https://www.thehindu.com/feeder/default.rss', website: 'https://www.thehindu.com', language: 'en', newsApiId: 'the-hindu' },
  { id: 'times-of-india', name: 'Times of India', country: 'IN', countries: ['IN'], category: 'world', rssUrl: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms', website: 'https://timesofindia.indiatimes.com', language: 'en', newsApiId: 'the-times-of-india' },
  { id: 'hindustan-times', name: 'Hindustan Times', country: 'IN', countries: ['IN'], category: 'world', rssUrl: 'https://www.hindustantimes.com/feeds/rss/topnews/rssfeed.xml', website: 'https://www.hindustantimes.com', language: 'en', newsApiId: null },
  { id: 'economic-times', name: 'Economic Times', country: 'IN', countries: ['IN'], category: 'business', rssUrl: 'https://economictimes.indiatimes.com/rssfeedsdefault.cms', website: 'https://economictimes.indiatimes.com', language: 'en', newsApiId: null },
  { id: 'livemint', name: 'LiveMint', country: 'IN', countries: ['IN'], category: 'business', rssUrl: 'https://www.livemint.com/rss/news', website: 'https://www.livemint.com', language: 'en', newsApiId: null },
  { id: 'india-today', name: 'India Today', country: 'IN', countries: ['IN'], category: 'world', rssUrl: 'https://www.indiatoday.in/rss/1206584', website: 'https://www.indiatoday.in', language: 'en', newsApiId: null },

  // Singapore & Australia
  { id: 'channel-newsasia', name: 'Channel NewsAsia', country: 'SG', countries: ['SG'], category: 'world', rssUrl: 'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml', website: 'https://www.channelnewsasia.com', language: 'en', newsApiId: null },
  { id: 'abc-news-au', name: 'ABC News AU', country: 'AU', countries: ['AU'], category: 'world', rssUrl: 'https://www.abc.net.au/news/feed/51120/rss.xml', website: 'https://www.abc.net.au/news', language: 'en', newsApiId: 'abc-news-au' },

  // Science & Space
  { id: 'sciencedaily', name: 'ScienceDaily', country: 'US', countries: ['WORLD'], category: 'science', rssUrl: 'https://www.sciencedaily.com/rss/all.xml', website: 'https://www.sciencedaily.com', language: 'en', newsApiId: null },
  { id: 'nasa', name: 'NASA', country: 'US', countries: ['WORLD'], category: 'science', rssUrl: 'https://www.nasa.gov/rss/dyn/breaking_news.rss', website: 'https://www.nasa.gov', language: 'en', newsApiId: null },

  // Sports & Finance
  { id: 'espn-cricinfo', name: 'ESPN Cricinfo', country: 'IN', countries: ['WORLD', 'IN', 'GB', 'AU'], category: 'sports', rssUrl: 'https://www.espncricinfo.com/rss/content/story/feeds/0.xml', website: 'https://www.espncricinfo.com', language: 'en', newsApiId: 'espn-cric-info' },
  { id: 'sky-sports', name: 'Sky Sports', country: 'GB', countries: ['GB'], category: 'sports', rssUrl: 'https://www.skysports.com/rss/12040', website: 'https://www.skysports.com', language: 'en', newsApiId: null },
  { id: 'marketwatch', name: 'MarketWatch', country: 'US', countries: ['WORLD'], category: 'business', rssUrl: 'https://feeds.content.dowjones.io/public/rss/mw_topstories', website: 'https://www.marketwatch.com', language: 'en', newsApiId: null }
];

module.exports = sources;
