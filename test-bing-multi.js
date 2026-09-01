const Parser = require('rss-parser');

const parser = new Parser({
  timeout: 8000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
  },
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['content:encoded', 'contentEncoded'],
      ['News:Image', 'newsImage'],
      ['image', 'imageTag']
    ]
  }
});

const extractBingImage = (item) => {
  if (item.enclosure && item.enclosure.url && !item.enclosure.url.endsWith('.mp3')) return item.enclosure.url;
  if (item.mediaContent && item.mediaContent['$'] && item.mediaContent['$'].url) return item.mediaContent['$'].url;
  if (item.mediaThumbnail && item.mediaThumbnail['$'] && item.mediaThumbnail['$'].url) return item.mediaThumbnail['$'].url;
  if (item.newsImage && typeof item.newsImage === 'string') return item.newsImage;
  const content = item.contentEncoded || item.content || item.description || '';
  const match = content.match(/<img[^>]+src=["']([^"'>]+)["']/i);
  return match ? match[1] : null;
};

const extractRealUrl = (link) => {
  if (!link) return '#';
  const urlMatch = link.match(/[?&]url=([^&]+)/);
  if (urlMatch) {
    try {
      return decodeURIComponent(urlMatch[1]);
    } catch (e) {
      return urlMatch[1];
    }
  }
  return link;
};

async function testFetchCountry(countryName, code) {
  console.log(`\n=== Testing country: ${countryName} (${code}) ===`);
  
  // 1. Bing News RSS
  const bingUrl = `https://www.bing.com/news/search?q=${encodeURIComponent(countryName)}&format=rss`;
  try {
    const feed = await parser.parseURL(bingUrl);
    console.log(`Fetched ${feed.items.length} items from Bing RSS`);
    let withImages = 0;
    feed.items.slice(0, 5).forEach((item, idx) => {
      const img = extractBingImage(item);
      const url = extractRealUrl(item.link);
      if (img) withImages++;
      console.log(`[${img ? 'REAL-IMG' : 'NO-IMG'}] ${item.title}`);
      console.log(`  Source URL: ${url.substring(0, 80)}...`);
      if (img) console.log(`  Img URL: ${img.substring(0, 80)}...`);
    });
    console.log(`Images: ${withImages}/5`);
  } catch (err) {
    console.error('Bing fetch failed:', err.message);
  }
}

(async () => {
  await testFetchCountry('India', 'IN');
  await testFetchCountry('United States', 'US');
  await testFetchCountry('Germany', 'DE');
  await testFetchCountry('Australia', 'AU');
})();
