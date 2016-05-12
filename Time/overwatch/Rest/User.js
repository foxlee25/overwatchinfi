var express = require('express');
var daoController = require('../DaoController.js');
var router = express.Router();

/**path is /user/getAllUsers**/
router.post('/getAllUsers', function (req, res) {
    console.log('main : get');
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    daoController.getDao('UserDao', 'user_findAll', function (userArr) {
        console.log('User rest getAllUsers' + userArr);
        console.log(userArr[0]);
        res.send(userArr[0]);
    });
});

module.exports = router;