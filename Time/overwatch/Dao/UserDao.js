var Underscore= require('underscore');

var findAllUser = function (db,data, restCallback) {
    var userArr = [];
    var cursor = db.collection('User').find();
    cursor.each(function (err, doc) {
        if (doc != null) {
            userArr.push(doc);
            console.dir(userArr[0]);
        } else {
            restCallback(userArr);
        }
    });
};

var signup = function (db,user) {
    db.collection('User').find({email: user.email}).nextObject(function (err, existUser) {
        console.log('signup : ' + JSON.stringify(existUser));
        if(Underscore.isEmpty(existUser)){
            console.log('dao sign up');
            db.collection('User').insert(user);
        }
    });
    
};

var login = function (db, data, restCallback) {

    db.collection('User').find({email: data.email}).limit(1).nextObject(function (err, user) {
        console.log('dao login : '+user.email);
        restCallback(user);
    });
};

var UserDao = {
    user_findAll: findAllUser,
    user_signup: signup,
    user_login: login
}

module.exports = UserDao;