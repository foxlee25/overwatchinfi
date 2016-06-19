/**
 * Created by jinz2 on 6/18/16.
 */

var insertComment = function(db, data){
    db.collection('GuideComment').insert(data);
}


var GuideDao = {
    comment_insert: insertComment
}

module.exports = GuideDao;
