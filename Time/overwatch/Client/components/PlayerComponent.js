var React = require('react');
var AppStore = require('../flux/Store');

var Player = React.createClass({
	getInitialState: function() {
		return {videoInfo: AppStore.getVideoData()};
	},
	componentWillMount: function(){

	},
	componentDidMount: function(){
		$('.y-iframe').children('iframe').attr('allowfullscreen','allowfullscreen');
	},
	render: function() {
		if(this.state.videoInfo.url){
			return (
				<div className="container">
					<div className="wrapper">
						<div className="y-iframe">
							<iframe className="ytbPlayer" src={this.state.videoInfo.url}>
							</iframe>
						</div>
					</div>	
				</div>
			);
		}else{
			return (
				<div className="container">
					<b>something is wrong with the video</b>
				</div>
			);
		}
	}
});


module.exports = Player;
