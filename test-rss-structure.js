const Parser = require('rss-parser');
const fetch = require('node-fetch');

(async () => {
  const p = new Parser({
    customFields: {
      item: [
        ['source', 'sourceTag', { keepArray: false }],
      ]
    }
  });
  const feed = await p.parseURL('https://news.google.com/rss/search?q=India+when:1d&hl=en');
  
  for (let i = 0; i < 5; i++) {
    const item = feed.items[i];
    console.log(`\n=== Article ${i+1} ===`);
    console.log('Title:', item.title);
    console.log('Link:', item.link);
    console.log('GUID:', item.guid);
    console.log('Source tag:', JSON.stringify(item.sourceTag));
    console.log('Content:', item.content ? item.content.substring(0, 500) : 'NONE');
    console.log('Description:', item.description ? item.description.substring(0, 500) : 'NONE');
    
    // The description contains <a href="..."> with the Google redirect URL
    // Let's see if we can find the actual URL from the source tag or somewhere else
    
    // Extract source name from title 
    const parts = item.title.split(' - ');
    const source = parts.length > 1 ? parts[parts.length - 1].trim() : '';
    const headline = parts.slice(0, -1).join(' - ').trim();
    console.log('Source:', source);
    console.log('Headline:', headline);
    
    // Try to search for the article directly on the source website
    // using a search engine approach
    console.log('---');
  }
})();
