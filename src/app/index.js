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
      })     
      .when('/tank', {
        templateUrl: 'app/tank.html'
      })
      .when('/seasons', {
        templateUrl: 'app/seasons.html',
        controller: 'SeasonsCtrl'
      })
      .when('/:teamName', {
        templateUrl: 'app/team.html',
        controller: 'TeamCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
