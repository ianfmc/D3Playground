/* jshint -W097 */

'use strict';

var d3Playground = angular.module('d3Playground', [
  'ngRoute',
  'ngAnimate',
  'ngTouch',
  'ngSanitize',
  'ngResource'
  ]);

/** Routing */

d3Playground.config(['$routeProvider', 
  function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/templates/welcome.html'
      })     
      .when('/:teamName', {
        templateUrl: 'app/templates/team.html',
        controller: 'TeamCtrl'
      })      
      .when('/games/:id', {
        templateUrl: 'app/templates/tank.html',
        controller: 'TankCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    }]);

/** Controllers */

d3Playground.controller('NavbarCtrl', function ($scope) {
    $scope.date = new Date();
  });

d3Playground.controller('TankCtrl', function ($scope, $routeParams, teamsService, gamesService) {

    $scope.teams = teamsService.get();
    $scope.game = gamesService.getForID(parseInt($routeParams.id));

    $scope.resultsChoice = 'rewind';
});

d3Playground.controller('TeamsCtrl', function ($scope, teamsService) {

    $scope.teams = teamsService.get();
    $scope.isLoggedOut = false;
    $scope.isLoggedIn = true;
  
  });

d3Playground.controller('TeamCtrl', function ($scope, $routeParams, teamsService, seasonsService, playersService, gamesService) {

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

/** Directives */

d3Playground.directive('tank', function () {
    return {
      scope: true,
      restrict: 'A',
      template: '<div id="tank" class="md-col-12"></div>',
      link: function ($scope) {
     
        $scope.eventSpots = [ {team: 0, time: '1:24', player: '1', type: 'shot', x: 100, y: 100},    
                              {team: 0, time: '1:54', player: '2', type: 'pass', x: 200, y: 150},
                              {team: 0, time: '2:24', player: '3', type: 'shot', x: 300, y: 200},
                              {team: 1, time: '2:54', player: '4', type: 'pass', x: 400, y: 250},
                              {team: 1, time: '3:24', player: '5', type: 'pass', x: 500, y: 300},
                              {team: 1, time: '3:54', player: '6', type: 'pass', x: 600, y: 350},
                              {team: 1, time: '4:24', player: '7', type: 'pass', x: 700, y: 300},
                              {team: 1, time: '4:54', player: '8', type: 'goal', x: 800, y: 250},
                              {team: 0, time: '5:24', player: '2', type: 'steal', x: 700, y: 200} ];

        $scope.body = d3.select('#tank');
        $scope.index = {
          top: -1,
          bottom: 0
        };
      
        $scope.tankConfig = {
          width: 1024,
          height: 768,
          circleSize: 25,
          paddingWidth: 5
        };

        var clickLeftButton = function () {
          $scope.index.top = Math.max($scope.index.top - 1, 0);
          $scope.index.bottom = Math.max($scope.index.top - 4, 0);

          var svg = $scope.body.select('svg');

          svg.selectAll('.event')
            .data($scope.eventSpots[$scope.index.top])
            .exit()
            .transition()
            .duration(500)
            .remove();

          svg.selectAll('.player-number')
            .data($scope.eventSpots[$scope.index.bottom])
            .exit()
            .transition()
            .duration(500)
            .remove();

          update();
        };

        var clickRightButton = function() {
          $scope.index.top = Math.min($scope.index.top+1, $scope.eventSpots.length);
          $scope.index.bottom = Math.max($scope.index.top - 4, 0);

          var svg = $scope.body.select('svg');

          svg.selectAll('.event')
            .data($scope.eventSpots[$scope.index.bottom])
            .exit()
            .transition()
            .duration(500)
            .remove();

          svg.selectAll('.player-number')
            .data($scope.eventSpots[$scope.index.bottom])
            .exit()
            .transition()
            .duration(500)
            .remove();

          update();
        };

        /* Update the Events */

        var update = function () {

          var w = $scope.tankConfig.width;

          var circleSize = $scope.tankConfig.circleSize;
          var paddingWidth = $scope.tankConfig.paddingWidth;

          var svg = $scope.body.select('svg');

          /* Event Circles for passes, shots and goals */

          svg.selectAll('svg')
            .data($scope.eventSpots.slice($scope.index.bottom, $scope.index.top+1))
            .enter()
            .append('circle')
            .attr('cx', function (d) { return d.x + paddingWidth; })
            .attr('cy', function (d) { return d.y + 100 + 2*paddingWidth; })
            .attr('r', function (d) {
              if (d.type !== 'steal') {
                return circleSize;
              }
              else {
                return 0;
              }})
            .attr('class', 'event')
            .style('fill','rgba(255, 255, 255, 1)')
            .style('stroke', function(d) {return 'rgb(' + $scope.teams[d.team].color + ')';})
            .style('stroke-width', '10');

          /* Draw a 'Halo' for a Shot or a Goal */

          svg.selectAll('svg')
            .data($scope.eventSpots.slice($scope.index.bottom, $scope.index.top+1))
            .enter()
            .append('circle')
            .attr('cx', function (d) { return d.x + paddingWidth; })
            .attr('cy', function (d) { return d.y + 100 + 2*paddingWidth; })
            .attr('r', circleSize+8)
            .attr('class', 'event')
            .style('fill','rgba(255, 255, 255, 0)')
            .style('stroke', function(d) {return 'rgb(' + $scope.teams[d.team].color + ')';})
            .style('stroke-width', function(d) {
              if (d.type === 'pass') {
                return '0';
              }
              else if (d.type === 'steal') {
                return '0';
              }
              else {
                return '2';
              }
            });

          /* Squares for a Steal */

          svg.selectAll('svg')
            .data($scope.eventSpots.slice($scope.index.bottom, $scope.index.top+1))
            .enter()
            .append('rect')
            .attr('width', function (d) {
              if (d.type === 'steal') {
                return 2*circleSize;
              }
              else {
                return 0;
              }})
            .attr('height', function (d) {
              if (d.type === 'steal') {
                return 2*circleSize;
              }
              else {
                return 0;
              }})
            .attr('x', function (d) {return d.x + paddingWidth - circleSize;})
            .attr('y', function (d) {return d.y + 100 + 2*paddingWidth - circleSize;})
            .attr('class', 'event')
            .style('fill','rgba(255, 255, 255, 1)')
            .style('stroke', function(d) {return 'rgb(' + $scope.teams[d.team].color + ')';})
            .style('stroke-width', '10');    

          /* Player Numbers */

          svg.selectAll('svg')
            .data($scope.eventSpots.slice($scope.index.bottom, $scope.index.top+1))
            .enter()
            .append('text')
            .text(function(d) {return d.player; })
            .attr('class', 'player-number')
            .attr('x', function (d) { return d.x + paddingWidth; })
            .attr('y', function (d) { return d.y + 100 + 4*paddingWidth; })
            .attr('font-family', 'arial')
            .attr('font-size', '30px')
            .style('fill', 'rgba(0, 0, 0, 1)')
            .attr('text-anchor', 'middle');

          /* Update Time */

          svg.select('#time-left')
            .text(function () {return $scope.eventSpots[$scope.index.top].time; })
            .attr('x', w/2)
            .attr('y', paddingWidth + 70);  
        };

        /* Draw the Tank */

        var draw = function () {

          var w = $scope.tankConfig.width;
          var h = $scope.tankConfig.height;

          var paddingWidth = $scope.tankConfig.paddingWidth;

          var svg = $scope.body.append('svg');

          svg.attr('width', w);
          svg.attr('height', h);
          svg.style('border', '2px black solid');

          /* Tank */

          svg.append('rect')
            .attr('class', 'tank')
            .attr('x', paddingWidth)
            .attr('y', 100+(2*paddingWidth))
            .attr('width', w-(3*paddingWidth))
            .attr('height', (h-(100+(3*paddingWidth)+paddingWidth)));

          /* Center Line */

          svg.append('line')
            .attr('x1', w*0.5)
            .attr('y1', 100+2*paddingWidth)
            .attr('x2', w*0.5)
            .attr('y2', h-(2*paddingWidth))
            .style('stroke-width', 10)
            .style('stroke', 'white')
            .style('opacity', '0.25')
            .style('stroke-dasharray', ('20,5'));

          /* Left 5m Line*/

          svg.append('line')
            .attr('x1', w*0.15)
            .attr('y1', 100+2*paddingWidth)
            .attr('x2', w*0.15)
            .attr('y2', h-(2*paddingWidth))
            .style('stroke-width', 10)
            .style('stroke', 'yellow')
            .style('opacity', '0.25')
            .style('stroke-dasharray', ('20,5'));

          /* Right 5m Line*/

          svg.append('line')
            .attr('x1', w*0.85)
            .attr('y1', 100+2*paddingWidth)
            .attr('x2', w*0.85)
            .attr('y2', h-(2*paddingWidth))
            .style('stroke-width', 10)
            .style('stroke', 'yellow')
            .style('opacity', '0.25')
            .style('stroke-dasharray', ('20,5'));

          /* Left 2m Line*/

          svg.append('line')
            .attr('x1', w*0.05)
            .attr('y1', 100+2*paddingWidth)
            .attr('x2', w*0.05)
            .attr('y2', h-(2*paddingWidth))
            .style('stroke-width', 10)
            .style('stroke', 'red')
            .style('opacity', '0.25')
            .style('stroke-dasharray', ('20,5'));

          /* Right 2m Line*/

          svg.append('line')
            .attr('x1', w*0.95)
            .attr('y1', 100+2*paddingWidth)
            .attr('x2', w*0.95)
            .attr('y2', h-(2*paddingWidth))
            .style('stroke-width', 10)
            .style('stroke', 'red')
            .style('opacity', '0.25')
            .style('stroke-dasharray', ('20,5'));


          /* Left Goal */

          svg.append('line')
            .attr('x1', w*0.01)
            .attr('y1', 50+(h*0.5)-50)
            .attr('x2', w*0.01)
            .attr('y2', 50+(h*0.5)+50)
            .style('stroke-width', 20)
            .style('stroke', 'white');

          /* Right Goal */

          svg.append('line')
            .attr('x1', w*0.99)
            .attr('y1', 50+(h*0.5)-50)
            .attr('x2', w*0.99)
            .attr('y2', 50+(h*0.5)+50)
            .style('stroke-width', 20)
            .style('stroke', 'white');

          /* Left Score Box */

          svg.append('rect')
            .attr('class', 'score-box')
            .attr('x', paddingWidth)
            .attr('y', paddingWidth)
            .attr('width', 100)
            .attr('height', 100)
            .style('fill', function () {return 'rgb(' + $scope.teams[0].color +')';});

          /* Left Score Text */

          svg.append('text')
            .text('4')
            .attr('x', paddingWidth + 50)
            .attr('y', paddingWidth + 70)
            .attr('class', 'score-text')
            .attr('text-anchor', 'middle');

          /* Right Score Box */

          svg.append('rect')
            .attr('class', 'score-box')
            .attr('x', (w-100)-2*paddingWidth)
            .attr('y', paddingWidth)
            .attr('width', 100)
            .attr('height', 100)
            .style('fill', function () {return 'rgb(' + $scope.teams[1].color +')';});

          /* Right Score Text */

          svg.append('text')
            .text('2')
            .attr('x', (w-100)-paddingWidth + 50)
            .attr('y', paddingWidth + 70)
            .attr('class', 'score-text')
            .attr('text-anchor', 'middle');


          /* Time Box */

          svg.append('rect')
            .attr('x', (w/2 - 100))
            .attr('y', paddingWidth)
            .attr('width', 200)
            .attr('height', 100)
            .style('fill', 'grey');

          /* Time Text */ 

          svg.append('text')
            .text('0:00')
            .attr('x', w/2)
            .attr('y', paddingWidth + 70)
            .attr('id', 'time-left')
            .attr('text-anchor', 'middle')
            .attr('font-family', 'sans-serif')
            .attr('font-size', '60px')
            .attr('fill', 'white');

          /* Forward Text */

          svg.append('text')
            .text('>')
            .attr('x', w*0.50 + (250-100))
            .attr('y', paddingWidth + 70)
            .attr('id', 'fast-foward')
            .attr('text-anchor', 'middle')
            .attr('font-family', 'sans-serif')
            .attr('font-size', '60px')
            .attr('fill', 'black')
            .on('click', clickRightButton);

          /* Back Button Box */

          svg.append('text')
            .text('<')
            .attr('x', w*0.50 - (250-100))
            .attr('y', paddingWidth + 70)
            .attr('id', 'rewind')
            .attr('text-anchor', 'middle')
            .attr('font-family', 'sans-serif')
            .attr('font-size', '60px')
            .attr('fill', 'black')
            .on('click', clickLeftButton);


        };
        draw();
      }
    };
 });

d3Playground.directive('table', function () {
    return {
      scope: true,
      restrict: 'A',
      templateUrl: 'app/templates/boxscore.html', // '<div class="md-col-12"><h2>Table</h2></div>',
      link: function () {
        // actions here
      }
    };
});

/** Filters */

d3Playground.filter('encodeURI', function() {
  return window.encodeURI;
  });

d3Playground.factory('seasonsService', function() {

  var seasonsList = {};
  seasonsList.list = [{ id: 1,
                        name: '2015 Spring Season',
                        games: {}
                      },
                      { id: 2,
                        name: '2015 Junior Olympic Season',
                        games: {}
                      }];  

  seasonsList.get = function() {
    return seasonsList.list;
  };

  return seasonsList;
});

/** Services */

d3Playground.factory('gamesService', function() {

  var gamesList = {};
  gamesList.list = [{ id: 1,
                      seasonID: 1, 
                      date: '3/15/15',
                      location: 'San Diego, CA',
                      opponent: 'Red Barons',
                      score: '13:12'
                    },
                    {
                      id: 2,
                      date: '3/27/15',
                      seasonID: 1, 
                      location: 'Irvine, CA',
                      opponent: 'Blue Bomber',
                      score: '6:10'
                    }];

  gamesList.get = function() {
    return gamesList.list;
  };

  gamesList.getForSeason = function (id) {
    return gamesList.list.filter(function(value) {
      if (value.seasonID===id) {
        return true;
      }
    });
  };

  gamesList.getForID = function (id) {
    return gamesList.list.filter(function(value) {
      if (value.id===id) {
        return true;
      }
    })[0];
  };

  return gamesList;
});

d3Playground.factory('teamsService', function() {

  var teamList = {};
  teamList.list = [{  id: 1,
                      name: 'Red Barons', 
                      color: '200, 40, 40', 
                      roster: {}
                    },
                    { id: 2,
                      name: 'Blue Bombers', 
                      color: '50, 50, 200', 
                      roster: {}
                    },
                    { id: 3,
                      name: 'White Caps', 
                      color: '240, 240, 240', 
                      roster: {}
                    }];

  teamList.get = function() {
    return teamList.list;
  };

  teamList.getByName = function (name) {
    return teamList.list.filter(function(value) {
      if (value.name===name) {
        return true;
      }
    })[0];
  };

  return teamList;
});

d3Playground.factory('playersService', function() {

  var playerList = {};
  playerList.list = [
                      {id: 1, teamID: 1, firstName: 'Pete', lastName: 'Smith', cap: '1'},
                      {id: 2, teamID: 1, firstName: 'Sam', lastName: 'Jones', cap: '2'},
                      {id: 3, teamID: 2, firstName: 'Joe', lastName: 'Miller', cap: '1'},
                      {id: 4, teamID: 2, firstName: 'Al', lastName: 'Long', cap: '2'},
                      {id: 5, teamID: 3, firstName: 'Zana', lastName: 'Patrick', cap: '1'},
                      {id: 6, teamID: 3, firstName: 'Amelia', lastName: 'Starr', cap: '2'}
                    ];

  playerList.get = function() {
    return playerList.list;
  };

  playerList.getForTeam = function (id) {
    return playerList.list.filter(function(value) {
      if (value.teamID===id) {
        return true;
      }
    });
  };

  return playerList;
});

d3Playground.factory('gameEventsService', function() {

  var gameEventsList = {};
  gameEventsList.list = [ 
                      {team: 0, time: '1:24', player: '1', type: 'shot', x: 100, y: 100},    
                      {team: 0, time: '1:54', player: '2', type: 'pass', x: 200, y: 150},
                      {team: 0, time: '2:24', player: '3', type: 'shot', x: 300, y: 200},
                      {team: 1, time: '2:54', player: '4', type: 'pass', x: 400, y: 250},
                      {team: 1, time: '3:24', player: '5', type: 'pass', x: 500, y: 300},
                      {team: 1, time: '3:54', player: '6', type: 'pass', x: 600, y: 350},
                      {team: 1, time: '4:24', player: '7', type: 'pass', x: 700, y: 300},
                      {team: 1, time: '4:54', player: '8', type: 'goal', x: 800, y: 250},
                      {team: 0, time: '5:24', player: '2', type: 'steal', x: 700, y: 200} 
                    ];

  return gameEventsList;
});
