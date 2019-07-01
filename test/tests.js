const expect = require('chai').expect;
const addContext = require('mochawesome/addContext');
const helper = require('./helper.js');
const script = require('../script.script');
const config = require('../config/tests.config');

let errors = [];

describe('Test popup', function () {

  it(`should open ${config.instances} instances of popup`, async function() {

      let promises = [];
      for (let i = 0; i <config.instances; ++i) {
        promises.push(script.openWindow(i, config.headless));
      }

      let results = await Promise.all(promises);

      // attach screens      
      results.forEach(test => {
        console.log('add context for path:', test);
        addContext(this, {title: 'id', value: test.index});
        // addContext(this, test.file);

        if(test.error) {
          console.log('got error:', test.index)
          errors.push( {i: test.index, err: test.error} );
        }
      });

      console.log('Finished');

      if(errors) {
        console.log(JSON.stringify(errors, null, 2));
      }

      return expect(errors).to.be.empty;

  });

});