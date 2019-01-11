let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
   
    directConnect : true,
  
   capabilities: {
    browserName: 'chrome'
  },
  
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