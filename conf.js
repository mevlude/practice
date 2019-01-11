let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
   
   // directConnect : true,
    SeleniumAddress: 'ondemand.saucelabs.com:80/wd/hub',
    sauceUser: 'evac',
    sauceKey: '43f3e245-0f82-4f5d-9db5-98701241dacd',
        //directConnect: true,
        multiCapabilities: [{
            browserName: 'firefox',
            version: 'latest',
            platform: 'OS X 10.10',
            name: "firefox-tests",
            shardTestFiles: true,
            maxInstances: 25
        }, {
            browserName: 'chrome',
            version: '41',
            platform: 'Windows 7',
            name: "chrome-tests",
            shardTestFiles: true,
            maxInstances: 25
        }],
  //  capabilities: {
  //   browserName: 'chrome'
  // },
  
  specs: ['test.spec.js'], 

  // suites:{
  //   smoke: ['../Tests/BankManagerSimple.spec.js', '../Tests/demo.spec.js'],
  //   regression: ['../Tests/*.spec.js']
  // },

onPrepare: function () {
    browser.driver.manage().window().maximize();
    jasmine.getEnv().addReporter(new SpecReporter({
        displayFailuresSummary: true,
        displayFailuredSpec: true,
        displaySuiteNumber: true,
        displaySpecDuration: true,
        showstack: false
      }));
      // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
      jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: '../report/screenshots',
        preserveDirectory: false,
        screenshotsSubfolder: 'images',
         jsonsSubfolder: 'jsons',
         docName: 'CyberBank-Report.html'
     }).getJasmine2Reporter());

     var AllureReporter = require('jasmine-allure-reporter');
     jasmine.getEnv().addReporter(new AllureReporter());
     jasmine.getEnv().afterEach(function(done){
       browser.takeScreenshot().then(function (png) {
         allure.createAttachment('Screenshot', function () {
           return new Buffer(png, 'base64')
         }, 'image/png')();
         done();
       })
     });
  
},
    
    jasmineNodeOpts: {
        showColors: true, 
        defaultTimeoutInterval: 100000,    
        print: function() {}
        
}
};