var React = require('react');
var $ = require('jquery');
var AjaxService = require('../service/AjaxService');
var AppAction = require('../flux/Actions');
var clickLikeVideoList = [];
var clickDislikeVideoList = [];
var Gfycat = React.createClass({
    getInitialState: function(){
        var key = this.props.video.videoId;
        var stateVar = {};
        stateVar[key] = false;
        return stateVar;
    },
    componentWillMount: function(){
        this.state.likeTime = this.props.video.likeTime;
        this.state.dislikeTime = this.props.video.dislikeTime;
    },
    componentDidMount: function() {
        var key = this.props.video.videoId;
        $('#'+this.props.video.videoId).hover(function(){
            this.state[key] = true;
            this.forceUpdate();
            $('#'+this.props.video.videoId).find('video')[0].play();
        }.bind(this),function(){
            this.state[key] = false;
            this.forceUpdate();
        }.bind(this));
        $('.videoCard').children('iframe').attr('allowfullscreen','allowfullscreen');
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
    setVideoData: function(){
        var videoData = {
            url: "https://thumbs.gfycat.com/"+this.props.video.videoId+"-360.mp4",
            genre: 'gyfcat'
        };
        AppAction.videoData(videoData);
    },
    render: function(){
        return (
            <div className="col-md-6 col-sm-6 col-xs-12">
                <div id={this.props.video.videoId} className="videoCard" onClick={this.setVideoData.bind(this)}>
                    {this.state[this.props.video.videoId]?<video preload="auto" controls autoplay loop muted className="videoCardImg" >
                        <source src={"https://thumbs.gfycat.com/"+this.props.video.videoId+"-360.mp4"} type="video/mp4" />
                    </video>:<img className="videoCardImg" src={"https://thumbs.gfycat.com/"+this.props.video.videoId+"-thumb360.jpg"} />}
                    <span>
                        <a onClick={this.likeVideo} className="btn btn-video glyphicon glyphicon-thumbs-up">
                        </a>
                    </span>
                    <span className="video-clickTime">{this.state.likeTime}</span>
                    <span>
                        <a onClick={this.dislikeVideo} className="btn btn-video glyphicon glyphicon-thumbs-down">
                        </a>
                    </span>
                    <span className="video-clickTime" >{this.state.dislikeTime}</span>
                </div>
            </div>
        );
    }
});

module.exports = Gfycat;
