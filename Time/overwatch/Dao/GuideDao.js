/**
 * Created by jinz2 on 6/5/16.
 */

var findAllGuides = function (db, data ,restCallback) {
    var guideArr = [];
    if(data.sortType==='newest'){
       // var cursor = db.collection('HeroGuide').find().sort({createTime:-1}).skip(data.guideNum*(data.pageIndex-1)).limit(data.guideNum);
        var cursor = db.collection('HeroGuide').aggregate([
            {
                $lookup:
                {
                    from: "GuideComment",
                    localField: "createTime",
                    foreignField: "sectionId",
                    as: "guideComment"
                }
            }
        ]).sort({createTime:-1}).skip(data.guideNum*(data.pageIndex-1)).limit(data.guideNum);
    }else if(data.sortType==='mostagree'){
        var cursor = db.collection('HeroGuide').aggregate([
            {
                $lookup:
                {
                    from: "GuideComment",
                    localField: "createTime",
                    foreignField: "sectionId",
                    as: "guideComment"
                }
            }
        ]).sort({likeTime: -1}).skip(data.guideNum*(data.pageIndex-1)).limit(data.guideNum);
    }else if(data.sortType==='oldest'){
        var cursor = db.collection('HeroGuide').aggregate([
            {
                $lookup:
                {
                    from: "GuideComment",
                    localField: "createTime",
                    foreignField: "sectionId",
                    as: "guideComment"
                }
            }
        ]).skip(data.guideNum*(data.pageIndex-1)).limit(data.guideNum);
    }
    cursor.each(function (err, doc) {
        if (doc != null) {
            guideArr.push(doc);
        } else {
            restCallback(guideArr);
        }
    });

};

var findTotalGuideNum = function (db, data ,restCallback) {
    var size = 0;
    var cursor = db.collection('HeroGuide').find();
    cursor.each(function (err, doc) {
        if (doc != null) {
            size++;
        } else {
            restCallback({guideNum : size});
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
    guide_click: guideClick,
    guide_findTotalNum: findTotalGuideNum
}

module.exports = GuideDao;