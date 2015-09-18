'use strict';

angular.module('d3Playground', [ 
  'ngAnimate', 
  'ngCookies', 
  'ngTouch', 
  'ngSanitize', 
  'ngResource', 
  'ngRoute', 
  'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main.html',
        // template: '<h1>Tank Page </h1><br><a href="#/team">Switch to Team Page</a>',
        // controller: 'MainCtrl'
      })
      .when('/teams', {
        templateUrl: 'app/teams.html'
        // template: '<h1>Team Page </h1><br><a href="#/">Switch to Tank Page</a>',
        // controller: 'TeamCtrl'
      })
      .when('/team', {
        templateUrl: 'app/team.html'
        // template: '<h1>Team Page </h1><br><a href="#/">Switch to Tank Page</a>',
        // controller: 'TeamCtrl'
      })
      .when('/seasons', {
        templateUrl: 'app/seasons.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
