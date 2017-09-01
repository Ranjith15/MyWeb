var config = require('./base_conf.js');

config.baseUrl = 'https://cisco-stg.edassist.com/';
config.params = {
    participant: {
      user: 'mabdulsy',
      password: 'Welcome1'
    },
    supervisor: {
      user: 'kashoka',
      password: 'Welcome1'
    }
  };
  
config.directConnect = false;
// If you would like to run more than one instance of WebDriver on the same
// tests, use multiCapabilities, which takes an array of capabilities.
// If this is specified, capabilities will be ignored.
config.multiCapabilities = [
  {
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
    version: '13',
    maxInstances: 1,
    avoidProxy: true,
    name: 'Smoke Test_Edge_Win10'
  }//,
  //{
  //  browserName: 'chrome',
  //  platform: 'Windows 10',
  //  maxInstances: 1,
  //  name: 'Smoke Test_Chrome_Win10'
  //},
  //
  //{
  //  browserName: 'firefox',
  //  platform: 'Windows 8',
  //  maxInstances: 1,
  //  name: 'Smoke Test_Firefox_Win8'
  //},
  //
  //{
  //  browserName: 'safari',
  //  platform: 'OS X 10.11',
  //  maxInstances: 1,
  //  name: 'Smoke Test_Safari_OSX'
  //},
  //
  //{
  //  browserName: 'internet explorer',
  //  platform: 'Windows 7',
  //  maxInstances: 1,
  //  name: 'Smoke Test_IE_Win7'
  //}
];

exports.config = config;