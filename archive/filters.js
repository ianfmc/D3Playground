
'use strict';

angular.module('d3Playground')
.filter('encodeURI', function() {
  return window.encodeURI;
  });