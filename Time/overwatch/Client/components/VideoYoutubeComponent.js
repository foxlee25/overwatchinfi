var React = require('react');
var AjaxService = require('../service/AjaxService');
var Underscore= require('underscore');
var $ = require('jquery');
var VideoCard = require('../views/VideoCard');
var totalNum = 28;
var Video = React.createClass({
	getInitialState: function(){
		window.localStorage.setItem('currentPage', 'videoYoutube');
		return {
			videos: []
		};
	},
	componentWillMount: function(){
		this.state.userId = window.sessionStorage.getItem('userId');
		this.state.currentPageIndex = 1;
	},
    getVideos : function(control){
		var url = '/video/getAllVideos';
		var currentPageIndex = this.state.currentPageIndex;
		if(control==='pre'){
			if (currentPageIndex > 1)
				currentPageIndex--;
		}else if(control==='next') {
			if (currentPageIndex < totalNum)
				currentPageIndex++;
		}else if(control==='first'){
			currentPageIndex=1;
		}else if(control==='last'){
			currentPageIndex=totalNum;
		}
		this.state.currentPageIndex = currentPageIndex;
        AjaxService.post(url,{data :{source :'youtube',pageIndex: currentPageIndex,videoNum : 12}},function(response){
            this.state.videos = response.data;
            this.forceUpdate();
			window.scrollTo(0, 0);
        }.bind(this));
    },
	submitVideo : function(){
		var url = '/video/addYoutubeVideo';
		var youtubeVideoId = $('#adminaddyoutubevideo').find('input[name="youtubevideoinput"]').val();
	
		var videoModel = {};
		videoModel.videoId = youtubeVideoId;
		videoModel.source = 'youtube';
		videoModel.watchTime=0;
		videoModel.likeTime=0;
		videoModel.dislikeTime=0;
		videoModel.url='https://www.youtube.com/embed/'+videoModel.videoId;
		AjaxService.post(url,{data :videoModel});
		setTimeout(function(){ window.location.reload(true); }, 2000);

	},
	render: function(){
		return (
        <div>
		{this.state.userId==='admin'?<div id="adminaddyoutubevideo" className="form-inline">
			<input name="youtubevideoinput" type="text" className="form-control youtubevideoinput"  placeholder="Input Video Id"  required />
		    <button onClick={this.submitVideo.bind(this)}   name="videoSubmit" className="btn btn-primary" >Submit</button></div>:<div></div>}
			<div className="container-fluid">
				<div id="videosComponent" className="row">
					{Underscore.map(this.state.videos, function(video){
						return(<VideoCard key={video.url} video={video} />);
					}.bind(this))}
				</div>
			</div>
				{this.state.videos.length>0?
				<nav className="pagin guide-pagin col-lg-12">
					<ul className="pagination">
					<li><a onClick={this.getVideos.bind(this,'first')}>First</a></li>
				<li><a onClick={this.getVideos.bind(this,'pre')}>Pre</a></li>
				<li><a href="#">{this.state.currentPageIndex} of {totalNum}</a></li>
				<li><a onClick={this.getVideos.bind(this,'next')}>Next</a></li>
				<li><a onClick={this.getVideos.bind(this,'last')}>Last</a></li>
				</ul>
				</nav>:null}
         </div>
		);
	},
	componentDidMount: function(){
   
        this.getVideos(1);

	}
});

module.exports = Video;


