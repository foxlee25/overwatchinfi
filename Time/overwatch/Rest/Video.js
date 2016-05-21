var express = require('express');
var daoController = require('../DaoController.js');
var router = express.Router();

/**path is /video/getAllVideos**/
router.post('/getAllVideos', function (req, res) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    daoController.getDao('VideoDao', 'video_findAll', {} ,function (videoArr) {
        console.log(videoArr[0]);
        res.send(videoArr);
    });
});

/**path is /video/addVideosFromPlaylist**/
router.post('/addVideosFromPlaylist', function (req, res) {
    var playlistVideos = req.body.data;
    daoController.getDao('VideoDao', 'video_addAllFromPlaylist', playlistVideos);
});


module.exports = router;