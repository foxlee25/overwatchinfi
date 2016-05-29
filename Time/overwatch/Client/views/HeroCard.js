var React = require('react');
var AjaxService = require('../service/AjaxService');
var clickLikeHeroList = [];
var clickDislikeHeroList = [];

var HeroCard = React.createClass({
	getInitialState: function(){
		return {};
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
	render: function(){
		return (
			<div className="col-md-3 col-sm-6 col-xs-12">
				<div className="heroCard hvr-bob">
		  			<img className="heroCardImg img-responsive" src={"./img/hero/"+this.props.hero.imgPath} />
			        <p className="card-text cardTitle">{this.props.hero.heroname}</p>
					<span><a onClick={this.likeHero} className="btn btn-video glyphicon glyphicon-thumbs-up"></a></span>
					<span className="video-clickTime">{this.state.likeTime}</span>
					<span><a onClick={this.dislikeHero} className="btn btn-video glyphicon glyphicon-thumbs-down"></a></span>
					<span className="video-clickTime" >{this.state.dislikeTime}</span>
			    </div>

			</div>
		);
	}
});

module.exports = HeroCard;