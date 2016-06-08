/**
 * Created by jinz2 on 6/5/16.
 */
// var findAllGuides = function (db, data ,restCallback) {
//     var guideArr = [];
//     var cursor = db.collection('HeroGuide').find();
//     cursor.each(function (err, doc) {
//         if (doc != null) {
//             guideArr.push(doc);
//         } else {
//             restCallback(guideArr);
//         }
//     });
// };

var findAllGuides = function (db, data ,restCallback) {
    var guideArr = [];
    var cursor = db.collection('HeroGuide').aggregate([
        {
            $lookup:
            {
                from: "User",
                localField: "userId",
                foreignField: "userId",
                as: "user"
            }
        }
    ]);
    cursor.each(function (err, doc) {
        if (doc != null) {
            guideArr.push(doc);
        } else {
            restCallback(guideArr);
        }
    });
};

var insertGuide = function(db, data, restCallback){
    db.collection('HeroGuide').insertOne(data, function(err, result){
        if(err){
            restCallback(false);
            return;
        }
        restCallback(true);
    });
};

var GuideDao = {
    guide_findAll : findAllGuides,
    insert_guide: insertGuide
}

module.exports = GuideDao;