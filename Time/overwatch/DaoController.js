/**
 * @author Jin, Zheyang
 */
var fs = require('fs')

/**** keep track all the dao go through DB**/
var DBController = require('./DBController.js');
var DaoManager = {};

// !!! add all the dao file here !!!
DaoManager.UserDao = require('./Dao/UserDao.js');
DaoManager.VideoDao = require('./Dao/VideoDao.js');
/**
 *  daoFileName use to separate dao files. 
 *  callback will garante call after daoMethod excute.
 */
var daoController = {};
daoController.getDao = function (daoFileName, daoMethodName, data, restCallback) {
    if (daoFileName && daoMethodName) {
        DBController.getConnection(function (DBConnection) {
            if (DaoManager[daoFileName]) {
                if (DaoManager[daoFileName][daoMethodName]) {
                    console.log('DaoFile : ' + daoFileName + ' Method :' + daoMethodName + ' is success !!!');
                    
                    if(data && typeof restCallback === 'function'){
                        DaoManager[daoFileName][daoMethodName](DBConnection, data,restCallback);
                
                    }else if(data && !(typeof restCallback === 'function')){
                        DaoManager[daoFileName][daoMethodName](DBConnection, data);
        
                    }else if( !data && typeof restCallback === 'function'){
                        DaoManager[daoFileName][daoMethodName](DBConnection, restCallback);
                    
                    }else{
                         DaoManager[daoFileName][daoMethodName](DBConnection);
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
        fs.readFile('./overwatch/Json/'+fileName, 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            restCallback([]);
            return;
        }

        restCallback(data);
    });
}



module.exports = daoController;