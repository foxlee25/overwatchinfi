'use stict'

const React = require('react');
const _ = require('underscore');
require('./pro.css');

const featureStats = React.createClass({
    getInitialState: function(){
        return {};
    },
    propTypes: {
        data: React.PropTypes.object
    },
    render: function(){
        return (
            <div className="featureStats">
                <h4>Feature Stats</h4>
                {_.map(this.props.data.name, (item, i) => {
                    return (
                        <div className="featureStatsList">
                            <div className="featureStatsItem">
                                <h5>{item}</h5>
                            </div>
                            <div className="featureStatsItem">
                                <p>{this.props.data.value[i]}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
});

module.exports = featureStats;