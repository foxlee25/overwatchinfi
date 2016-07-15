//using paging get video data
var findAllVideo = function (db, data ,restCallback) {
   var videoArr = [];
    var cursor = db.collection('Video').find({source : data.source}).sort({'_id':-1}).skip(data.videoNum*(data.pageIndex-1)).limit(data.videoNum);
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
       
        var existVideo= db.collection('Video').find({videoId: video.videoId}).count(true);
        //if video do not exist then insert
          if(Object.keys(existVideo).length === 0){
              console.log(JSON.stringify(video));
             db.collection('Video').insert(video);
          }
       
    }
  
};

var videoClick = function(db, video){
     db.collection('Video').find({videoId: video.videoId}).limit(1).nextObject(function (err, realTimeVideo) {
         if(video.type === 'like'){
             db.collection('Video').update({videoId: video.videoId},{$set : {likeTime :realTimeVideo.likeTime+ 1} });

         }else if(video.type === 'dislike'){
            db.collection('Video').update({videoId: video.videoId},{$set : {dislikeTime :realTimeVideo.dislikeTime+ 1} });

         }
    });


}

var videoAddYoutube = function(db, video){
    db.collection('Video').insert(video);

}


var videoRemove = function(db, video){
    db.collection('Video').remove({videoId: video.videoId});;
    
}

var VideoDao = {
    video_click : videoClick,
    video_findAll: findAllVideo,
    video_remove: videoRemove,
    video_addYoutube: videoAddYoutube,
    video_addAllFromPlaylist : addAllVideoFromPlaylist
}

module.exports = VideoDao;