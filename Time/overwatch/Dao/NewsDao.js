var Underscore= require('underscore');

var readNews = function(db, data, restCallback){
    var newsArr = [];
    var cursor = db.collection('News').find();
    cursor.each(function (err, doc) {
        if (doc != null) {
            newsArr.push(doc);
        } else {
            restCallback(newsArr);
        }
    });
};

var saveNews = function(db, data){
    db.collection('News').find().toArray(function(err, doc){
        if(doc.length === 0){
            console.log("create collection News");
            db.collection('News').insert(data);
        }else{
            db.collection('News').save(data);
        }
    });
}

var NewsDao = {
    read_news: readNews,
    save_news: saveNews
}

module.exports = NewsDao;