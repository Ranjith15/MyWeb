'use strict';

var gulp = require('gulp');
var bower = require('gulp-bower');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var stylish = require('jshint-stylish');
var preprocess = require('gulp-preprocess');
var ngdocs = require('gulp-ngdocs');

// manage svg icons
var glob = require('glob');
var gulpicon = require('gulpicon/tasks/gulpicon');
// used for Styleguide
var webserver = require('gulp-webserver');
var gulpJade = require('gulp-jade');
// karma server
var Server = require('karma').Server;
// environment config file
var config = require('./config.json');
var gulpkss = require('gulp-kss');

// bower install
gulp.task('bower', function () {
	return bower();
});

// Lint
gulp.task('lint', function () {
	return gulp.src(['./src/**/*.js', './tests/**/*.js', '!./tests/controllers/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'));
});

// Sass
gulp.task('sass', function () {
	gulp.src(['./src/assets/scss/pages/login.scss', './src/assets/scss/pages/history.scss', './src/assets/scss/pages/newApplication.scss'])
		.pipe(sass())
		.pipe(gulp.dest('./dist/css/pages'));
	return gulp.src('./src/assets/scss/global.scss')
		.pipe(sass())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('styleguide-styles', ['sass'], function () {
    return gulp.src('./dist/css/global.css')
               .pipe(concat('style.css'))
               .pipe(gulp.dest('./styleguide/public'));
});

// Generate styleguide with templates 
gulp.task('kss', ['styleguide-styles'], function () { 
	return gulp.src(['./src/assets/scss/**/*.scss'])
		.pipe(gulpkss({
			overview: './src/assets/scss/styleguide.html'
		}))
		.pipe(gulp.dest('styleguide/'));
});

//ngdocs
gulp.task('ngdocs', function () {
    return gulp.src('./src/**/*.js')
        .pipe(ngdocs.process())
        .pipe(gulp.dest('./ngdocs'));
});

gulp.task('fonts', function () {
	return gulp.src(['./bower_components/bootstrap-sass/assets/fonts/**/*', './bower_components/font-awesome/fonts/**/*', './bower_components/open-sans-fontface/fonts/**/*'])
		.pipe(gulp.dest('./dist/fonts'));
});

gulp.task('vendor-css', function () {
	return gulp.src(['./bower_components/textAngular/dist/textAngular.css', './bower_components/angular-ui-select/dist/select.css'])
		.pipe(gulp.dest('./dist/css'));
});

var bowerPath = './bower_components/';
var vendorscriptsPath = './vendor-scripts/';
var vendorScriptSources = [
		vendorscriptsPath + 'google-analytics.js',
		vendorscriptsPath + 'new-relic.js',
		bowerPath + 'jquery/dist/jquery.min.js',
		bowerPath + 'lodash/dist/lodash.min.js',
		bowerPath + 'angular/angular.min.js',
		bowerPath + 'angular-css/angular-css.min.js',
		bowerPath + 'angular-messages/angular-messages.min.js',
		bowerPath + 'restangular/dist/restangular.min.js',
		bowerPath + 'ngstorage/ngStorage.min.js',
		bowerPath + 'ng-idle/angular-idle.min.js',
		bowerPath + 'angular-translate/angular-translate.min.js',
		bowerPath + 'angular-ui-router/release/angular-ui-router.min.js',
		bowerPath + 'bootstrap-sass/assets/javascripts/bootstrap.min.js',
		bowerPath + 'trunk8/trunk8.js',
		bowerPath + 'angular-bootstrap/ui-bootstrap.min.js',
		bowerPath + 'angular-bootstrap/ui-bootstrap-tpls.min.js',
		bowerPath + 'angular-ui-select/dist/select.min.js',
		bowerPath + 'angular-file-upload/dist/angular-file-upload.min.js',
		bowerPath + 'angular-file-saver/dist/angular-file-saver.bundle.min.js',
		bowerPath + 'textAngular/dist/textAngular-rangy.min.js',
		bowerPath + 'textAngular/dist/textAngular-sanitize.min.js',
		bowerPath + 'textAngular/dist/textAngular.min.js',
		bowerPath + 'angular-animate/angular-animate.min.js',
		bowerPath + 'angular-smart-table/dist/smart-table.min.js',
		bowerPath + 'angular-scroll/angular-scroll.min.js',
		bowerPath + 'angularjs-dropdown-multiselect/dist/angularjs-dropdown-multiselect.min.js',
		bowerPath + 'moment/min/moment.min.js',
		bowerPath + 'moment-timezone/builds/moment-timezone-with-data.min.js'
	];

function processVendorScripts(env) {
	return gulp.src(vendorScriptSources)
	.pipe(preprocess({context: env}))
	.pipe(concat('vendor.core.js'))
	.pipe(gulp.dest('./dist/js'));
}

// Concatenate & Minify JS
gulp.task('local-vendorscripts', function () {
	return processVendorScripts(config.local);
});

gulp.task('stg-vendorscripts', function () {
	return processVendorScripts(config.stg);
});

gulp.task('uat-vendorscripts', function () {
	return processVendorScripts(config.uat);
});

gulp.task('prod-vendorscripts', function () {
	return processVendorScripts(config.prod);
});

function processEdassistScipts(env) {
	return gulp.src(['./src/**/*.js', '!./src/assets/icons/config.js'])
	.pipe(preprocess({context: env}))
	.pipe(sourcemaps.init())
	.pipe(concat('edassist.core.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./dist/js'));
}

gulp.task('local-edassistScripts', function () {
	return processEdassistScipts(config.local);
});

gulp.task('stg-edassistScripts', function () {
	return processEdassistScipts(config.stg);
});

gulp.task('uat-edassistScripts', function () {
	return processEdassistScipts(config.uat);
});

gulp.task('prod-edassistScripts', function () {
	return processEdassistScipts(config.prod);
});

// Configure which files to watch and what tasks to use on file changes
gulp.task('watch', function () {
	gulp.watch('./src/**/*.js', ['lint']);
	gulp.watch('./src/**/*.js', ['local-vendorscripts']);
	gulp.watch('./src/**/*.js', ['local-edassistScripts']);
	gulp.watch('./src/**/*.scss', ['sass']);
	gulp.watch('./src/**/*.jade', ['jade']);
});

// Compile the icons
gulp.task('icons', function () {
	var config = require('./src/assets/icons/config.js');
	config.dest = './dist/assets/icons';

	// grab the file paths
	var files = glob.sync('./src/assets/icons/*.svg');

	// set up the gulp task
	gulp.task('icons', gulpicon(files, config));
});

// Copy images from src to dist
gulp.task('copyimages', function () {
	gulp.src('./src/assets/images/**/')
	.pipe(gulp.dest('./dist/assets/images/'));
});

// Compile Jade Template for Styleguide
gulp.task('jade', function () {
	return gulp.src('./src/styleguide/*.jade')
	.pipe(gulpJade({
		pretty: true
	}))
	.pipe(gulp.dest('./dist/styleguide'));
});

// Webserver for Styleguide: localhost:8081/styleguide
gulp.task('webserver', function () {
	gulp.src('./dist/')
		.pipe(webserver({
			port: '8081'
		}));
});

gulp.task('test', function (done) {
	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done).start();
});

gulp.task('tdd', function (done) {
	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: false
	}, done).start();
});

// Default Task
gulp.task('default', ['lint', 'sass', 'ngdocs', 'local-vendorscripts', 'local-edassistScripts', 'icons', 'copyimages', 'fonts', 'vendor-css']);
gulp.task('stg', ['lint', 'sass', 'stg-vendorscripts', 'stg-edassistScripts', 'icons', 'copyimages', 'fonts', 'vendor-css']);
gulp.task('uat', ['lint', 'sass', 'uat-vendorscripts', 'uat-edassistScripts', 'icons', 'copyimages', 'fonts', 'vendor-css']);
gulp.task('prod', ['lint', 'sass', 'prod-vendorscripts', 'prod-edassistScripts', 'icons', 'copyimages', 'fonts', 'vendor-css']);
gulp.task('styleguide', ['lint', 'sass', 'local-vendorscripts', 'local-edassistScripts', 'icons', 'copyimages', 'jade', 'webserver', 'watch', 'fonts', 'vendor-css']);