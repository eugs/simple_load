
  async function getText(p, selector) {
    await p.waitFor(selector);
    const text = await p.evaluate((sel) => { return document.querySelector(sel).textContent }, selector);
    return text;
  }

  module.exports = { getText }