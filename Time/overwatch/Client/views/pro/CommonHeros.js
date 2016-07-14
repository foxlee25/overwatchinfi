'use stict'

const React = require('react');
const _ = require('underscore');
require('./pro.css');

const commonHeros = React.createClass({
    getInitialState: function(){
        return {};
    },
    propTypes: {
        data: React.PropTypes.object
    },
    render: function(){
        return (
            <div className="commonHeros">
                <h4>Common heros(Win rate)</h4>
                {_.map(this.props.data.heroName.slice(0, 3), (item, index) => {
                    return (
                        <div className="commonHerosList">
                            <div className="commonHerosItem">
                                <img style={{width: "30%"}} src={this.props.data.heroImg[index]}/>
                            </div>
                            <div className="commonHerosItem">
                                <p>{item} {this.props.data.description[index]}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
});

module.exports = commonHeros;