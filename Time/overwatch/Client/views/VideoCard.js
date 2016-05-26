var React = require('react');
var $ = require('jquery');
var AjaxService = require('../service/AjaxService');
var clickLikeVideo = false;
var clickDisLikeVideo = false;
var VideoCard = React.createClass({
	getInitialState: function(){
		return {};
	},
    componentDidMount: function() {
       $('.videoCard').children('iframe').attr('allowfullscreen','allowfullscreen');
       
    },
	likeVideo: function(){
		if(clickLikeVideo)
			return;
		clickLikeVideo=true;
		var url = '/video/clickVideo';
		var video = this.props.video;
		AjaxService.post(url,{data: {videoId : video.videoId, likeTime : video.likeTime+1,type : 'like'}});
	},
	dislikeVideo: function(){
		if(clickDisLikeVideo)
			return;
		clickDisLikeVideo=true;
		var url = '/video/clickVideo';
		var video = this.props.video;
		AjaxService.post(url,{data: {videoId : video.videoId,dislikeTime : video.dislikeTime+1 ,type : 'dislike'}});
	},
	render: function(){
		return (
			<div className="col-md-4 col-sm-6 col-xs-12">
				<div  className="videoCard">
                    <iframe className="videoCardIframe"
                        src={this.props.video.url}>
                    </iframe>
		            <span><a onClick={this.likeVideo} className="btn btn-video glyphicon glyphicon-thumbs-up"></a></span>
			         <span><a onClick={this.dislikeVideo} className="btn btn-video glyphicon glyphicon-thumbs-down"></a></span>
			    </div>
			</div>
		);
	}
});

module.exports = VideoCard;