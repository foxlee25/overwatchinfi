var React = require('react');

var TwitCard = React.createClass({
	getInitialState: function(){
		return {};
	},
	render: function(){
		return (
			<div className="twitCard row">
				<div className="col-md-2">
					{this.props.twit.user?<img className="img-responsive" src={this.props.twit.user.profile_image_url}/>:null}}
				</div>
				<div className="col-md-5">
					<p>{this.props.twit.user.name}<a href={"https://twitter.com/"+this.props.twit.user.screen_name}>@{this.props.twit.user.screen_name}</a></p>
					<p>{this.props.twit.text}</p>
					<p id="retweets">retweets: {this.props.twit.retweet_count}</p>
				</div>
			</div>
		);
	}
});

module.exports = TwitCard;