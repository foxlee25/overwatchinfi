var findAllUser = function (db, restCallback) {
    userArr = [];
    var cursor = db.collection('Users').find();
    cursor.each(function (err, doc) {
        if (doc != null) {
            userArr.push(doc);
            console.dir(userArr[0]);
        } else {
            restCallback(userArr);
        }
    });
};

var UserDao = {
    user_findAll: findAllUser
}

module.exports = UserDao;