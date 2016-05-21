var findAllVideo = function (db, restCallback) {
    videoArr = [];
    var cursor = db.collection('Video').find();
    cursor.each(function (err, doc) {
        if (doc != null) {
            videoArr.push(doc);
            console.dir(videoArr[0]);
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
          if(Object.keys(existVideo).length === 0){
             console.log('addAllVideoFromPlaylist : '+video);
             db.collection('Video').insert(video);
          }else{
              console.log('video exist : '+JSON.stringify(existVideo));

          }
       
    }
  
};

var VideoDao = {
    video_findAll: findAllVideo,
    video_addAllFromPlaylist : addAllVideoFromPlaylist
}

module.exports = VideoDao;