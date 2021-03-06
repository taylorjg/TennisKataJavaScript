/* global module */

// Karma configuration
// Generated on Sat Jan 18 2014 11:24:49 GMT+0000 (GMT Standard Time)

module.exports = function(config) {

	"use strict";

	config.set({

		// base path, that will be used to resolve files and exclude
		basePath: "",


		// frameworks to use
		frameworks: ["jasmine"],


		// list of files / patterns to load in the browser
		files: [
			"Scripts/*.js",
			"Scripts/Model/*.js",
            "Scripts/Monitors/*.js",
			"Scripts/Presentation/*.js",
			"Tests/it_multiple.js",
            //TODO: also need jQuery...
			//"Tests/jasmine-jquery/jasmine-jquery.js",
			"Tests/Common/*.js",
			"Tests/*Spec.js",
			"Tests/Model/*Spec.js",
			"Tests/Monitors/*Spec.js",
			"Tests/Presentation/*Spec.js"
		],


		// list of files to exclude
		exclude: [
			"Scripts/TennisKata.js",
            "Tests/UserInterfaceSpec.js"
		],


		// test results reporter to use
		// possible values: "dots", "progress", "junit", "growl", "coverage"
		reporters: ["spec"],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera (has to be installed with `npm install karma-opera-launcher`)
		// - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
		// - PhantomJS
		// - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
		browsers: ["PhantomJS"],


		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,


		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true
	});
};
