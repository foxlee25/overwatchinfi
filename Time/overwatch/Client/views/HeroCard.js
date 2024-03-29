var React = require('react');
var AjaxService = require('../service/AjaxService');
var AppAction = require('../flux/Actions');
import { Router, Route, Link } from 'react-router'
var clickLikeHeroList = [];
var clickDislikeHeroList = [];

var HeroCard = React.createClass({
	getInitialState: function(){
		return {};
	},
	propTypes: {
		hero: React.PropTypes.object
	},
	componentWillMount: function(){
		if(this.props.hero.likeTime)
		    this.state.likeTime = this.props.hero.likeTime ;
		else
			this.state.likeTime = 0;

		if(this.props.hero.dislikeTime)
		    this.state.dislikeTime = this.props.hero.dislikeTime;
		else
			this.state.dislikeTime = 0;
	},
	likeHero: function(){
		var hero = this.props.hero;
		if(clickLikeHeroList.indexOf(hero.key) > -1)
			return;
		clickLikeHeroList.push(hero.key);
		var url = '/hero/clickHero';

		this.state.likeTime = this.state.likeTime+1;
		this.forceUpdate();
		AjaxService.post(url,{data: {key : hero.key,type : 'like'}});
	},
	dislikeHero: function(){
		var hero = this.props.hero;
		if(clickDislikeHeroList.indexOf(hero.key) > -1)
			return;
		clickDislikeHeroList.push(hero.key);
		var url = '/hero/clickHero';
		this.state.dislikeTime = this.state.dislikeTime+1;
		this.forceUpdate();
		AjaxService.post(url,{data: {key : hero.key,type :'dislike'}});
	},
	setId: function(id){
		window.sessionStorage.setItem('heroId',id);
	},
	render: function(){
		return (
			<div  className="heroCardContainer">
				<div className="heroCard">
					<Link to={'/heroskill'}>
		  			<img onClick={this.setId.bind(this, this.props.hero.heroId)} className="heroCardImg" src={"./img/hero/"+this.props.hero.imgPath} />
					</Link>
			        <p className="card-text cardTitle">{this.props.hero.heroname}</p>
			    </div>

			</div>
		);
	}
});

module.exports = HeroCard;