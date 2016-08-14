/**
 * Created by jinz2 on 8/11/16.
 */
var React = require("React");
var AppAction = require('../flux/Actions');
import { Link } from 'react-router'
var HeroNavCard = React.createClass({
    getInitialState: function(){
        return {};
    },
    propTypes: {
        hero: React.PropTypes.object
    },
    setId: function(id){
        window.sessionStorage.setItem('heroId',id);
        window.location.reload(true);
        window.scrollTo(0,0);
    },
    render: function(){
        return (
             <div className="heroNavCard">
                <div className="playedHeroCard ">
                <img src={this.props.hero.imgNav} onClick={this.setId.bind(this, this.props.hero.heroId)} />
                </div>

                <div className="heroNavCard-heroName">
                    {this.props.hero.heroname}
                </div>
        </div>
        );
    }
});

module.exports = HeroNavCard;
