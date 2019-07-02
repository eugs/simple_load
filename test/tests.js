const helper = require('../helper/helper.js');
const script = require('../script/script');
const config = require('../config/tests.config');
const expect = require('chai').expect;
const addContext = require('mochawesome/addContext');
const EventEmitter = require('events').defaultMaxListeners = 50;

let errors = [];

describe('Test popup', function () {

  it(`should open ${config.instances} instances of popup`, async function() {

      let promises = [];
      for (let i = 0; i <config.instances; ++i) {
        promises.push(script.openWindow(i));
      }

      let results = await Promise.all(promises);

      // attach screens      
      results.forEach(test => {
        console.log('add context for path:', test.index);
        addContext(this, test.screenshot);

        if((test.titleText) && (test.titleText !== 'Employment Law Daily')) {
          test.error = `wrong title: ${test.titleText}`;
        }

        if(test.error) {
          console.log('got error:', test.index)
          errors.push( {i: test.index, err: test.error} );
          addContext(this, {title: `ERROR (#${test.index})`, value: `${test.error}`});
        } else {
          addContext(this, {title: `#${test.index} OK`, value: `\t${test.time}`});
        }

      });

      console.log('\nFinished!');

      if(errors) {
        console.log(JSON.stringify(errors, null, 2));
      }

      return expect(errors, `Got ${errors.length} fails!\n`).to.be.empty;

  });

});