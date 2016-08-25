/**
 * Created by jinz2 on 8/23/16.
 */

var pageClick = function(db, data){

        db.collection('Analysis').find({analysisId: "pageclick"}).limit(1).nextObject(function (err, analysis) {
            var currentClickTime = 0;
            if(analysis[data]){
                currentClickTime  = analysis[data];
            }

            var obj = {};
            obj[data] = currentClickTime + 1;

             db.collection('Analysis').update({analysisId: "pageclick"},{$set : obj});

         });
}


var AnalysisDao = {
    page_click : pageClick
}

module.exports = AnalysisDao;