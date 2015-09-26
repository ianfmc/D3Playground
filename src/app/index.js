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
        //controller: ''
      })     
      .when('/:teamName', {
        templateUrl: 'app/team.html',
        controller: 'TeamCtrl'
      })      
      .when('/games/:id', {
        templateUrl: 'app/tank.html',
        controller: 'TankCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
