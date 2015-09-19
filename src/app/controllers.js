'use strict';

angular.module('d3Playground')
.controller('TankCtrl', function ($scope) {

    $scope.teams = [  {name: 'Red Barons', color: '200, 40, 40'},
                      {name: 'Blue Bombers', color: '50, 50, 200'} ];

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

      return;
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

      /* Forward Button Box */

      svg.append('rect')
        .attr('x', w*0.50 + (250-100))
        .attr('y', paddingWidth)
        .attr('width', 100)
        .attr('height', 100)
        .style('fill', 'grey')
        .on('click', clickRightButton);

      /* Back Button Box */

      svg.append('rect')
        .attr('x', w*0.5 - 250)
        .attr('y', paddingWidth)
        .attr('width', 100)
        .attr('height', 100)
        .style('fill', 'grey')
        .on('click', clickLeftButton);
    };

    draw();
});

angular.module('d3Playground')
.factory('seasonsService', function() {

  var seasonsList = {};
  seasonsList.list = [{ id: 0,
                        name: '2015 Spring Season'
                      },
                      { id: 1,
                        name: '2015 Junior Olympic Season'
                      }];  

  seasonsList.get = function() {
    return seasonsList.list;
  };

  return seasonsList;
});

angular.module('d3Playground')
.factory('teamsService', function() {

  var teamList = {};
  teamList.list = [{  id: 0,
                      name: 'Red Barons', 
                      color: '200, 40, 40', 
                      roster:  [{firstName: 'Pete', lastName: 'Smith', cap: '1'},
                                  {firstName: 'Sam', lastName: 'Jones', cap: '2'}]
                    },
                    { id: 1,
                      name: 'Blue Bombers', 
                      color: '50, 50, 200', 
                      roster: [{firstName: 'Joe', lastName: 'Miller', cap: '1'},
                               {firstName: 'Al', lastName: 'Long', cap: '2'}]
                    }];

  teamList.get = function() {
    return teamList.list;
  };

  return teamList;
});

angular.module('d3Playground')
.controller('SeasonsCtrl', function ($scope, $routeParams, seasonsService) {

    $scope.seasons = seasonsService.get();
    $scope.selectedSeason = $scope.seasons[0];
    $scope.selectedSeasonName = $scope.selectedSeason;
    
    $scope.changed = function () {
       $scope.selectedSeason = $scope.seasons.filter(function(value) {
        if (value===$scope.selectedSeasonName) {
          return true;
        }
      })[0];
    };

});

angular.module('d3Playground')
.controller('TeamsCtrl', function ($scope, $routeParams, teamsService) {

    $scope.teams = teamsService.get();
    $scope.selectedTeam = $scope.teams[0];
    $scope.selectedTeamName = $scope.selectedTeam;
    
    $scope.changed = function () {
       $scope.selectedTeam = $scope.teams.filter(function(value) {
        if (value===$scope.selectedTeamName) {
          return true;
        }
      })[0];
    };
  });

angular.module('d3Playground')
.controller('TeamCtrl', function ($scope, $routeParams) {

  //
 
});

angular.module('d3Playground')
  .controller('MainCtrl', function ($scope) {
    
  //

});
