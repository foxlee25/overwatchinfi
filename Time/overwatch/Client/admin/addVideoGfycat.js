/**
 * Created by jinz2 on 5/28/16.
 */
$(function(){
//<iframe src='https://gfycat.com/ifr/FarawayIndelibleHarborporpoise' frameborder='0' scrolling='no' width='640' height='640' allowfullscreen></iframe>
    $('#submitVideo').click(function(){
        var videoArr = [];
        var url = '/video/addVideosFromPlaylist' ;
         $('gfy-small-thumb a').each(function(index){
                 var $this = $(this);
                 var video = {};
                 video.videoId = $this.attr('href').split('/')[4];
                 video.url = 'https://gfycat.com/ifr/' + video.videoId;
                 video.source = 'gfycat';
                 video.watchTime=0;
                 video.likeTime=0;
                 video.dislikeTime=0;
                 videoArr.push(video);
         });
        var serverData = {data : videoArr};
        Ajax.post(url,serverData);

    });


});