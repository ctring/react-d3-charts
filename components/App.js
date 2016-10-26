var MultiTimeSeriesChart = require('./MultiTimeSeriesChart');
var TimeSeriesDifferenceChart = require('./TimeSeriesDifferenceChart');
var RadarChart = require('./RadarChart');
var React = require('react');

var sampleData = [{
  series: [{ values: [[0, 0.1], [1, 0.15], [2, 0.1], [3, 0.16], [4, 0.11], [5, 0.2], [6, 0.2], [7, 0.21], [8, 0.22], [9, 0.2], [10, 0.16], [11, 0.14], [12, 0.11], [13, 0.1], [14, 0.09], [15, 0.07], [16, 0.09], [17, 0.06], [18, 0.04]],
             color: 'red'
           },
           { values:[[0, 0.03], [1, 0.07], [2, 0.08], [3, 0.09], [4, 0.1], [5, 0.11], [6, 0.1], [7, 0.1], [8, 0.07], [9, 0.05], [10, 0.04], [11, 0.03], [12, 0.02], [13, 0.01], [14, 0.0]],
             color: 'blue'
           }],
  domains: {x: [0, 20], y: [0, 0.3]},
  maxDomainY: 1,
  warpingPath: [[18, 14], [17, 13], [16, 12], [15, 11], [14, 10], [13, 9], [12, 8], [11, 7], [10, 6], [9, 5], [8, 4], [7, 3], [6, 2], [5, 1], [4, 1], [3, 1], [2, 1], [1, 1], [0, 0]]
},
{
  series: [{ values: [[0, 0.1], [1, 0.15], [2, 0.1], [3, 0.16], [4, 0.11], [5, 0.2], [6, 0.2], [7, 0.21], [8, 0.22], [9, 0.2], [10, 0.16], [11, 0.14], [12, 0.11], [13, 0.1], [14, 0.09], [15, 0.07], [16, 0.09], [17, 0.06], [18, 0.04]],
             color: 'red'
           },
           { values:[[0, 0.08], [1, 0.12], [2, 0.13], [3, 0.14], [4, 0.15], [5, 0.16], [6, 0.15], [7, 0.15], [8, 0.12], [9, 0.1], [10, 0.09], [11, 0.08], [12, 0.07], [13, 0.06], [14, 0.05]],
             color: 'blue'
           }],
  domains: {x: [0, 20], y: [0, 0.3]},
  maxDomainY: 1,
  warpingPath: [[18, 14], [17, 13], [16, 12], [15, 11], [14, 10], [13, 9], [12, 8], [11, 7], [10, 6], [9, 5], [8, 4], [7, 3], [6, 2], [5, 1], [4, 1], [3, 1], [2, 1], [1, 1], [0, 0]]
},
{
  series: [{ values: [[0, 0.1], [1, 0.15], [2, 0.1], [3, 0.16], [4, 0.11], [5, 0.2], [6, 0.2], [7, 0.21], [8, 0.22], [9, 0.2], [10, 0.16], [11, 0.14], [12, 0.11], [13, 0.1], [14, 0.09], [15, 0.07], [16, 0.09], [17, 0.06], [18, 0.04]],
             color: 'red'
           },
           { values:[[0, 0.11], [1, 0.15], [2, 0.16], [3, 0.17], [4, 0.18], [5, 0.19], [6, 0.18], [7, 0.18], [8, 0.15], [9, 0.13], [10, 0.12], [11, 0.11], [12, 0.1], [13, 0.09], [14, 0.08]],
             color: 'blue'
           }],
  domains: {x: [0, 20], y: [0, 0.3]},
  maxDomainY: 1,
  warpingPath: [[18, 14], [17, 13], [16, 12], [15, 11], [14, 10], [13, 9], [12, 8], [11, 7], [10, 6], [9, 5], [8, 4], [7, 3], [6, 2], [5, 1], [4, 1], [3, 1], [2, 1], [1, 1], [0, 0]]
}
,
{
  series: [{ values: [[0, 100], [1, 150], [2, 100], [3, 160], [4, 110], [5, 200], [6, 200], [7, 210], [8, 220], [9, 200], [10, 160], [11, 140]] },
           { values: [[0, 30], [1, 60], [2, 30], [3, 90], [4, 30], [5, 70], [6, 80], [7, 90], [8, 100], [9, 110], [10, 100], [11, 100], [12, 70], [13, 50], [14, 40], [15, 30], [16, 20], [17, 10], [18, 0]]}],
  domains: {x: [0, 20], y: [0, 500]},
  maxDomainY: 500,
  warpingPath: [[11, 18], [10, 17], [9, 16], [8, 15], [7, 14], [6, 13], [5, 12], [4, 11], [3, 10], [2, 9], [1, 8], [1, 7], [1, 6], [1, 5], [1, 4], [1, 3], [1, 2], [1, 1], [0, 0]]
},
{
  series: [{ values: [[0, 1], [1, 2] ,[2, 3], [3, 4]], color: 'red'}],
  domains: {x: [0, 5], y: [0, 6]},
  maxDomainY: 10
}];

var App = React.createClass({
  getInitialState: function() {
    return {
      data: sampleData[0],
      current: 0,
      show: true
    };
  },

  render: function() {
    var multiTimeSeriesChart = this.state.show ? <MultiTimeSeriesChart
                                                  width={500}
                                                  height={250}
                                                  margins={{left: 30, right: 20, top: 10, bottom: 20}}
                                                  data={this.state.data}
                                                /> : null;
    var timeSeriesDifferenceChart = this.state.show ? <TimeSeriesDifferenceChart
                                                        width={100}
                                                        height={250}
                                                        margins={{left: 30, right: 20, top: 10, bottom: 20}}
                                                        strokeWidth={2}
                                                        color={'blue'}
                                                        data={this.state.data}
                                                      /> : null;
    var radarChart = this.state.show && <RadarChart
                                          width={500}
                                          height={300}
                                          data={this.state.data}
                                          margins={{left: 30, right: 20, top: 30, bottom: 30}}
                                        />

    return (
      <div className="App">
        {multiTimeSeriesChart}
        {timeSeriesDifferenceChart}
        {radarChart}
        <button onClick={this._updateChart}>Update</button>
        <button onClick={this._removeChart}>Remove</button>
        <button onClick={this._showChart}>Show</button>
      </div>
    );
  },

  _updateChart: function() {
    var current = (this.state.current + 1) % sampleData.length;
    this.setState({data: sampleData[current], 
                   current: current});
  },

  _removeChart: function() {
    this.setState({show: false});
  },

  _showChart: function() {
    this.setState({show: true});
  }

});

module.exports = App;