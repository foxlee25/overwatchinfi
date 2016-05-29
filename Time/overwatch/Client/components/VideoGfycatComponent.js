var React = require('react');
var AjaxService = require('../service/AjaxService');
var Underscore= require('underscore');
var VideoCard = require('../views/VideoCard');
var url = '/video/getAllVideos';

var Video = React.createClass({
    getInitialState: function(){
        return {
            videos: []
        };
    },
    getVideos : function(pageIndex){
        AjaxService.post(url,{data :{source :'gfycat',pageIndex: pageIndex}},function(response){
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
            <li><a onClick={this.getVideos.bind(this, 1)}>1</a></li>
        <li><a onClick={this.getVideos.bind(this, 2)}>2</a></li>
        <li><a onClick={this.getVideos.bind(this, 3)}>3</a></li>
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



