var findAllHero = function (db, data,restCallback) {
   var heroArr = [];
    var cursor = db.collection('Hero').find();
    cursor.each(function (err, doc) {
        if (doc != null) {
            heroArr.push(doc);
            console.dir(heroArr[0]);
        } else {
            restCallback(heroArr);
        }
    });
};

var HeroDao = {
    hero_findAll: findAllHero
}

module.exports = HeroDao;