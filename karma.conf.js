'use strict';

module.exports = function(config) {

  var configuration = {

    colors: true,

    autoWatch : true,

    basePath: '',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/d3/d3.js',
      'bower_components/jquery/jquery.js',
      'src/app/scripts/**/*.js',
      'src/app/specs/**/*.js'
    ],

    frameworks: [
      'jasmine', 'karma-jasmine'],

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'gulpAngular'
    },

    browsers : ['PhantomJS'],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],

    preprocessors: {
      'src/**/*.html': ['ng-html2js']
    },

    singleRun: false

  };  

  config.set(configuration);
};
