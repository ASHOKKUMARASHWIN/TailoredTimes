const Parser = require('rss-parser');

/**
 * Decode Google News article URL from the protobuf-encoded Base64 string.
 * Google News RSS encodes the actual article URL in a protobuf structure.
 * The structure is: field 1 (tag 0x08, varint), field 4 (tag 0x22, length-delimited string = URL)
 * Typically: \x08\x13\x22<length><url>
 * Or with nested structure where URL is at different positions.
 */
function decodeGoogleNewsUrl(gnewsUrl) {
  try {
    let encoded = gnewsUrl;
    if (encoded.includes('/articles/')) {
      encoded = encoded.split('/articles/')[1];
    }
    if (encoded.includes('?')) {
      encoded = encoded.split('?')[0];
    }
    
    // URL-safe Base64 to standard Base64
    let b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4 !== 0) b64 += '=';
    
    const buf = Buffer.from(b64, 'base64');
    
    // Strategy: scan the buffer for "http" sequences and extract the URL
    for (let i = 0; i < buf.length - 4; i++) {
      if (buf[i] === 0x68 && buf[i+1] === 0x74 && buf[i+2] === 0x74 && buf[i+3] === 0x70) {
        // Found "http" at position i
        // Read backwards to find the length prefix (protobuf varint)
        let urlStart = i;
        let urlEnd = urlStart;
        
        // Read forward until we hit a control char or end of buffer
        while (urlEnd < buf.length && buf[urlEnd] >= 0x20 && buf[urlEnd] < 0x7f) {
          urlEnd++;
        }
        
        const url = buf.slice(urlStart, urlEnd).toString('utf-8');
        if (url.startsWith('http://') || url.startsWith('https://')) {
          // Clean up any trailing protobuf junk
          const cleaned = url.replace(/[\x00-\x1f\x7f-\xff]+$/, '');
          if (cleaned.length > 20) {
            return cleaned;
          }
        }
      }
    }
    
    return null;
  } catch (e) {
    return null;
  }
}

(async () => {
  const p = new Parser();
  const feed = await p.parseURL('https://news.google.com/rss/search?q=India+when:1d&hl=en');
  
  let success = 0;
  let total = Math.min(15, feed.items.length);
  
  for (let i = 0; i < total; i++) {
    const item = feed.items[i];
    const realUrl = decodeGoogleNewsUrl(item.link);
    const title = item.title.substring(0, 70);
    
    if (realUrl) {
      success++;
      console.log(`[OK] ${title}`);
      console.log(`     ${realUrl.substring(0, 120)}`);
    } else {
      console.log(`[FAIL] ${title}`);
      console.log(`       link: ${item.link.substring(0, 80)}`);
      // Also dump hex of the first 30 bytes of decoded base64
      let encoded = item.link.split('/articles/')[1];
      if (encoded && encoded.includes('?')) encoded = encoded.split('?')[0];
      if (encoded) {
        let b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        while (b64.length % 4 !== 0) b64 += '=';
        const buf = Buffer.from(b64, 'base64');
        console.log(`       hex: ${buf.slice(0, 40).toString('hex')}`);
      }
    }
    console.log('');
  }
  
  console.log(`\nSuccess: ${success}/${total}`);
})();
