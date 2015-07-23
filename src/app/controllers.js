'use strict';

angular.module('d3Playground')
.controller('TankCtrl', function () {

    var body = d3.select('#tank');

    var w = 1024;
    var h =  768;

    var circleSize = 25;

    var paddingWidth = 5;

    var spots = [ {player: '1', type: 'pass', x: 200, y: 100},    
                  {player: '2', type: 'pass', x: 250, y: 300},
                  {player: '3', type: 'shot', x: 800, y: 400},
                  {player: '4', type: 'pass', x: 540, y: 350},
                  {player: '5', type: 'pass', x: 600, y: 200},
                  {player: '6', type: 'shot', x: 300, y: 300} ];

                  /**/

    var svg = body.append('svg');

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

    /* Left 5m */

    svg.append('line')
      .attr('x1', w*0.15)
      .attr('y1', 100+2*paddingWidth)
      .attr('x2', w*0.15)
      .attr('y2', h-(2*paddingWidth))
      .style('stroke-width', 10)
      .style('stroke', 'yellow')
      .style('opacity', '0.25')
      .style('stroke-dasharray', ('20,5'));

    /* Right 5m */

    svg.append('line')
      .attr('x1', w*0.85)
      .attr('y1', 100+2*paddingWidth)
      .attr('x2', w*0.85)
      .attr('y2', h-(2*paddingWidth))
      .style('stroke-width', 10)
      .style('stroke', 'yellow')
      .style('opacity', '0.25')
      .style('stroke-dasharray', ('20,5'));

    /* Left 2m */

    svg.append('line')
      .attr('x1', w*0.05)
      .attr('y1', 100+2*paddingWidth)
      .attr('x2', w*0.05)
      .attr('y2', h-(2*paddingWidth))
      .style('stroke-width', 10)
      .style('stroke', 'red')
      .style('opacity', '0.25')
      .style('stroke-dasharray', ('20,5'));

    /* Right 2m */

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
      .data(spots)
      .enter()
      .append('circle')
      .attr('cx', function (d) { return d.x + paddingWidth; })
      .attr('cy', function (d) { return d.y + 100 + 2*paddingWidth; })
      .attr('r', circleSize)
      .style('fill', function(d, i) {
        return 'rgba(255, 255, 255, ' + (5-i)*0.2 + ')';
      })
      .style('stroke', function(d, i) {
        return 'rgba(0, 0, 0, ' + (5-i)*0.2 + ')';
      })
      .style('stroke-width', function(d) {
        if (d.type === 'pass') {
          return '0';
        }
        else {
          return '4';
        }});

    /* var Player Numbers */

    svg.selectAll('text')
      .data(spots)
      .enter()
      .append('text')
      .text(function(d) {return d.player; })
      .attr('x', function (d) { return d.x + paddingWidth; })
      .attr('y', function (d) { return d.y + 100 + 4*paddingWidth; })
      .attr('font-family', 'arial')
      .attr('font-size', '30px')
      .style('fill', function(d, i) {
        return 'rgba(0, 0, 0, ' + (5-i)*0.2 + ')';
      })
      .attr('text-anchor', 'middle');

          /* var Left Score Box */

    svg.append('rect')
      .attr('x', paddingWidth)
      .attr('y', paddingWidth)
      .attr('width', 100)
      .attr('height', 100)
      .style('fill', d3.rgb( 200, 0, 0));

    /* var Left Score Text */

    svg.append('text')
      .text('4')
      .attr('x', paddingWidth + 50)
      .attr('y', paddingWidth + 70)
      .attr('class', 'score-text')
      .attr('text-anchor', 'middle');

    /* var Right Score Box */

    svg.append('rect')
      .attr('class', 'score-box')
      .attr('x', (w-100)-2*paddingWidth)
      .attr('y', paddingWidth)
      .attr('width', 100)
      .attr('height', 100)
      .style('fill', d3.rgb( 0, 200, 0));

    /* var Right Score Text */

    svg.append('text')
      .text('2')
      .attr('x', (w-100)-paddingWidth + 50)
      .attr('y', paddingWidth + 70)
      .attr('class', 'score-text')
      .attr('text-anchor', 'middle');

    /* var Score Box */

    svg.append('rect')
      .attr('x', w/2 - 100)
      .attr('y', paddingWidth)
      .attr('width', 200)
      .attr('height', 100)
      .style('fill', 'grey');

    /* var Control Box Text */ 

    svg.append('text')
      .text('4:30')
      .attr('x', w/2)
      .attr('y', paddingWidth + 70)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '60px')
      .attr('fill', 'white');

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
