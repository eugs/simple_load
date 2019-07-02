const fsx = require('fs-extra');
const args = require('yargs').argv;

const OUTPUT_DIR = './output';
const OPTS_PATH = './test/mocha.opts';
const CONFIG_PATH = './config/tests.config.json';

const instances = (args.instances) ? args.instances : 25;
const headless = (args.headless) ? args.headless : false;

console.log('args:', args);

(function init() {

  let date = new Date().toISOString();
  let timeFormatted = date.replace(/T/, '\(').replace(/\.(.)+/, '\)').replace(/[-:]/gim, '_');
  
  let mochaOpts = 
    `--timeout 300000
    --exit
    --reporter mochawesome
    --reporter-options reportDir=${OUTPUT_DIR},reportFilename=${timeFormatted}`;

    // mocha opts
  fsx.ensureFileSync(OPTS_PATH);
  fsx.writeFileSync(OPTS_PATH, mochaOpts);

    // output dir
  fsx.ensureDir(OUTPUT_DIR);
  let screensPath = `${OUTPUT_DIR}/${timeFormatted}`;
  fsx.mkdirSync(screensPath);

    // tests config
  let testsConfig = {
    instances : instances,
    headless : headless,
    screenshotsPath : screensPath
  }

  console.log('testsConfig', testsConfig);
  fsx.writeJsonSync(CONFIG_PATH, testsConfig);
})();

