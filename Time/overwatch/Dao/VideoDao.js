//using paging get video data
var findAllVideo = function (db, data ,restCallback) {
   var videoArr = [];
    var cursor = db.collection('Video').find().skip(12*(data.pageIndex-1)).limit(12);
    cursor.each(function (err, doc) {
        if (doc != null) {
            videoArr.push(doc);
        } else {
            restCallback(videoArr);
        }
    });
};

var addAllVideoFromPlaylist = function (db, playlistVideos) {
    var i ;
    for(i=0 ; i < playlistVideos.length; i++ ){
        var video = playlistVideos[i];
       
        var existVideo= db.collection('Video').find({videoId: video.VideoId}).count(true);
        //if video do not exist then insert
          if(Object.keys(existVideo).length === 0){
             db.collection('Video').insert(video);
          }
       
    }
  
};

var VideoDao = {
    video_findAll: findAllVideo,
    video_addAllFromPlaylist : addAllVideoFromPlaylist
}

module.exports = VideoDao;