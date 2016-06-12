var React = require('react');
var Underscore = require('underscore');
var dateFormat = require('dateformat');

var GuideCard = React.createClass({
	getInitialState: function(){
		return {};
	},
	componentWillMount: function(){
		this.state.likeStyle = {width: '35%'};
		this.state.dislikeStyle = {width: '65%'};
	},
	componentDidMount: function() {

	},
	render: function(){
		return (
			<div className="guideCard col-md-12" >
				<div className="col-md-4">
					<img className="guide-map"  src={"./img/guide/map/"+this.props.guide.map} />
			
				</div>
				<div className="col-md-8">
					<div className="guide-title"><span>Title : {this.props.guide.title}  ({this.props.guide.role})</span></div>
		             <div className="guide-user">{this.props.guide.user[0].userId} at {dateFormat(this.props.guide.createTime,'mmmm dd hh:MM TT')}</div>

					<div className="guideHeroList">{Underscore.map(this.props.guide.heroList, function(hero){
							return(<img className="guideHeroImg"  src={"./img/hero/"+hero} />);
						}.bind(this))}
					</div>
		            <span className="guide-button"><a href="#" className="btn btn-video glyphicon glyphicon-thumbs-up"></a></span>
					<div className="progress guideProgress">

						<div className="progress-bar progress-bar-success" style={this.state.likeStyle} >
							{this.state.likeStyle.width} Agree
						</div>
						<div className="progress-bar progress-bar-danger" style={this.state.dislikeStyle}  >
							{this.state.dislikeStyle.width} Disagree
						</div>
					</div>
					<span className="guide-button"><a href="#" className="btn btn-video glyphicon glyphicon-thumbs-down"></a></span>
				</div>

			</div>
		);
	}
});
//		<p>{this.props.guide.description}</p>
module.exports = GuideCard;