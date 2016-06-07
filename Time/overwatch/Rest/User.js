var express = require('express');
var daoController = require('../DaoController.js');
var bcrypt = require('bcryptjs');
var router = express.Router();

/**path is /user/getAllUsers**/
router.post('/getAllUsers', function (req, res) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    daoController.getDao('UserDao', 'user_findAll', {},function (userArr) {
        res.send(userArr[0]);
    });
});

/**path is /user/signup **/
router.post('/signup', function (req, res) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    var signup = req.body.data;
    if(signup && signup.email && signup.userId){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(signup.password, salt);
        signup.password=hash;
        daoController.getDao('UserDao', 'user_signup', signup , function(data){
            res.send(data);
        });
    }else{
        res.send({status: false});
    }

});


/**path is /user/login **/
router.post('/login', function (req, res) {
    res.header('Content-type', 'application/json');
    res.header('Charset', 'utf8');
    var login = req.body.data;
    if(login && login.userId){
        daoController.getDao('UserDao', 'user_login', login , function(user){
            if(user){
                var realPwd =user.password;
                var currentPwd = login.password;
                var flag = bcrypt.compareSync(currentPwd, realPwd);
                if(flag){
                    console.log('Login success !!! ');
                    user.status = true;
                }else{
                    console.log('Login fail !!! ');
                    user.status = false;
                }
                delete user.password;
                res.send(user);
            }else{
                console.log('Login fail !!! ');
                res.send({status: false});
            }

        });
    }else{
        console.log('Login fail !!! ');
        res.send({status: false});
    }

});

module.exports = router;