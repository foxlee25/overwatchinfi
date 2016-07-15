var React = require('react');
var $ = require('jquery');
var AjaxService = require('../service/AjaxService');
var clickLikeVideoList = [];
var clickDislikeVideoList = [];
var AppAction = require('../flux/Actions');
import { Link } from 'react-router'
var VideoCard = React.createClass({
	getInitialState: function(){
		return {};
	},
	componentWillMount: function(){
		this.state.userId = window.sessionStorage.getItem('userId');
		this.state.likeTime = this.props.video.likeTime;
		this.state.dislikeTime = this.props.video.dislikeTime;
	},
    componentDidMount: function() {

    },
	propTypes: {
		video: React.PropTypes.object
	},
	likeVideo: function(){
		var video = this.props.video;
		if(clickLikeVideoList.indexOf(video.videoId) > -1)
			return;
		clickLikeVideoList.push(video.videoId);
		var url = '/video/clickVideo';

		this.state.likeTime = this.state.likeTime+1;
		this.forceUpdate();
		AjaxService.post(url,{data: {videoId : video.videoId,type : 'like'}});
	},
	dislikeVideo: function(){
		var video = this.props.video;
		if(clickDislikeVideoList.indexOf(video.videoId) > -1)
			return;
		clickDislikeVideoList.push(video.videoId);
		var url = '/video/clickVideo';
		this.state.dislikeTime = this.state.dislikeTime+1;
		this.forceUpdate();
		AjaxService.post(url,{data: {videoId : video.videoId ,type : 'dislike'}});
	},
	removeVideo: function(videoId){
		var url = '/video/removeVideo';
		AjaxService.post(url,{data: {videoId : videoId}});
		window.location.reload(true);
	},
	setVideoData: function(){
		this.props.video.genre = "youtube";
		AppAction.videoData(this.props.video);
	},
	render: function(){
		return (
			<div className="col-md-4 col-sm-6 col-xs-12">
						<div  className="videoCard">
		{this.state.userId==='admin'?<div onClick={this.removeVideo.bind(this, this.props.video.videoId)} className="glyphicon glyphicon-remove-circle video-remove-icon"></div>:<div></div>}
                           	<Link to={'/player'}>
							<picture onClick={this.setVideoData}>
								<source srcSet={"http://img.youtube.com/vi/"+this.props.video.videoId+"/mqdefault.jpg"} media="(min-width:991px)" />
								<source srcSet={"http://img.youtube.com/vi/"+this.props.video.videoId+"/hqdefault.jpg"} media="(min-width:767px)" />
								<source srcSet={"http://img.youtube.com/vi/"+this.props.video.videoId+"/sddefault.jpg"} />
								<img className="videoCardImg" srcSet />
							</picture>
                            </Link>
				            <span><a onClick={this.likeVideo} className="btn btn-video glyphicon glyphicon-thumbs-up"></a></span>
					         <span className="video-clickTime">{this.state.likeTime}</span>
					         <span><a onClick={this.dislikeVideo} className="btn btn-video glyphicon glyphicon-thumbs-down"></a></span>
				        	<span className="video-clickTime" >{this.state.dislikeTime}</span>
					    </div>
			</div>
		);
	}
});

module.exports = VideoCard;