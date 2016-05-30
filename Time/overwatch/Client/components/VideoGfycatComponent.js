var React = require('react');
var AjaxService = require('../service/AjaxService');
var Underscore= require('underscore');
var VideoCard = require('../views/GfycatCard');
var url = '/video/getAllVideos';
var totalNum = 57;
var Video = React.createClass({
    getInitialState: function(){
        return {
            videos: []
        };
    },
    componentWillMount: function(){
       this.state.currentPageIndex = 1;
    },
    getVideos : function(control){
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
            currentPageIndex=57;
        }
        this.state.currentPageIndex = currentPageIndex;
        AjaxService.post(url,{data :{source :'gfycat',pageIndex: currentPageIndex, videoNum : 6}},function(response){
            this.state.videos = response.data;
            this.forceUpdate();
        }.bind(this));
    },
    render: function(){
        return (
            <div>
            <div className="container-fluid">
            <div id="videosComponent" className="row">
            {Underscore.map(this.state.videos, function(video){
                return(<VideoCard key={video.url} video={video} />);
            }.bind(this))}
        </div>
        </div>
        <nav className="pagin col-sm-offset-5 col-sm-6">
            <ul className="pagination">
            <li><a onClick={this.getVideos.bind(this,'first')}>First</a></li>
            <li><a onClick={this.getVideos.bind(this,'pre')}>Pre</a></li>
            <li><a href="#">{this.state.currentPageIndex} of 57</a></li>
            <li><a onClick={this.getVideos.bind(this,'next')}>Next</a></li>
            <li><a onClick={this.getVideos.bind(this,'last')}>Last</a></li>
        </ul>
        </nav>
        </div>
        );
    },
    componentDidMount: function(){

        this.getVideos(1);

    }
});

module.exports = Video;


