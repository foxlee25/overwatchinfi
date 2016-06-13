/**
 * Created by jinz2 on 6/5/16.
 */

var findAllGuides = function (db, data ,restCallback) {
    var guideArr = [];
    console.log(' guideNum : '+data.guideNum + ' data.pageIndex : '+data.pageIndex);
    var cursor = db.collection('HeroGuide').find().skip(data.guideNum*(data.pageIndex-1)).limit(data.guideNum);
   // var cursor = db.collection('HeroGuide').find();
    cursor.each(function (err, doc) {
        if (doc != null) {
            guideArr.push(doc);
        } else {
            restCallback(guideArr);
        }
    });
};

var guideClick = function(db, guide){
    db.collection('HeroGuide').find({createTime: guide.createTime}).limit(1).nextObject(function (err, realGuide) {
        if(guide.type === 'like'){
            if(!realGuide.likeTime)
                realGuide.likeTime =0;
            db.collection('HeroGuide').update({createTime: guide.createTime},{$set : {likeTime :realGuide.likeTime+ 1} });

        }else if(guide.type === 'dislike'){
            if(!realGuide.dislikeTime)
                realGuide.dislikeTime =0;
            db.collection('HeroGuide').update({createTime: guide.createTime},{$set : {dislikeTime :realGuide.dislikeTime+ 1} });

        }
    });


}

// var findAllGuides = function (db, data ,restCallback) {
//     var guideArr = [];
//     var cursor = db.collection('HeroGuide').aggregate([
//         {
//             $lookup:
//             {
//                 from: "User",
//                 localField: "userId",
//                 foreignField: "userId",
//                 as: "user"
//             }
//         }
//     ]);
//
// };

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
    insert_guide: insertGuide,
    guide_click: guideClick
}

module.exports = GuideDao;