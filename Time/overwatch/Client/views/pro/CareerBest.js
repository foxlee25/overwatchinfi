'use stict'

const React = require('react');
const _ = require('underscore');

const careerBest = React.createClass({
    getInitialState: function(){
        return {};
    },
    propTypes: {
        data: React.PropTypes.object
    },
    render: function(){
        debugger;
        return (
            <div className="recordTable">
                {_.map(this.props.data.name, (item, index) => {
                    return (
                        <div className="recordList">
                            <div className="recordItem">
                                   <h5>{item}</h5>
                            </div>
                            <div className="recordItem">
                                <h5>{this.props.data.value[index]}</h5>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
});

module.exports = careerBest;