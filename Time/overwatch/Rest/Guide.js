/**
 * Created by jinz2 on 6/5/16.
 */
var express = require('express');
var daoController = require('../DaoController.js');
var router = express.Router();

/**path is /guide/getGuides **/
router.post('/allGuides', function (req, res) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    daoController.getDao('GuideDao', 'guide_findAll', {} ,function (guideArr) {
        console.log(JSON.stringify(guideArr)) ;
        res.send(guideArr);
    });
});



module.exports = router;