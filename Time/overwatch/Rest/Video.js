var express = require('express');
var daoController = require('../DaoController.js');
var router = express.Router();

/**path is /user/getAllUsers**/
router.post('/getAllVideos', function (req, res) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    daoController.getDao('VideoDao', 'video_findAll', function (videoArr) {
        console.log(videoArr[0]);
        res.send(videoArr);
    });
});

module.exports = router;