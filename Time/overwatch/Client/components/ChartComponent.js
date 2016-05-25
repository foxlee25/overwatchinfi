/**
 * Created by jinz2 on 5/24/16.
 */

var React = require('react');
var ReactDom = require('react-dom');
var d3Chart = require('./d3Chart');

var Chart = React.createClass({
    propTypes: {
        data: React.PropTypes.array,
        domain: React.PropTypes.object
    },

    componentDidMount: function() {
        var el = ReactDom.findDOMNode(this);
        d3Chart.create(el, {
            width: '100%',
            height: '300px'
        }, this.getChartState());
    },

    componentDidUpdate: function() {
        var el = ReactDom.findDOMNode(this);
        d3Chart.update(el, this.getChartState());
    },

    getChartState: function() {
        return {
            data: this.props.data,
            domain: this.props.domain
        };
    },

    componentWillUnmount: function() {
        var el = ReactDom.findDOMNode(this);
        d3Chart.destroy(el);
    },

    render: function() {
        return (
            <div className="Chart"></div>
        );
    }
});

module.exports = Chart;