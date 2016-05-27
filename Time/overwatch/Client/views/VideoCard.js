var React = require('react');
var $ = require('jquery');
var AjaxService = require('../service/AjaxService');
var clickLikeVideo = false;
var clickDisLikeVideo = false;
var VideoCard = React.createClass({
	getInitialState: function(){
		return {};
	},
	componentWillMount: function(){
		this.state.likeTime = this.props.video.likeTime;
		this.state.dislikeTime = this.props.video.dislikeTime;
	},
    componentDidMount: function() {
       $('.videoCard').children('iframe').attr('allowfullscreen','allowfullscreen');

    },
	likeVideo: function(){
		if(clickLikeVideo)
			return;
		clickLikeVideo=true;
		var url = '/video/clickVideo';
		var video = this.props.video
		this.state.likeTime = this.state.likeTime+1;
		this.forceUpdate();
		AjaxService.post(url,{data: {videoId : video.videoId,type : 'like'}});
	},
	dislikeVideo: function(){
		if(clickDisLikeVideo)
			return;
		clickDisLikeVideo=true;
		var url = '/video/clickVideo';
		var video = this.props.video;
		this.state.dislikeTime = this.state.dislikeTime+1;
		this.forceUpdate();
		AjaxService.post(url,{data: {videoId : video.videoId ,type : 'dislike'}});
	},
	render: function(){
		return (
			<div className="col-md-4 col-sm-6 col-xs-12">
				<div  className="videoCard">
                    <iframe className="videoCardIframe"
                        src={this.props.video.url}>
                    </iframe>
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