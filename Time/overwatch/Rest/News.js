var express = require('express');
var props = require('../util/properties.js');
var request = require('request');
var router = express.Router();
var cacheManager = require('cache-manager');
var memCache = cacheManager.caching({store: 'memory', max: 1000000000, ttl: 3600});

//Router to get news
router.get('/allDingDangNews', function(req, res) {
	var cacheKey = req.headers.pagination+req.headers.language;

	res.header('Content-type', 'application/json');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Charset', 'utf8');

	memCache.wrap(cacheKey, function(callback){
		getDingDangNews(req, callback);
	},function(err, data){
		res.send(data);
	});

});

var getDingDangNews = function(req, callback) {
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

module.exports = router;