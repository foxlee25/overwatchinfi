var express = require('express');
var daoController = require('../DaoController.js');
var bcrypt = require('bcryptjs');
var router = express.Router();

/**path is /user/getAllUsers**/
router.post('/getAllUsers', function (req, res) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    daoController.getDao('UserDao', 'user_findAll', {},function (userArr) {
        console.log('User rest getAllUsers' + userArr);
        console.log(userArr[0]);
        res.send(userArr[0]);
    });
});

/**path is /user/signup **/
router.post('/signup', function (req, res) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    var signup = req.body.data;
    console.log('signup : ' + JSON.stringify(signup));
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(signup.password, salt);
    signup.password=hash;
    console.log('signup : '+ hash);
    daoController.getDao('UserDao', 'user_signup', signup);
});


/**path is /user/login **/
router.post('/login', function (req, res) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    var login = req.body.data;
    daoController.getDao('UserDao', 'user_login', login , function(user){
        var realPwd =user.password;
        var currentPwd = login.password;
        var flag = bcrypt.compareSync(currentPwd, realPwd);
        if(flag){
            console.log('Login success !!! ');
        }else{
            console.log('Login fail !!! ');
        }
    });
});

module.exports = router;