var React = require('react');
var HttpService = require('../service/HttpService');
var _  = require('underscore');
var TwitCard = require('../views/TwitCard');

var Twit = React.createClass({
	getInitialState: function(){
		return {
			twits: []
		};
	},
	render: function(){
		var i = 0;
		return (
			<div id="twitComponent" className="container">
				{_.map(this.state.twits, function(twit){
					i++;
					return (<TwitCard key={i} twit={twit} />);
				}.bind(this))}
			</div>
		);
	},
	componentDidMount: function(){
		this.getTwits(1);
	},
	getTwits: function(){
		HttpService.getTwits().then(function(response){
			console.log(response);
			this.state.twits = response.data;
			this.forceUpdate();
		}.bind(this)).catch(function(response){
			console.log(response);
		});
	}
});

module.exports = Twit;