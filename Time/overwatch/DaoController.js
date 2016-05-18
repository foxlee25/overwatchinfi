/**
 * @author Jin, Zheyang
 */
var fs = require('fs')
var request = require('request');
var props = require('./util/properties.js');
    // fs.readFile()
    //request(url,function(){callback})

/**** keep track all the dao go through DB**/
var DBController = require('./DBController.js');
var DaoManager = {};

/***twitter stuff**/
var Twit = require('twit');
// !!! add all the dao file here
DaoManager.UserDao = require('./Dao/UserDao.js');
DaoManager.VideoDao = require('./Dao/VideoDao.js');
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

daoController.getHeros = function (restCallback) {
    fs.readFile('./overwatch/Json/heros.json', 'utf8', function (err, data) {
        if (err) {
            console.error(err);
            restCallback([]);
            return;
        }

        restCallback(data);
    });
};

daoController.getDingDangNews = function(req, callback) {
    var options = {
        url: props.dingDangNews,
        headers: {
            pagination: req.headers.pagination,
            language: req.headers.language
        }
    };

    var promise = new Promise(function(resolve, reject){
        request(options, function(err, response, body){
            if(err){
                reject();
                return;
            }

            resolve(response.body);
        });
    });

    promise.then(function(data){
        callback(null, JSON.parse(data));
    }).catch(function(data){
        callback(true, [])
    });
};

daoController.getTwits = function(req, callback) {
    var T = new Twit({
      consumer_key:         props.twitter.apiKey,
      consumer_secret:      props.twitter.apiSecret,
      access_token:         props.twitter.accessToken,
      access_token_secret:  props.twitter.accessTokenSecret,
      timeout_ms:           60*1000, 
    });

    var promise = new Promise(function(resolve, reject){
        T.get('search/tweets', { q: '%40'+req.headers.q, count: req.headers.count }, function(err, data, response) {
          if(err){
            reject([]);
            return;
          }

          resolve(data.statuses);
        });        
    });

    promise.then(function(data){
        callback(null, data);
    }).catch(function(data){
        callback(true, [])
    });
};


module.exports = daoController;