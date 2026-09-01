const Parser = require('rss-parser');
const fetch = require('node-fetch');

const parser = new Parser({
  timeout: 8000,
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['News:Image', 'newsImage'],
    ]
  }
});

function extractBingImage(item) {
  // 1. Check enclosure
  if (item.enclosure && item.enclosure.url) return item.enclosure.url;
  // 2. media:content
  if (item.mediaContent && item.mediaContent['$'] && item.mediaContent['$'].url) return item.mediaContent['$'].url;
  // 3. media:thumbnail
  if (item.mediaThumbnail && item.mediaThumbnail['$'] && item.mediaThumbnail['$'].url) return item.mediaThumbnail['$'].url;
  // 4. News:Image
  if (item.newsImage && typeof item.newsImage === 'string') return item.newsImage;
  // 5. Extract from content/description HTML
  const html = item.content || item.description || '';
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];
  return null;
}

function extractBingRealUrl(item) {
  // Bing links contain the real URL in the url= parameter
  const link = item.link || '';
  const urlMatch = link.match(/[?&]url=([^&]+)/);
  if (urlMatch) {
    return decodeURIComponent(urlMatch[1]);
  }
  return link;
}

(async () => {
  // Test multiple queries
  const queries = [
    { q: 'India', label: 'India Country' },
    { q: 'technology+news', label: 'Technology' },
    { q: 'business+finance+news', label: 'Business' },
    { q: 'sports+news', label: 'Sports' },
  ];
  
  for (const { q, label } of queries) {
    console.log(`\n=== ${label} ===`);
    const url = `https://www.bing.com/news/search?q=${q}&format=rss&count=15`;
    
    try {
      const feed = await parser.parseURL(url);
      let withImage = 0;
      const total = feed.items.length;
      
      for (const item of feed.items.slice(0, 5)) {
        const image = extractBingImage(item);
        const realUrl = extractBingRealUrl(item);
        const source = (item.title || '').split(' - ').pop() || 'News';
        
        if (image) withImage++;
        console.log(`[${image ? 'IMG' : 'NO'}] ${(item.title || '').substring(0, 60)}`);
        console.log(`  Real URL: ${realUrl.substring(0, 100)}`);
        if (image) console.log(`  Image: ${image.substring(0, 100)}`);
      }
      
      // Count all with images
      const allWithImg = feed.items.filter(i => extractBingImage(i)).length;
      console.log(`\nImages: ${allWithImg}/${total}`);
    } catch (e) {
      console.log('Error:', e.message);
    }
  }
})();
