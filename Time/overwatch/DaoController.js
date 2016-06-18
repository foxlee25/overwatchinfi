/**
 * @author Jin, Zheyang
 */
var fs = require('fs')

/**** keep track all the dao go through DB**/
var DBController = require('./DBController.js');
var DaoManager = {};

// !!! add all the dao file here !!!
DaoManager.NewsDao = require('./Dao/NewsDao.js');
DaoManager.UserDao = require('./Dao/UserDao.js');
DaoManager.VideoDao = require('./Dao/VideoDao.js');
DaoManager.HeroDao = require('./Dao/HeroDao.js');
DaoManager.ProDao = require('./Dao/ProDao.js');
DaoManager.GuideDao = require('./Dao/GuideDao.js');
DaoManager.CommentDao = require('./Dao/CommentDao.js');
/**
 *  daoFileName use to separate dao files.
 *  restCallback will be called after daoMethod excute.
 */
var daoController = {};
daoController.getDao = function (daoFileName, daoMethodName, data, restCallback) {
    if (daoFileName && daoMethodName) {
        DBController.getConnection(function (DBConnection) {
            if (DaoManager[daoFileName]) {
                if (DaoManager[daoFileName][daoMethodName]) {
                    console.log('DaoFile : ' + daoFileName + ' Method :' + daoMethodName + ' is success !!!');
                    
                    if( typeof restCallback === 'function'){
                        DaoManager[daoFileName][daoMethodName](DBConnection, data,restCallback);
                
                    }else{
                        DaoManager[daoFileName][daoMethodName](DBConnection, data);
                    }
                    
                } else {
                    console.log('DaoFile : ' + daoFileName + ' Method :' + daoMethodName + ' do not exists!!!');
                }

            } else {
                console.log('DaoFile ' + daoFileName + ' do not exists !!!');
            }

        });
    }
};

/**
 * get data from json file
 */
daoController.getDataFromFile = function(fileName,restCallback){
        fs.readFile('./Json/'+fileName, 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            restCallback([]);
            return;
        }

        restCallback(data);
    });
}



module.exports = daoController;