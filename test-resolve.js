const Parser = require('rss-parser');
const fetch = require('node-fetch');

// Google News encodes the real article URL. We need to resolve it.
// Method 1: Follow the redirect chain from the HTML (Google serves a JS-based redirect)
// Method 2: Decode the Base64 from the URL path
// Method 3: Use Google's redirect endpoint

async function resolveGoogleNewsUrl(gnewsUrl) {
  if (!gnewsUrl || !gnewsUrl.includes('news.google.com')) return gnewsUrl;

  try {
    // Google News redirect URLs contain Base64-encoded actual URLs
    // The format is: https://news.google.com/rss/articles/CBMi<base64>
    // Try fetching the page and looking for the actual redirect
    const res = await fetch(gnewsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      },
      redirect: 'follow',
      timeout: 5000,
    });
    
    const html = await res.text();
    
    // Method 1: Look for data-n-au attribute (Google News article URL)
    let match = html.match(/data-n-au="([^"]+)"/);
    if (match) return match[1];
    
    // Method 2: Look for canonical link
    match = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    if (match && !match[1].includes('news.google.com')) return match[1];
    
    // Method 3: Look for <a href="https://..." that points to the actual article
    match = html.match(/href="(https?:\/\/(?!news\.google\.com)[^"]+(?:reuters|apnews|bbc|cnbc|ndtv|theguardian|nytimes|washingtonpost|cnn|hindu|indianexpress|livemint|timesofindia|hindustantimes|businessstandard|economictimes|firstpost)[^"]*)"/)
    if (match) return match[1];
    
    // Method 4: Look for jsRedirectUrl
    match = html.match(/window\.location\.replace\(["']([^"']+)["']\)/);
    if (match) return match[1];

    // Method 5: Look for any external URL in the page
    match = html.match(/href="(https?:\/\/(?!(?:news|accounts|consent|www)\.google)[^"]+)"/);
    if (match) return match[1];

    // Method 6: meta refresh
    match = html.match(/<meta[^>]+http-equiv=["']refresh["'][^>]+url=([^"'\s>]+)/i);
    if (match) return match[1];

    return gnewsUrl; // fallback — return as-is
  } catch (err) {
    return gnewsUrl;
  }
}

(async () => {
  const p = new Parser();
  const feed = await p.parseURL('https://news.google.com/rss/search?q=India+when:1d&hl=en');
  
  for (let i = 0; i < 5; i++) {
    const gnewsUrl = feed.items[i].link;
    console.log(`\n=== Article ${i+1} ===`);
    console.log('Google URL:', gnewsUrl.substring(0, 80) + '...');
    
    const realUrl = await resolveGoogleNewsUrl(gnewsUrl);
    console.log('Real URL:', realUrl.substring(0, 120));
    
    if (realUrl !== gnewsUrl && !realUrl.includes('news.google.com')) {
      // Now try to get og:image from the real URL
      try {
        const res = await fetch(realUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
          redirect: 'follow',
          timeout: 5000,
        });
        const html = await res.text();
        const head = html.substring(0, 15000);
        const ogMatch = head.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
          || head.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
        console.log('og:image:', ogMatch ? ogMatch[1].substring(0, 120) : 'NOT FOUND');
      } catch (e) {
        console.log('Scrape error:', e.message);
      }
    } else {
      console.log('FAILED to resolve real URL');
    }
  }
})();
