'use strict';

angular.module('d3Playground')
.controller('TankCtrl', function ($scope) {

    $scope.eventSpots = [ {time: '1:24', player: '1', type: 'pass', x: 100, y: 100},    
                          {time: '1:54', player: '2', type: 'pass', x: 200, y: 150},
                          {time: '2:24', player: '3', type: 'shot', x: 300, y: 200},
                          {time: '2:54', player: '4', type: 'pass', x: 400, y: 250},
                          {time: '3:24', player: '5', type: 'pass', x: 500, y: 300},
                          {time: '3:54', player: '6', type: 'pass', x: 600, y: 350},
                          {time: '4:24', player: '7', type: 'pass', x: 700, y: 300} ];


    $scope.body = d3.select('#tank');
    $scope.currentIndex = 0;

    $scope.tankConfig = {
      width: 1024,
      height: 768,
      circleSize: 25,
      paddingWidth: 5
    };

    var w = $scope.tankConfig.width;
    var h =  $scope.tankConfig.height;

    var circleSize = $scope.tankConfig.circleSize;
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

    /* Center Line*/

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
      .style('stroke', 'white')

    /* Right Goal */

    svg.append('line')
      .attr('x1', w*0.99)
      .attr('y1', 50+(h*0.5)-50)
      .attr('x2', w*0.99)
      .attr('y2', 50+(h*0.5)+50)
      .style('stroke-width', 20)
      .style('stroke', 'white')

    /* Event Circles */

    svg.selectAll('circle')
      .data($scope.eventSpots)
      .enter()
      .append('circle')
      .attr('cx', function (d) { return d.x + paddingWidth; })
      .attr('cy', function (d) { return d.y + 100 + 2*paddingWidth; })
      .attr('r', circleSize)
      .style('fill', function(d, i) {
        return 'rgba(255, 255, 255, ' + Math.max(0, (7-i)*0.2) + ')';
      })
      .style('stroke', function(d, i) {
        return 'rgba(0, 0, 0, ' + Math.max(0, (7-i)*0.2) + ')';
      })
      .style('stroke-width', function(d) {
        if (d.type === 'pass') {
          return '0';
        }
        else {
          return '4';
        }});

    /* Player Numbers */

    svg.selectAll('text')
      .data($scope.eventSpots)
      .enter()
      .append('text')
      .text(function(d) {return d.player; })
      .attr('x', function (d) { return d.x + paddingWidth; })
      .attr('y', function (d) { return d.y + 100 + 4*paddingWidth; })
      .attr('font-family', 'arial')
      .attr('font-size', '30px')
      .style('fill', function(d, i) {
        return 'rgba(0, 0, 0, ' + Math.max(0, (5-i)*0.2) + ')';
      })
      .attr('text-anchor', 'middle');

    /* Left Score Box */

    svg.append('rect')
      .attr('x', paddingWidth)
      .attr('y', paddingWidth)
      .attr('width', 100)
      .attr('height', 100)
      .style('fill', d3.rgb( 200, 0, 0));

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
      .style('fill', d3.rgb( 0, 200, 0));

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
      .text($scope.eventSpots[$scope.currentIndex].time)
      .attr('x', w/2)
      .attr('y', paddingWidth + 70)
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
      .style('fill', 'orange')
      .on('click', function() {
        currentIndex = currentIndex + 1;
        alert('forward' + ' ' + $scope.currentIndex);
      });

    /* Back Button Box */

    svg.append('rect')
      .attr('x', w*0.5 - 250)
      .attr('y', paddingWidth)
      .attr('width', 100)
      .attr('height', 100)
      .style('fill', 'orange')
      .on('click', function() {
        currentIndex = currentIndex - 1;
        alert('back' + ' ' + $scope.currentIndex);
      });

});

angular.module('d3Playground')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      {
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'angular.png'
      },
      {
        'title': 'BrowserSync',
        'url': 'http://browsersync.io/',
        'description': 'Time-saving synchronised browser testing.',
        'logo': 'browsersync.png'
      },
      {
        'title': 'GulpJS',
        'url': 'http://gulpjs.com/',
        'description': 'The streaming build system.',
        'logo': 'gulp.png'
      },
      {
        'title': 'Jasmine',
        'url': 'http://jasmine.github.io/',
        'description': 'Behavior-Driven JavaScript.',
        'logo': 'jasmine.png'
      },
      {
        'title': 'Karma',
        'url': 'http://karma-runner.github.io/',
        'description': 'Spectacular Test Runner for JavaScript.',
        'logo': 'karma.png'
      },
      {
        'title': 'Protractor',
        'url': 'https://github.com/angular/protractor',
        'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
        'logo': 'protractor.png'
      },
      {
        'title': 'Bootstrap',
        'url': 'http://getbootstrap.com/',
        'description': 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
        'logo': 'bootstrap.png'
      },
      {
        'title': 'Angular UI Bootstrap',
        'url': 'http://angular-ui.github.io/bootstrap/',
        'description': 'Bootstrap components written in pure AngularJS by the AngularUI Team.',
        'logo': 'ui-bootstrap.png'
      }
    ];
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  });
