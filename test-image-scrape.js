const fetch = require('node-fetch');
const Parser = require('rss-parser');

(async () => {
  const p = new Parser();
  const feed = await p.parseURL('https://news.google.com/rss/search?q=India+when:1d&hl=en');
  
  for (let i = 0; i < 3; i++) {
    const url = feed.items[i].link;
    console.log(`\n=== Article ${i+1} ===`);
    console.log('RSS URL:', url.substring(0, 80) + '...');
    
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' },
        redirect: 'follow',
        timeout: 5000,
      });
      console.log('Status:', res.status);
      console.log('Final URL:', res.url.substring(0, 100));
      
      const html = await res.text();
      const head = html.substring(0, 8000);
      
      // og:image
      const ogMatch = head.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
        || head.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
      
      // twitter:image  
      const twMatch = head.match(/<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i)
        || head.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i);
      
      console.log('og:image:', ogMatch ? ogMatch[1].substring(0, 120) : 'NOT FOUND');
      console.log('twitter:image:', twMatch ? twMatch[1].substring(0, 120) : 'NOT FOUND');
      
      // Also check if it's a Google consent/redirect page
      if (html.includes('consent.google') || html.includes('accounts.google')) {
        console.log('WARNING: Google consent page detected!');
      }
      if (res.url.includes('news.google.com')) {
        console.log('WARNING: Still on Google News domain — redirect not followed!');
        // Look for the actual URL in the page
        const realUrlMatch = html.match(/data-n-au="([^"]+)"/i) || html.match(/href="(https?:\/\/(?!news\.google)[^"]+)"/);
        if (realUrlMatch) console.log('Found real URL in page:', realUrlMatch[1].substring(0, 120));
      }
    } catch (err) {
      console.error('Error:', err.message);
    }
  }
})();
