var Underscore= require('underscore');

var findAllHero = function (db, data,restCallback) {
   var heroArr = [];
    var cursor = db.collection('Hero').find();
    cursor.each(function (err, doc) {
        if (doc != null) {
            heroArr.push(doc);
        } else {
            restCallback(heroArr);
        }
    });
};

var addHeroDetails = function (db, heroDetails) {
    db.collection('HeroDetail').find({key: heroDetails.key}).nextObject(function (err, existHero) {
        if(Underscore.isEmpty(existHero)){
            db.collection('HeroDetail').insert(heroDetails);
        }
    });
    


};

var heroClick = function(db, hero){
    db.collection('Hero').find({key: hero.key}).limit(1).nextObject(function (err, realTimeHero) {
        if(hero.type === 'like'){
            if(!realTimeHero.likeTime)
                realTimeHero.likeTime =0;
           // db.collection('Hero').update({key: hero.key},{$set : {likeTime :realTimeHero.likeTime+ 1} });
            db.collection('Hero').update({key: hero.key},{$set : {likeTime : 1} });
        }else if(hero.type === 'dislike'){
            if(!realTimeHero.dislikeTime)
                realTimeHero.dislikeTime =0;
         //   db.collection('Hero').update({key: hero.key},{$set : {dislikeTime :realTimeHero.dislikeTime+ 1} });
            db.collection('Hero').update({key: hero.key},{$set : {dislikeTime : 1} });
        }
    });

}

var getHeroDetail = function(db, id, callback){
    if(typeof id === 'string'){
        var cursor = db.collection('HeroDetail').find({_id: id.replace(/\./g,'')});
        cursor.each(function(err, doc){
            if(doc != null){
                callback(doc);
            }else{
                callback(null);
            }

            //break out of the loop
            return false;
        });
    }else{
        callback(null);
    }
    
};

var HeroDao = {
    hero_click : heroClick,
    hero_findAll: findAllHero,
    hero_addDetails : addHeroDetails,
    hero_detail: getHeroDetail
}

module.exports = HeroDao;