module.exports.args = require('yargs')
  .options({

    'env': {
      alias: 'e',
      describe: 'Specify env (should have previously stored URL)',
      type: 'string',
      demandOption: true
    },

    'instances': {
      alias: 'i',
      describe: 'Num of browser instances',
      type: 'number',
      default: 25
    },

    'show': {
      alias: 's',
      describe: 'Set true if you want to see browser instances',
      type: 'boolean',
      default: false
    },

    'timeout': {
      alias: 't',
      describe: 'Timeout for each wait (ms)',
      type: 'number',
      default: 1000 * 30
    }
    
  })
