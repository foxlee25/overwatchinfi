var React = require('react');
var AppStore = require('../flux/Store');

var Player = React.createClass({
	getInitialState: function() {
		return {videoInfo: AppStore.getVideoData()};
	},
	componentWillMount: function(){

	},
	componentDidMount: function(){
	},
	render: function() {
		if(this.state.videoInfo.url){
			if(this.state.videoInfo.genre === 'youtube'){
				return (
					<div className="container">
						<div className="wrapper">
							<div className="y-iframe">
								<iframe className="mediaPlayer" src={this.state.videoInfo.url}>
								</iframe>
							</div>
						</div>	
					</div>
				);
			}else if(this.state.videoInfo.genre === 'gyfcat'){
					<div className="container">
						<div className="wrapper">
							<div className="y-iframe">
								<video control className="mediaPlayer">
									<source src={this.state.videoInfo.url} type="video/mp4" />
								</video>
							</div>
						</div>	
					</div>
			}	
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
