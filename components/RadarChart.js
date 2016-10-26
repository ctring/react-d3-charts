var D3RadarChart = require('./D3RadarChart');
var React = require('react');
var ReactDOM = require('react-dom');

var RadarChart = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    margins: React.PropTypes.object,
    data: React.PropTypes.object
  },

  componentDidMount: function() {
    var el = ReactDOM.findDOMNode(this);
    this.d3RadarChart = new D3RadarChart();
    this.d3RadarChart.create(el, {
      width: this.props.width,
      height: this.props.height,
      margins: this.props.margins
    }, this.props.data);
  },

  componentDidUpdate: function() {
    var el = ReactDOM.findDOMNode(this);
    this.d3RadarChart.update(el, this.props.data);
  },

  componentWillUnmount: function() {
    var el = ReactDOM.findDOMNode(this);
    this.d3RadarChart.destroy(el);
  },

  render: function() {
    return (
      <div className="RadarChart"></div>
    )
  }
});

module.exports = RadarChart;