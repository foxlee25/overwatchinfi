var getProData = function (db, data,restCallback) {
   var proData = {};
   if(db == null){
        restCallback(null);
        return;
   }
    var cursor = db.collection(data.data.id.toString()).find();
    cursor.toArray(function (err, doc) {
        restCallback(doc, db);
    });
};

var ProDao = {
    pro_getData: getProData
}

module.exports = ProDao;