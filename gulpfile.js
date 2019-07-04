const gulp = require('gulp');
const mocha = require('gulp-mocha');
const fsx = require('fs-extra');
const args = require('yargs').argv;
const OUTPUT_DIR = './output';
// const OPTS_PATH = './temp/mocha.opts';
const CONFIG_PATH = './temp/tests.config.json';
const creds = require('./temp/creds');
const env = (args.env) ? args.env : 'dev';

gulp.task('test', init);

gulp.task('url', setURL);

  async function setURL() {
    console.log('set URL called');

  }

  async function init() {
    const instances = (args.instances) ? args.instances : 20;
    const headless = (args.headless) ? args.headless : true;
    const timeout = (args.timeout) ? args.timeout: 30000;
    const env = (args.env) ? args.env : 'dev';

    console.log('test called:', args);

    let date = new Date().toISOString();
    let timeFormatted = date.replace(/T/, '\(').replace(/\.(.)+/, '\)').replace(/[-:]/gim, '_');

    let mochaOpts = {
      timeout: 240000,
      exit: false,
      reporter: 'mochawesome',
      reporterOptions: {
        reportDir: `${OUTPUT_DIR}`,
        reportFilename: `${env.toUpperCase()}_${timeFormatted}`
      }
    }

      // output dir
    fsx.ensureDir(OUTPUT_DIR);
    let screensPath = `${OUTPUT_DIR}/${env.toUpperCase()}_${timeFormatted}`;
    fsx.mkdirSync(screensPath);

      // save tests config
    let testsConfig = {
      instances : instances,
      headless : headless,
      screenshotsPath : screensPath,
      waitTime: timeout,
      url: creds[env]
    }

    console.log('\ntestsConfig', testsConfig);
    fsx.writeJsonSync(CONFIG_PATH, testsConfig);

    return gulp.src('test/*.js', { read: false })
      .pipe(mocha(mochaOpts))
      .once('error', function (err) {
          console.log(err);
          process.exit(1);
      })
      .once('end', function () {
        console.log('Testing complete');
        process.exit();
    })

  };