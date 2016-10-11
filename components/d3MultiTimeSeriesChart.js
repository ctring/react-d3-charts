var d3 = require('d3');
var d3MultiTimeSeriesChart = {
  _pointRadius: 3
};

d3MultiTimeSeriesChart.create = function(el, props, state) {

  var svg = d3.select(el).append('svg')
              .attr('width', props.width + props.margin.left + props.margin.right)
              .attr('height', props.height + props.margin.top + props.margin.bottom);

  svg.append('g').attr('class', 'xaxisWrapper');
  svg.append('g').attr('class', 'yaxisWrapper');
  svg.append('g').attr('class', 'linesWrapper');
  svg.append('g').attr('class', 'warpingPathWrapper');
  svg.append('g').attr('class', 'pointsWrapper');
  svg.append('g').attr('class', 'voronoiWrapper')

  this.props = props;
  this.update(el, state);
};

d3MultiTimeSeriesChart.update = function(el, state) {
  var svg = d3.select(el).select('svg'); 
  var series = state.data['series'] || [];

  var domains = { 
    x: [0, Math.max.apply(null, series.map(function(s) {return s.data.length}))],
    y: [0, Math.max.apply(null, series.map(function(s) {return Math.max.apply(null, s.data);}))]
  };

  this._drawAxis(svg, domains);
  this._drawLines(svg, domains, state.data);
  this._drawPoints(svg, domains, state.data);
  this._drawWarpingPath(svg, domains, state.data);
  this._drawVoronoi(svg, domains, state.data);
};

d3MultiTimeSeriesChart.destroy = function(el) {
  d3.select(el).select('svg').remove();
}

d3MultiTimeSeriesChart._scales = function(domains) {

  var x = d3.scaleLinear()
            .domain(domains.x)
            .range([0, this.props.width]);

  var y = d3.scaleLinear()
            .domain(domains.y)
            .range([this.props.height, 0]);

  return {x: x, y: y};
}

d3MultiTimeSeriesChart._drawAxis = function(svg, domains) {
  var scales = this._scales(domains);
  var yaxisWrapper = d3.axisLeft(scales.y);
  var xaxisWrapper = d3.axisBottom(scales.x).ticks(domains.x[1]).tickFormat(d3.format('d'));
  var width = this.props.width;
  var height = this.props.height;
  var margin = this.props.margin;

  svg.select('g.xaxisWrapper')
     .attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
     .call(xaxisWrapper);

  svg.select('g.yaxisWrapper')
     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
     .call(yaxisWrapper);
}

d3MultiTimeSeriesChart._translate = function() {
  return 'translate(' + this.props.margin.left + ',' + this.props.margin.top + ')';
};

d3MultiTimeSeriesChart._extractRawPointCoords = function(series) {
  var attachIndex = function(d, i) { return [i, d]; }
  var flatten = series.map(function(s) { return s.data.map(attachIndex); })
                      .reduce(function(prev, cur) { 
                        return prev.concat(cur); 
                      }, []);
  return flatten;
};

d3MultiTimeSeriesChart._drawLines = function(svg, domains, data) {
  var scales = this._scales(domains);
  var series = data.series;
  var lineFunc = d3.line()
                   .x(function(d, i) { return scales.x(i); })
                   .y(function(d) { return scales.y(d); })
                   .curve(d3.curveLinear);

  var pathGroup = svg.select('g.linesWrapper');

  pathGroup.attr('transform', this._translate());

  var paths = pathGroup.selectAll('path').data(series);
  
  // enter + update
  paths.enter()
       .append('path')
       .merge(paths)
       .attr('d', function(d) { return lineFunc(d.data); })
       .attr('stroke', function(d) { return d.color || 'black'; })
       .attr('stroke-width', 1)
       .attr('fill', 'none')
       
  // exit
  paths.exit().remove();

};

d3MultiTimeSeriesChart._drawPoints = function(svg, domains, data) {
  var scales = this._scales(domains);
  var points = this._extractRawPointCoords(data['series']);

  var pointGroup = svg.select('g.pointsWrapper');
  pointGroup.attr('transform', this._translate());

  var circles = pointGroup.selectAll('circle').data(points);

  // enter + update
  circles.enter()
         .append('circle')
         .merge(circles)
         .attr('cx', function(d) { return scales.x(d[0]); })
         .attr('cy', function(d) { return scales.y(d[1]); })
         .attr('r', this._pointRadius)
         .attr('class', function(d, i) { return 'circle_' + i; });

  // exit
  circles.exit().remove();
};

// d3MultiTimeSeriesChart._handleMouseOverPoint = function(d, i) {
//   d3.select(this).attr('fill', 'orange');
// };

d3MultiTimeSeriesChart._drawWarpingPath = function(svg, domains, data) {
  var scales = this._scales(domains);

  var series = data['series'];
  var warpingPathData = data['warpingPath'] || [];
  var warpingPathGroup = svg.select('g.warpingPathWrapper');

  warpingPathGroup.attr('transform', this._translate());

  var lines = warpingPathGroup.selectAll('line').data(warpingPathData);

  // enter + update
  lines.enter()
       .append('line')
       .merge(lines)
       .attr('x1', function(d) { return scales.x(d[0]); })
       .attr('y1', function(d) { return scales.y(series[0].data[d[0]]); })
       .attr('x2', function(d) { return scales.x(d[1]); })
       .attr('y2', function(d) { return scales.y(series[1].data[d[1]]); })
       .attr('stroke-width', 1)
       .attr('stroke', 'gray')
       .attr('stroke-dasharray', '5, 5');

  // exit
  lines.exit().remove();
}

d3MultiTimeSeriesChart._drawVoronoi = function(svg, domains, data) {
  var scales = this._scales(domains);
  // TODO: handle the case of duplicated points 
  var points = this._extractRawPointCoords(data['series']);
  var width = this.props.width;
  var height = this.props.height;
  var voronoi = d3.voronoi()
                  .x(function(d) { return scales.x(d[0]); })
                  .y(function(d) { return scales.y(d[1]); })
                  .extent([[0, 0], [width, height]]);

  var voronoiGroup = svg.select('g.voronoiWrapper')
  voronoiGroup.attr('transform', this._translate());                    
  
  var polygons = voronoi(points).polygons();

  var voronoiPaths = voronoiGroup.selectAll('path').data(polygons);
  voronoiPaths.enter()
              .append('path')
              .merge(voronoiPaths)
              .attr('d', function(d, i) { 
                return 'M' + d.join('L') + 'Z'; 
              })
              .datum(function(d, i) { return d.point; })
              .style('stroke', 'none')
              .style('fill', 'none')
              .style('pointer-events', 'all')
              .on('mouseover', function(d, i) {
                d3.select('circle.circle_' + i)
                  .attr('fill', 'orange');
              })
              .on('mouseout', function(d, i) {
                d3.select('circle.circle_' + i)
                  .attr('fill', 'black');
              });

  voronoiPaths.exit().remove();
}

module.exports = d3MultiTimeSeriesChart;
