'use strict';

angular.module('d3Playground')
.controller('NavbarCtrl', function ($scope) {
    $scope.date = new Date();
  });

angular.module('d3Playground')
.controller('TankCtrl', function ($scope, $routeParams, teamsService, gamesService) {

    $scope.teams = teamsService.get();
    $scope.game = gamesService.getForID(parseInt($routeParams.id));

});

angular.module('d3Playground')
.controller('TeamsCtrl', function ($scope, teamsService) {

    $scope.teams = teamsService.get();
  
  });

angular.module('d3Playground')
.controller('TeamCtrl', function ($scope, $routeParams, teamsService, seasonsService, playersService, gamesService) {

    $scope.selectedTeam = teamsService.getByName($routeParams.teamName);   
    $scope.selectedTeam.roster = playersService.getForTeam($scope.selectedTeam.id);

    $scope.seasons = seasonsService.get();
    $scope.selectedSeason = $scope.seasons[0];
    $scope.selectedSeasonName = $scope.selectedSeason;

    $scope.games = gamesService.getForSeason($scope.selectedSeason.id);

    $scope.changed = function () {
       $scope.selectedSeason = $scope.seasons.filter(function(value) {
        if (value===$scope.selectedSeasonName) {
          return true;
        }
      })[0];
    };
  });

angular.module('d3Playground')
.filter('encodeURI', function() {
  return window.encodeURI;
  });
