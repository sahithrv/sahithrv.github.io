const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  const offenders = await page.evaluate(() => {
    const result = [];
    const walker = document.createNodeIterator(document, NodeFilter.SHOW_ELEMENT);
    let node;
    while ((node = walker.nextNode())) {
      const cs = getComputedStyle(node);
      if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && node.scrollHeight > node.clientHeight + 2) {
        result.push({
          tag: node.tagName,
          id: node.id || '',
          cls: node.className || '',
          sh: node.scrollHeight,
          ch: node.clientHeight,
          ow: cs.overflowY
        });
      }
    }
    return result;
  });
  console.log(JSON.stringify({count: offenders.length, offenders}, null, 2));
  await browser.close();
})();
