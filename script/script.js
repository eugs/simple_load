const puppeteer = require('puppeteer');
const helper = require('../helper/helper.js');
const perf = require('execution-time')();
const testsConfig = require('../temp/tests.config');
const browserConfig = require('../config/browser.config');

  async function openWindow(i) {
      console.log('called openWindow', i);
    let browser, page, user;

    try {
      browser = await puppeteer.launch(
        {
          headless: JSON.parse(testsConfig.headless),
          args: browserConfig.puppeteerArgs,
        }
      );

      page = await browser.newPage();
      await page.setViewport(browserConfig.viewport);
      page.setDefaultTimeout(testsConfig.waitTime);

      perf.start();
      await page.goto(testsConfig.url);

      let title = await helper.getText(page, 'div.product-name');
      await page.waitForSelector('div.topics');
      await page.waitForFunction("document.querySelector('div.topic') && document.querySelector('div.topic').clientHeight != 0");
      
      const time = perf.stop();
      console.log('took time:', time.words);

        // screen
      const stamp = helper.getTime();
      const screenPath = await helper.saveScreenshot(page, testsConfig.screenshotsPath, `${i}_${stamp}`, i);

      await browser.close();
      console.log(`browser closed: ${i}`);

      return {
        titleText: title,
        index: i,
        screenshot: screenPath,
        time: time.words
      };
      
    } catch (e) {
      console.log('\nErRoR\n:', e);
      const stamp = helper.getTime();
      const screenPath = await helper.saveScreenshot(page, testsConfig.screenshotsPath, `${i}_${stamp}`, i);
      await browser.close();

      return {
        error: e,
        index: i,
        screenshot: screenPath
      };
    }

  };

  module.exports = { openWindow }