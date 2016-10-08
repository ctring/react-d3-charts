var MultiTimeSeriesChart = require('./MultiTimeSeriesChart');
var React = require('react');

var sampleData = [{
  series: [{ data: [10, 15, 10, 16, 11, 20, 20, 21, 22, 20, 16, 14, 11, 10, 9, 7, 9, 6, 4],
             color: 'red'
           },
           { data:[3, 7, 8, 9, 10, 11, 10, 10, 7, 5, 4, 3, 2, 1, 0],
             color: 'blue'
           }],

  warpingPath: [[18, 14], [17, 13], [16, 12], [15, 11], [14, 10], [13, 9], [12, 8], [11, 7], [10, 6], [9, 5], [8, 4], [7, 3], [6, 2], [5, 1], [4, 1], [3, 1], [2, 1], [1, 1], [0, 0]]
},
{
  series: [{ data: [10, 15, 10, 16, 11, 20, 20, 21, 22, 20, 16, 14] },
           { data: [3, 6, 3, 9, 3, 7, 8, 9, 10, 11, 10, 10, 7, 5, 4, 3, 2, 1, 0]}],

  warpingPath: [[11, 18], [10, 17], [9, 16], [8, 15], [7, 14], [6, 13], [5, 12], [4, 11], [3, 10], [2, 9], [1, 8], [1, 7], [1, 6], [1, 5], [1, 4], [1, 3], [1, 2], [1, 1], [0, 0]]
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
                                    margin={{left: 20, right: 20, top: 10, bottom: 20}}
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