const gulp = require('gulp');
const mocha = require('gulp-mocha');
const fsx = require('fs-extra');
const OUTPUT_DIR = './output';
const TEMP_DIR = './temp';

gulp.task('test', init);

gulp.task('url', setURL);

  async function setURL() {
    const args = require('./config/options.url').args.help().argv;
    const newURL = args.url;
    const env = args.env;

    fsx.ensureDir(TEMP_DIR);
    const credsPath = (`${TEMP_DIR}/creds.json`);
    fsx.ensureFileSync(credsPath);
    let creds = fsx.readJsonSync(credsPath, { throws: false });
    
    creds = (!creds) ? {} : creds; 
      
    console.log(`env: ${env}\nURL: '${creds[env]}'\nwill be replaced with:\n'${newURL}'`);
    creds[env] = newURL;

    console.log(`\nupdated file: ${credsPath}\n`, creds);
    // fsx.writeJsonSync(`${TEMP_DIR}/creds.json`, JSON.stringify(creds, null, 4));
    fsx.writeFileSync(`${TEMP_DIR}/creds.json`, JSON.stringify(creds, null, 4));
    
  }
  
  async function init() {
    const args = require('./config/options.test').args.help().argv;
    let instances = args.instances,
        headless = !(args.show),
        timeout = args.timeout,
        env = args.env;

    const CONFIG_PATH = `${TEMP_DIR}/tests.config.json`;
    const creds = require(`${TEMP_DIR}/creds`);
    
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
    fsx.writeFileSync(CONFIG_PATH, JSON.stringify(testsConfig, null, 4));

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