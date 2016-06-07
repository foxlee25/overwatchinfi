var Underscore= require('underscore');

var findAllUser = function (db,data, restCallback) {
    var userArr = [];
    var cursor = db.collection('User').find();
    cursor.each(function (err, doc) {
        if (doc != null) {
            userArr.push(doc);
        } else {
            restCallback(userArr);
        }
    });
};

var signup = function (db,user , restCallback) {
    db.collection('User').find({$or : [{email: user.email},{userId : user.userId } ]}).nextObject(function (err, existUser) {
        if(Underscore.isEmpty(existUser)){
            db.collection('User').insert(user);
            restCallback({status: true});
        }else{
            restCallback({status: false});
        }
    });
    
};

var login = function (db, data, restCallback) {
    db.collection('User').find({$or : [{email: data.userId},{userId : data.userId } ]}).nextObject(function (err, existUser) {
            restCallback(existUser);
    });
};

var UserDao = {
    user_findAll: findAllUser,
    user_signup: signup,
    user_login: login
}

module.exports = UserDao;