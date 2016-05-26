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

var addHeroDetails = function (db, heroDetails) {
    var existHero= db.collection('HeroDetail').find({key: heroDetails.key}).count(true);
    //if video do not exist then insert
    if(Object.keys(existHero).length === 0){
        db.collection('HeroDetail').insert(heroDetails);
    }


};

var HeroDao = {
    hero_findAll: findAllHero,
    hero_addDetails : addHeroDetails
}

module.exports = HeroDao;