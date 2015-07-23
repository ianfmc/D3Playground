'use strict';

// var body = d3.select('body');

var w = 1024;
var h =  768;

var paddingWidth = 5;

var spots = [ {type: 'pass', x: 200, y: 100},
              {type: 'pass', x: 250, y: 300},
              {type: 'shot', x: 800, y: 400},
              {type: 'pass', x: 540, y: 350},
              {type: 'pass', x: 600, y: 200},
              {type: 'shot', x: 300, y: 300}];

var svg = body.append('svg');

svg.attr('width', w);
svg.attr('height', h);

var leftScoreBox = svg.append('rect')
  .attr('x', paddingWidth)
  .attr('y', paddingWidth)
  .attr('width', 100)
  .attr('height', 100)
  .style('fill', d3.rgb( 200, 0, 0));

var leftScoreText = svg.append('text')
  .text('4')
  .attr('x', paddingWidth + 50)
  .attr('y', paddingWidth + 70)
  .attr('class', 'score-text')
  .attr('text-anchor', 'middle');

var rightScoreBox = svg.append('rect')
  .attr('class', 'score-box')
  .attr('x', (w-100)-paddingWidth)
  .attr('y', paddingWidth)
  .attr('width', 100)
  .attr('height', 100)
  .style('fill', d3.rgb( 0, 200, 0));

var rightScoreText = svg.append('text')
  .text('2')
  .attr('x', (w-100)-paddingWidth + 50)
  .attr('y', paddingWidth + 70)
  .attr('class', 'score-text')
  .attr('text-anchor', 'middle');

var controlBox = svg.append('rect')
  .attr('x', w/2 - 100)
  .attr('y', paddingWidth)
  .attr('width', 200)
  .attr('height', 100)
  .style('fill', 'grey');

var controlBoxText = svg.append('text')
  .text('4:30')
  .attr('x', w/2)
  .attr('y', paddingWidth + 70)
  .attr('text-anchor', 'middle')
  .attr('font-family', 'sans-serif')
  .attr('font-size', '60px')
  .attr('fill', 'white');


var tank = svg.append('rect')
  .attr('class', 'tank')
  .attr('x', paddingWidth)
  .attr('y', 100+(2*paddingWidth))
  .attr('width', w-(2*paddingWidth))
  .attr('height', (h-(100+(2*paddingWidth)+paddingWidth)));

var eventCircles = svg.selectAll('circle')
  .data(spots)
  .enter()
  .append('circle')
  .attr('cx', function (d) { return d.x + paddingWidth; })
  .attr('cy', function (d) { return d.y + 100 + 2*paddingWidth; })
  .attr('r', '30')
  .style('fill', function(d, i) {
    return 'rgba(255, 255, 255, ' + (5-i)*0.2 + ')';
  })
  .style('stroke', function(d, i) {
    return 'rgba(0, 0, 0, ' + (5-i)*0.2 + ')';
  })
  .style('stroke-width', function(d, i) {
    if (d.type === 'pass') {
      return '0';
    }
    else {
      return '4';
    }
  });


/**

var yScale = d3.scale.linear()
  .domain([0, d3.max(dataValues, function(d) { return d; })])
  .range([0, h*0.8]);

var bars = svg.selectAll('rect')
  .data(dataValues)
  .enter()
  .append('rect')
  .attr('x', function(d, i) {return (w/dataValues.length * i);})
  .attr('y', function(d) {return ((h-5)-yScale(d));})
  .attr('width', function() {return w/dataValues.length - paddingWidth;})
  .attr('height', function(d) {return yScale(d);})
  .attr('fill', function(d) {return 'rgb( 0, ' + (Math.round(d)*10) + ', 0)'});

var textLabels = svg.selectAll('text')
  .data(dataValues)
  .enter()
  .append('text')
  .text(function (d) {return(Math.round(d));})
  .attr('x', function(d, i) {return i * (w / dataValues.length) + (w / dataValues.length - 3) / 2;})
  .attr('y', function(d) { return (h-yScale(d)) + 15;})
  .attr('text-anchor', 'middle')
  .attr('font-family', 'sans-serif')
  .attr('font-size', '11px')
  .attr('fill', 'white');

  */
