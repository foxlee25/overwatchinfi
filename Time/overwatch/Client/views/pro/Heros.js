'use stict'

const React = require('react');
const _ = require('underscore');

const heros = React.createClass({
    getInitialState: function(){
        return {};
    },
    propTypes: {
        data: React.PropTypes.object
    },
    render: function(){
        return (
            <div className="heroTable">
                {_.map(this.props.data.heroName, (item, index) => {
                    return (

                        <div className="heroList">
                            <div className="heroItem"><img style={{width: "30px"}} src={this.props.data.heroImg[index]} /></div>
                            <div className="heroItem">
                                <h5>{item}</h5>
                            </div>
                            <div className="heroItem">
                                <h5>{this.props.data.description[index]}</h5>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
});

module.exports = heros;