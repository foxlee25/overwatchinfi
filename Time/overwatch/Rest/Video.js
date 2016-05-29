var express = require('express');
var daoController = require('../DaoController.js');
var router = express.Router();

/**path is /video/getAllVideos**/
router.post('/getAllVideos', function (req, res) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    var data = req.body.data;
    daoController.getDao('VideoDao', 'video_findAll', data ,function (videoArr) {
        res.send(videoArr);
    });
});

/**path is /video/clickVideo**/
router.post('/clickVideo', function (req, res) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    var video = req.body.data;
    daoController.getDao('VideoDao', 'video_click', video);
});

/**path is /video/addVideosFromPlaylist**/
router.post('/addVideosFromPlaylist', function (req, res) {
    var playlistVideos = req.body.data;
    daoController.getDao('VideoDao', 'video_addAllFromPlaylist', playlistVideos);
});


module.exports = router;