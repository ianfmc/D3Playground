/* jshing -W097 */

'use strict';

describe('Teams Controller', function () {

  var scope; 
  var ctrl;

  beforeEach(module('d3Playground'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('TeamsCtrl', {$scope: scope});
  }));

  it('Should Have Two Teams', function () {
      
      var teams = scope.teams;
      expect(teams.length).toBe(3);

  });
});

describe('Tank Controller', function () {

  var scope; 
  var ctrl;

  beforeEach(module('d3Playground'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('TankCtrl', {$scope: scope});
  }));

  it('Should Show The Tank by Default', function () {
      
      var choice = scope.resultsChoice;
      expect(choice).toBe('rewind');

  });
});

describe('URL Encoder Filter', function () {

  var $filter;

  beforeEach(module('d3Playground'));

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('Should Convert the URL', function () {
      
      var newURL = $filter('encodeURI');
      expect(newURL('A URL')).toBe('A%20URL');

  });
});