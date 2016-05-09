/**
 * @author Jin, Zheyang
 */
// var fs = require('fs')
// fs.readFile()
//request(url,function(){callback})

/**** keep track all the dao go through DB**/
var DBController = require('./DBController.js');
var DaoManager = {};
// !!! add all the dao file here
DaoManager.UserDao = require('./Dao/UserDao.js');

/**
 *  daoFileName use to separate dao files.
 */
var daoController = {};
daoController.getDao = function (daoFileName, daoMethodName, restCallback) {
    if (daoFileName && daoMethodName) {
        DBController.getConnection(function (DBConnection) {
            if (DaoManager[daoFileName]) {
                if (DaoManager[daoFileName][daoMethodName]) {
                    console.log('DaoFile : ' + daoFileName + ' Method :' + daoMethodName + ' is success !!!');
                    DaoManager[daoFileName][daoMethodName](DBConnection, restCallback);
                } else {
                    console.log('DaoFile : ' + daoFileName + ' Method :' + daoMethodName + ' do not exists!!!');
                }

            } else {
                console.log('DaoFile ' + daoFileName + ' do not exists !!!');
            }

        });


    }

};


module.exports = daoController;