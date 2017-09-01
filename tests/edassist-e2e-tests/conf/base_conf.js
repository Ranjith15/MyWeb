var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
	// Add a reporter and store screenshots to `results`:
	dest: './results',
	filename: 'smoke-test-results.html',
	reportOnlyFailedSpecs: false,
	captureOnlyFailedSpecs: true,
	cleanDestination: true,
	showSummary: false,
	showQuickLinks: true,
	showConfiguration: true,
	reportTitle: null,
	preserveDirectory: false
});

module.exports = {

	// Setup the report before any tests start
	beforeLaunch: function() {
		return new Promise(function(resolve){
			reporter.beforeLaunch(resolve);
		});
	},

	// ---- 3. To use remote browsers via Sauce Labs -----------------------------
	// If sauceUser and sauceKey are specified, seleniumServerJar will be ignored.
	// The tests will be run remotely using Sauce Labs.
	sauceUser: 'ediel',
	sauceKey: '8383e265-69d9-4b22-a38a-8cd9e324c62f',
	// Use sauceAgent if you need customize agent for https connection to
	// saucelabs.com (i.e. your computer behind corporate proxy)
	sauceAgent: null,
	// Use sauceBuild if you want to group test capabilites by a build ID
	sauceBuild: null,
	// Use sauceSeleniumAddress if you need to customize the URL Protractor
	// uses to connect to sauce labs (for example, if you are tunneling selenium
	// traffic through a sauce connect tunnel). Default is
	// ondemand.saucelabs.com:80/wd/hub
	sauceSeleniumAddress: null,

	directConnect: false,

	// If you would like to run more than one instance of WebDriver on the same
	// tests, use multiCapabilities, which takes an array of capabilities.
	// If this is specified, capabilities will be ignored.
	multiCapabilities: [
		{
			browserName: 'chrome',
			platform: 'Windows 10',
			maxInstances: 1,
			name: 'Smoke Test_Chrome_Win10'
		},

		//{
		//	browserName: 'firefox',
		//	platform: 'Windows 8',
		//	maxInstances: 1,
		//	name: 'Smoke Test_Firefox_Win8'
		//},
    //
		//{
		//	browserName: 'safari',
		//	platform: 'OS X 10.11',
		//	maxInstances: 1,
		//	name: 'Smoke Test_Safari_OSX'
		//},
    //
		//{
		//	browserName: 'internet explorer',
		//	platform: 'Windows 7',
		//	maxInstances: 1,
		//	name: 'Smoke Test_IE_Win7'
		//},

		{
			browserName: 'MicrosoftEdge',
			platform: 'Windows 10',
			avoidProxy: true,
			maxInstances: 1,
			name: 'Smoke Test_Edge_Win10'
		}
	],

	// ---------------------------------------------------------------------------
	// ----- Global test information ---------------------------------------------
	// ---------------------------------------------------------------------------
	//
	// A base URL for your application under test. Calls to protractor.get()
	// with relative paths will be resolved against this URL (via url.resolve)
	baseUrl: 'https://cisco-stg.edassist.com/',

	// CSS Selector for the element housing the angular app - this defaults to
	// body, but is necessary if ng-app is on a descendant of <body>.
	rootElement: 'body',

	// The timeout in milliseconds for each script run on the browser. This should
	// be longer than the maximum time your application needs to stabilize between
	// tasks.
	allScriptsTimeout: 30000,

	// How long to wait for a page to load.
	getPageTimeout: 10000,

	onPrepare: function() {
		// At this point, global variable 'protractor' object will be set up, and
		// globals from the test framework will be available. For example, if you
		// are using Jasmine, you can add a reporter with:
		//     jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(
		//         'outputdir/', true, true));
		//
		// If you need access back to the current configuration object,
		// use a pattern like the following:
		//     return browser.getProcessedConfig().then(function(config) {
		//       // config.capabilities is the CURRENT capability being run, if
		//       // you are using multiCapabilities.
		//       console.log('Executing capability', config.capabilities);
		//     });
		browser.driver.manage().window().maximize();
		global.isAngularSite = function(flag){
			browser.ignoreSynchronization = !flag;
		};
		jasmine.getEnv().addReporter(reporter);
	},

	params: {},

	// ---------------------------------------------------------------------------
	// ----- The test framework --------------------------------------------------
	// ---------------------------------------------------------------------------

	// Test framework to use. This may be one of:
	// jasmine, mocha or custom.
	//
	// When the framework is set to "custom" you'll need to additionally
	// set frameworkPath with the path relative to the config file or absolute
	//  framework: 'custom',
	//  frameworkPath: './frameworks/my_custom_jasmine.js',
	// See github.com/angular/protractor/blob/master/lib/frameworks/README.md
	// to comply with the interface details of your custom implementation.
	//
	// Jasmine is fully supported as test and assertion frameworks.
	// Mocha has limited support. You will need to include your
	// own assertion framework (such as Chai) if working with Mocha.
	framework: 'jasmine2',

	// Options to be passed to Jasmine.
	jasmineNodeOpts: {
		showColors: true,
		includeStackTrace: true,
		defaultTimeoutInterval: 90000
	},

	// Spec patterns are relative to the location of this config.
	specs: [
		'../specs/*.test.js'
	],

	// Suites
	suites: {
		bvt: '../specs/bvt/*.js',
		regression: '../specs/regression/*.js',
		full: '../specs/*.js'
	},

	// Close the report after all tests finish
	afterLaunch: function(exitCode) {
		return new Promise(function(resolve){
			reporter.afterLaunch(resolve.bind(this, exitCode));
		});
	}
};