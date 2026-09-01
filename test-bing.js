const Parser = require('rss-parser');

const parser = new Parser({
  timeout: 8000,
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['News:Image', 'newsImage'],
      ['image', 'imageTag'],
      ['News:ImageSize', 'imageSize'],
    ]
  }
});

(async () => {
  // Test Bing News RSS - it includes images!
  const url = 'https://www.bing.com/news/search?q=India&format=rss';
  console.log('Fetching Bing News RSS for India...\n');
  
  const feed = await parser.parseURL(url);
  console.log(`Total items: ${feed.items.length}\n`);
  
  let withImage = 0;
  for (let i = 0; i < Math.min(10, feed.items.length); i++) {
    const item = feed.items[i];
    
    // Check all image fields
    let image = null;
    if (item.enclosure && item.enclosure.url) image = item.enclosure.url;
    if (!image && item.mediaContent) image = item.mediaContent['$'] ? item.mediaContent['$'].url : null;
    if (!image && item.mediaThumbnail) image = item.mediaThumbnail['$'] ? item.mediaThumbnail['$'].url : null;
    if (!image && item.newsImage) image = typeof item.newsImage === 'string' ? item.newsImage : null;
    
    // Also check description for <img> tags
    if (!image && item.description) {
      const imgMatch = item.description.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) image = imgMatch[1];
    }
    
    // Check content
    if (!image && item.content) {
      const imgMatch = item.content.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) image = imgMatch[1];
    }
    
    if (image) withImage++;
    
    const title = (item.title || '').substring(0, 70);
    const link = (item.link || '').substring(0, 100);
    console.log(`[${image ? 'IMG' : 'NO-IMG'}] ${title}`);
    console.log(`  Link: ${link}`);
    if (image) console.log(`  Image: ${image.substring(0, 120)}`);
    console.log('');
  }
  
  console.log(`\nImages found: ${withImage}/${Math.min(10, feed.items.length)}`);
  
  // Test category feed
  console.log('\n\n=== Testing Bing News Technology category ===');
  const techUrl = 'https://www.bing.com/news/search?q=technology&format=rss';
  const techFeed = await parser.parseURL(techUrl);
  console.log(`Total tech items: ${techFeed.items.length}`);
  
  let techImg = 0;
  for (const item of techFeed.items.slice(0, 5)) {
    let image = null;
    if (item.description) {
      const imgMatch = item.description.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) image = imgMatch[1];
    }
    if (image) techImg++;
    console.log(`[${image ? 'IMG' : 'NO'}] ${(item.title || '').substring(0, 60)}  ${image ? image.substring(0, 80) : ''}`);
  }
  console.log(`Tech images: ${techImg}/5`);
})();
