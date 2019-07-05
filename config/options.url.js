module.exports.args = require('yargs')
  .options({
    
    'url': {
      alias: 'u',
      describe: 'Specify URL for chosen env',
      type: 'string',
      demandOption: true
    },

    'env': {
      alias: 'e',
      describe: 'Specify env',
      type: 'string',
      demandOption: true
    },
  
})
