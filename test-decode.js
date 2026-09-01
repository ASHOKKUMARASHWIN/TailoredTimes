// Try to decode Google News article IDs (protobuf-encoded Base64)
const Parser = require('rss-parser');

function decodeGoogleNewsUrl(gnewsUrl) {
  try {
    // Extract the Base64 segment from the URL
    // Format: https://news.google.com/rss/articles/<base64>?oc=5
    let encoded = gnewsUrl;
    
    // Strip URL prefix
    if (encoded.includes('/articles/')) {
      encoded = encoded.split('/articles/')[1];
    }
    // Strip query params
    if (encoded.includes('?')) {
      encoded = encoded.split('?')[0];
    }
    
    // Decode base64 (URL-safe base64: replace - with + and _ with /)
    let b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    // Pad if needed
    while (b64.length % 4 !== 0) b64 += '=';
    
    const decoded = Buffer.from(b64, 'base64').toString('utf-8');
    console.log('Raw decoded (first 300 chars):', JSON.stringify(decoded.substring(0, 300)));
    
    // Look for http URLs in the decoded data
    const urlMatch = decoded.match(/https?:\/\/[^\s\x00-\x1f"'<>]+/g);
    if (urlMatch) {
      // Return the longest URL (the actual article, not tracking params)
      urlMatch.sort((a, b) => b.length - a.length);
      return urlMatch[0];
    }
    
    return null;
  } catch (e) {
    console.error('Decode error:', e.message);
    return null;
  }
}

(async () => {
  const p = new Parser();
  const feed = await p.parseURL('https://news.google.com/rss/search?q=India+when:1d&hl=en');
  
  for (let i = 0; i < 8; i++) {
    const item = feed.items[i];
    console.log(`\n=== Article ${i+1}: ${item.title.substring(0, 60)}... ===`);
    const realUrl = decodeGoogleNewsUrl(item.link);
    console.log('Decoded URL:', realUrl);
  }
})();
