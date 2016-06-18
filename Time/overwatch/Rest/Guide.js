/**
 * Created by jinz2 on 6/5/16.
 */
var express = require('express');
var daoController = require('../DaoController.js');
var fs = require('fs');
var router = express.Router();

/**path is /guide/getGuides **/
router.post('/allGuides', function (req, res) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    var data = req.body.data;
    daoController.getDao('GuideDao', 'guide_findAll', data ,function (guideArr) {
        res.send(guideArr);
    });
});

/**path is /guide/postComment **/
router.post('/postComment', function (req, res) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    var data = req.body.data;
    daoController.getDao('CommentDao', 'comment_insert' ,data);
});

/**path is /guide/getTotalGuideNum **/
router.post('/getTotalGuideNum', function (req, res) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    var data = req.body.data;
    daoController.getDao('GuideDao', 'guide_findTotalNum' ,{},function (data) {
        res.send(data);
    });
});

/**path is /guide/clickGuide**/
router.post('/clickGuide', function (req, res) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    var guide = req.body.data;
    console.log(JSON.stringify(guide));
    daoController.getDao('GuideDao', 'guide_click', guide);
});

/**path is /guide/mapList**/
//for now just read from json file
//convert to db when schema is more mature
router.get('/mapList', function(req, res) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    fs.readFile('./Json/map-list.json', 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            res.send([]);
            return;
        }
        res.send(data);
    });
});

/**path is /guide/buildGuide**/
router.post('/buildGuide', function(req, res){
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    var data = req.body;
    daoController.getDao('GuideDao', 'insert_guide', data, function(result){
        if(result){
            res.status(200).send([]);
        }else{
            res.status(500).send([]);
        }
    });
});



module.exports = router;