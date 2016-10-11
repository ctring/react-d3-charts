var MultiTimeSeriesChart = require('./MultiTimeSeriesChart');
var React = require('react');

var sampleData = [{
  series: [{ data: [0.10, 0.15, 0.10, 0.16, 0.11, 0.20, 0.20, 0.21, 0.22, 0.20, 0.16, 0.14, 0.11, 0.10, 0.09, 0.07, 0.09, 0.06, 0.04],
             color: 'red'
           },
           { data:[0.03, 0.07, 0.08, 0.09, 0.10, 0.11, 0.10, 0.10, 0.07, 0.05, 0.04, 0.03, 0.02, 0.01, 0.0],
             color: 'blue'
           }],

  warpingPath: [[18, 14], [17, 13], [16, 12], [15, 11], [14, 10], [13, 9], [12, 8], [11, 7], [10, 6], [9, 5], [8, 4], [7, 3], [6, 2], [5, 1], [4, 1], [3, 1], [2, 1], [1, 1], [0, 0]]
},
{
  series: [{ data: [100, 150, 100, 160, 110, 200, 200, 210, 220, 200, 160, 140] },
           { data: [30, 60, 30, 90, 30, 70, 80, 90, 100, 110, 100, 100, 70, 50, 40, 30, 20, 10, 0]}],

  warpingPath: [[11, 18], [10, 17], [9, 16], [8, 15], [7, 14], [6, 13], [5, 12], [4, 11], [3, 10], [2, 9], [1, 8], [1, 7], [1, 6], [1, 5], [1, 4], [1, 3], [1, 2], [1, 1], [0, 0]]
},
{
  series: [{ data: [1, 2 ,3, 4], color: 'red'}]
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
    var chart = this.state.show ? <MultiTimeSeriesChart
                                    width={500}
                                    height={250}
                                    margin={{left: 30, right: 20, top: 10, bottom: 20}}
                                    data={this.state.data}
                                  /> : null;
    return (
      <div className="App">
        {chart}
        <button onClick={this._updateChart}>Update</button>
        <button onClick={this._removeChart}>Remove</button>
        <button onClick={this._showChart}>Show</button>
      </div>
    );
  },

  _updateChart: function() {
    var current = this.state.current
    this.setState({data: sampleData[1 - current], 
                   current: 1 - current});
  },

  _removeChart: function() {
    this.setState({show: false});
  },

  _showChart: function() {
    this.setState({show: true});
  }

});

module.exports = App;