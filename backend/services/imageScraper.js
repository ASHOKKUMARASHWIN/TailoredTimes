/**
 * imageScraper.js — Ultra-fast real og:image thumbnail extractor.
 *
 * Scrapes real article Open Graph thumbnails from publisher URLs with
 * in-memory caching and strict 1.5s timeout per request.
 */

const fetch = require('node-fetch');

const IMAGE_CACHE = new Map();
const CACHE_MAX = 3000;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function getCached(url) {
  const entry = IMAGE_CACHE.get(url);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) {
    IMAGE_CACHE.delete(url);
    return null;
  }
  return entry.image;
}

function setCache(url, image) {
  if (IMAGE_CACHE.size >= CACHE_MAX) {
    const oldest = IMAGE_CACHE.keys().next().value;
    IMAGE_CACHE.delete(oldest);
  }
  IMAGE_CACHE.set(url, { image, ts: Date.now() });
}

async function scrapeOgImage(articleUrl) {
  if (!articleUrl || typeof articleUrl !== 'string' || !articleUrl.startsWith('http')) return null;
  // Skip Google News redirect URLs as they require browser JS
  if (articleUrl.includes('news.google.com')) return null;

  const cached = getCached(articleUrl);
  if (cached !== null) return cached === '' ? null : cached;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 600);

  try {
    const res = await fetch(articleUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'text/html',
      },
      redirect: 'follow',
      compress: true,
    });

    if (!res.ok) {
      setCache(articleUrl, '');
      return null;
    }

    const reader = res.body;
    const chunks = [];
    let totalBytes = 0;
    const MAX_BYTES = 32768; // 32KB is plenty for <head>

    await new Promise((resolve, reject) => {
      reader.on('data', (chunk) => {
        chunks.push(chunk);
        totalBytes += chunk.length;
        if (totalBytes >= MAX_BYTES) {
          reader.destroy();
          resolve();
        }
      });
      reader.on('end', resolve);
      reader.on('error', reject);
    });

    const html = Buffer.concat(chunks).toString('utf-8');

    let imageUrl = null;

    // 1. og:image
    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    if (ogMatch) imageUrl = ogMatch[1];

    // 2. twitter:image
    if (!imageUrl) {
      const twMatch = html.match(/<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i)
        || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i);
      if (twMatch) imageUrl = twMatch[1];
    }

    // 3. JSON-LD
    if (!imageUrl) {
      const ldMatch = html.match(/"image"\s*:\s*"(https?:\/\/[^"]+)"/i);
      if (ldMatch) imageUrl = ldMatch[1];
    }

    if (imageUrl) {
      if (imageUrl.startsWith('//')) imageUrl = 'https:' + imageUrl;
      if (!imageUrl.startsWith('http') || imageUrl.includes('1x1') || imageUrl.includes('pixel.') || imageUrl.includes('tracking')) {
        imageUrl = null;
      }
    }

    setCache(articleUrl, imageUrl || '');
    return imageUrl;
  } catch (err) {
    setCache(articleUrl, '');
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function enrichArticlesWithImages(articles, concurrency = 10) {
  if (!articles || articles.length === 0) return articles;

  const needsScraping = [];
  for (const article of articles) {
    if (!article.image || !article.image.startsWith('http') || article.image.includes('placeholder')) {
      needsScraping.push(article);
    }
  }

  if (needsScraping.length === 0) return articles;

  // Scrape up to 10 articles in parallel with 1.5s max timeout
  const targets = needsScraping.slice(0, 10);
  const results = await Promise.allSettled(targets.map(a => scrapeOgImage(a.url)));

  results.forEach((res, idx) => {
    if (res.status === 'fulfilled' && res.value) {
      targets[idx].image = res.value;
    }
  });

  return articles;
}

module.exports = {
  scrapeOgImage,
  enrichArticlesWithImages,
};
