var video_findAll = function (db, restCallback) {
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

var VideoDao = {
    video_findAll: video_findAll
}

module.exports = VideoDao;