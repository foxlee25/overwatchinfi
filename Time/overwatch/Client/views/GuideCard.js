var React = require('react');
var Underscore = require('underscore');
var GuideCard = React.createClass({
	getInitialState: function(){
		return {};
	},
	render: function(){
		return (
			<div className="guideCard">
				<div className="col-md-2">
					<img className="img-responsive"  src={"./img/map/"+this.props.guide.map} />
				</div>
				<div className="col-md-10">
					<p><span>Title : {this.props.guide.title},</span><span> Role : {this.props.guide.role}</span></p>
		             <p><span>User : {this.props.guide.user[0].username},</span><span> Time : {this.props.guide.createTime}</span></p>

					<div className="guideHeroList">{Underscore.map(this.props.guide.heroList, function(hero){
							return(<img className="guideHeroImg"  src={"./img/hero/"+hero} />);
						}.bind(this))}
					</div>
					<p>{this.props.guide.description}</p>
				</div>
			</div>
		);
	}
});

module.exports = GuideCard;