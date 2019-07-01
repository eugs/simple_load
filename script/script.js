const puppeteer = require('puppeteer');
let url = 'https://research.demo.cch.com/DailiesBrowser/home?date=03%2F05%2F2019&ids=eld013e9474187d4b10008ffb00505688259002,eld013e9474227d4b1000a19c00505688259004,eld013e9474227d4b1000a84a00505688259005,eld013e9474227d4b10008ebc00505688259006,eld013e9474227d4b100093f300505688259007,eld013e94742c7d4b1000a59200505688259008,eld013e94742c7d4b1000ae7300505688259009,eld013e94742c7d4b10008a6f0050568825900a,eld013e94742c7d4b1000bd2f0050568825900c,eld013e9474367d4b1000adbe0050568825900d,eld013e9474367d4b1000bb450050568825900e,eld013e9474367d4b10009f1e0050568825900f';
const DEFAULT_TIMEOUT = 1000 * 30;

  async function openWindow(i, headless) {
      console.log('called openWindow', i, headless);
    let browser, page, user;

    try {
      browser = await puppeteer.launch(
        {
          headless: JSON.parse(headless),
          args: [
            '--window-size=1354,894'
          ],
          slowMo: 0
        }
      );

      page = await browser.newPage();
      await page.setViewport( { width: 1338, height: 768 } );
      page.setDefaultTimeout(DEFAULT_TIMEOUT);

      await page.goto(url);
      // await page.waitFor('div.product-name');
      // let title = getText TODO
      let title = 'asdfasdfasdf';

      await browser.close();
      console.log(`browser closed: ${i}`);

      return {
        titleText: title,
        index: i
      };
      
    } catch (e) {
      console.log('\nErRoR\n:', e);
      await browser.close();
      return {
        error: e,
        index: i
      };
    }

  };



  module.exports = { openWindow }