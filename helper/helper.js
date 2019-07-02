const path = require('path');

  async function getText(p, selector) {
    await p.waitFor(selector);
    const text = await p.evaluate((sel) => { return document.querySelector(sel).textContent }, selector);
    return text;
  }

  function getTime() {
    return new Date().getTime();
  }

  async function saveScreenshot(page, dir, fileName, i) {
    console.log('\nattempt to save:', `${dir}/${fileName}.png`)
    await page.screenshot({path: `${dir}/${fileName}.png`});

    return 'file:///' + path.resolve(`${dir}/${fileName}.png`);
  }

  module.exports = { getText, getTime, saveScreenshot }