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
        templateUrl: 'app/welcome.html'
        // controller: 'WelcomeCtrl'
      })     
      .when('/teams', {
        templateUrl: 'app/teams.html'
      })
      .when('/tank', {
        templateUrl: 'app/main.html'
      })
      .when('/seasons', {
        templateUrl: 'app/seasons.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
