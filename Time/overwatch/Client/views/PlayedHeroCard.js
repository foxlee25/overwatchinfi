var React = require("React");

var PlayedHeroCard = React.createClass({
    getInitialState: function(){
        return {};
    },
    propTypes: {
        hero: React.PropTypes.object
    },
    render: function(){
        return (
            <div className="playedHeroCard">
                <img src={this.props.hero.image} />
                <div className="playedHeroCardTip">
                    <p>Name: {this.props.hero.name}</p>
                    <p>Play time: {this.props.hero.playtime}</p>
                </div>
            </div>
        );
    }
});

module.exports = PlayedHeroCard;