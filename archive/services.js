'use strict';

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