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
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
