'use strict';

angular.module('d3Playground', ['d3', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ngRoute', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('d3', [])
  .factory('d3Service', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope) {}]);

angular.module('d3Playground.directives', ['d3'])
.directive('tank', ['d3Service', function(d3Service) {
  return {
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
        });
      }};
    }]);
