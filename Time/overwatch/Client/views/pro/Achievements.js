'use stict'

const React = require('react');
const _ = require('underscore');

const achievements = React.createClass({
    getInitialState: function(){
        return  {};
    },
    propTypes: {
        data: React.PropTypes.object
    },
    render: function(){
        return (
            <div className="achievementTable">
                {_.map(this.props.data, (value, key) => {
                    return (
                        <div className="achievementList">
                            <h4>{key}</h4>
                            <div>
                                {_.map(value.finished.name, (name, index) => {
                                    return (
                                        <div className="achievementCardFinished">
                                            <img src={value.finished.img[index]} />
                                            <p>{name}</p>
                                        </div>
                                    );
                                })}
                                {_.map(value.notFinished.name, (name, index) => {
                                    return (
                                        <div className="achievementCardNotFinished">
                                            <img src={value.finished.img[index]} />
                                            <p>{name}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
});

module.exports = achievements;