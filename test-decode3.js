const Parser = require('rss-parser');

function decodeGoogleNewsUrl(gnewsUrl) {
  try {
    let encoded = gnewsUrl;
    if (encoded.includes('/articles/')) encoded = encoded.split('/articles/')[1];
    if (encoded.includes('?')) encoded = encoded.split('?')[0];
    
    // First decode: URL-safe Base64 → protobuf bytes
    let b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4 !== 0) b64 += '=';
    const buf = Buffer.from(b64, 'base64');
    
    // The protobuf structure is:
    // Field 1 (varint): 0x08 0x13 → field 1, value 19
    // Field 4 (string): 0x22 <length> <nested-base64-string>
    // The nested string looks like "AU_yqL..." which is ALSO URL-safe Base64
    
    // Find the nested base64 string (starts after 0x22 <length>)
    let pos = 0;
    while (pos < buf.length) {
      const tag = buf[pos];
      const fieldNum = tag >> 3;
      const wireType = tag & 0x07;
      pos++;
      
      if (wireType === 0) {
        // Varint - skip it
        while (pos < buf.length && buf[pos] & 0x80) pos++;
        pos++; // skip the last byte
      } else if (wireType === 2) {
        // Length-delimited
        let len = 0;
        let shift = 0;
        while (pos < buf.length && buf[pos] & 0x80) {
          len |= (buf[pos] & 0x7f) << shift;
          shift += 7;
          pos++;
        }
        len |= (buf[pos] & 0x7f) << shift;
        pos++;
        
        const payload = buf.slice(pos, pos + len);
        pos += len;
        
        if (fieldNum === 4) {
          // This is the nested base64 string
          const innerB64 = payload.toString('utf-8').replace(/-/g, '+').replace(/_/g, '/');
          let padded = innerB64;
          while (padded.length % 4 !== 0) padded += '=';
          
          try {
            const innerBuf = Buffer.from(padded, 'base64');
            // Scan for "http" in the inner buffer
            for (let i = 0; i < innerBuf.length - 4; i++) {
              if (innerBuf[i] === 0x68 && innerBuf[i+1] === 0x74 && innerBuf[i+2] === 0x74 && innerBuf[i+3] === 0x70) {
                let end = i;
                while (end < innerBuf.length && innerBuf[end] >= 0x20 && innerBuf[end] < 0x7f) end++;
                const url = innerBuf.slice(i, end).toString('utf-8');
                if (url.startsWith('https://') || url.startsWith('http://')) {
                  return url;
                }
              }
            }
          } catch (e) {
            // inner decode failed
          }
        }
        
        // Also try scanning this payload directly for http
        const payloadStr = payload.toString('utf-8');
        const httpIdx = payloadStr.indexOf('http');
        if (httpIdx >= 0) {
          // Extract URL
          let end = httpIdx;
          while (end < payloadStr.length && payloadStr.charCodeAt(end) >= 0x20 && payloadStr.charCodeAt(end) < 0x7f) end++;
          const url = payloadStr.substring(httpIdx, end);
          if (url.startsWith('https://') || url.startsWith('http://')) {
            return url;
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
    const title = item.title.substring(0, 70);
    const realUrl = decodeGoogleNewsUrl(item.link);
    
    if (realUrl && !realUrl.includes('news.google.com')) {
      success++;
      console.log(`[OK] ${title}`);
      console.log(`     ${realUrl.substring(0, 150)}`);
    } else {
      console.log(`[FAIL] ${title}`);
      
      // Debug: dump the inner base64 payload
      let encoded = item.link.split('/articles/')[1];
      if (encoded && encoded.includes('?')) encoded = encoded.split('?')[0];
      if (encoded) {
        let b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
        while (b64.length % 4 !== 0) b64 += '=';
        const buf = Buffer.from(b64, 'base64');
        // Find field 4 payload  
        let pos = 0;
        while (pos < buf.length) {
          const tag = buf[pos];
          const fieldNum = tag >> 3;
          const wireType = tag & 0x07;
          pos++;
          if (wireType === 0) {
            while (pos < buf.length && buf[pos] & 0x80) pos++;
            pos++;
          } else if (wireType === 2) {
            let len = 0, shift = 0;
            while (pos < buf.length && buf[pos] & 0x80) {
              len |= (buf[pos] & 0x7f) << shift; shift += 7; pos++;
            }
            len |= (buf[pos] & 0x7f) << shift; pos++;
            const payload = buf.slice(pos, pos + len).toString('utf-8');
            pos += len;
            if (fieldNum === 4) {
              console.log(`     Inner B64 payload: ${payload.substring(0, 80)}...`);
              // Try decoding it
              let innerB64 = payload.replace(/-/g, '+').replace(/_/g, '/');
              while (innerB64.length % 4 !== 0) innerB64 += '=';
              try {
                const innerBuf = Buffer.from(innerB64, 'base64');
                console.log(`     Inner decoded hex: ${innerBuf.slice(0, 50).toString('hex')}`);
                console.log(`     Inner decoded str: ${JSON.stringify(innerBuf.toString('utf-8').substring(0, 200))}`);
              } catch (e) {}
            }
          }
        }
      }
    }
    console.log('');
  }
  
  console.log(`\nSuccess: ${success}/${total}`);
})();
