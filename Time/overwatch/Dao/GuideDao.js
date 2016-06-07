/**
 * Created by jinz2 on 6/5/16.
 */

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
            console.log(JSON.stringify(guideArr));
            restCallback(guideArr);
        }
    });
};

var GuideDao = {
    guide_findAll : findAllGuides
}

module.exports = GuideDao;