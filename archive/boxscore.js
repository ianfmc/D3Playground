'use strict';

/**
function updatePoloData(data) {
  angular.element(document.getElementById('polo-tables')).scope().refresh(data);
  angular.element(document.getElementById('polo-tables')).scope().refresh('teamOne');
}

function showTeamOne(){
  angular.element(document.getElementById('polo-tables')).scope().refresh('teamOne');
}

function showTeamTwo(){
  angular.element(document.getElementById('polo-tables')).scope().refresh('teamTwo');
}

function showStatistic(){
  angular.element(document.getElementById('polo-tables')).scope().refresh('sheetTable');
}

(function (){

  function TableCtrl($timeout, $scope) {
    $scope.refresh = function(data) {
      $timeout(function() {

        function chunkSheet(arr, size) {
          var sheetArrs = [];
          for (var i = 0; i < arr.length; i += size) {
            sheetArrs.push(arr.slice(i, i + size));
          }
          return sheetArrs;
        }

        $scope.table = data.resultTable.teamOne;
        $scope.sheet = data.sheetTable;
        $scope.chunkedData = chunkSheet(data.sheetTable.left, 20);

        $scope.refresh = function(team) {
          $timeout(function(){

              $scope.team = team;
              if(team !== 'sheetTable') {
                $scope.table = data.resultTable[team];
              }

          });
        };

      }, 100);
    };
  }

  angular.module('d3Playground', [])
    .controller('TableCtrl', TableCtrl);

}());

*/