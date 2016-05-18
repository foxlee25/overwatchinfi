var express = require('express');
var props = require('../util/properties.js');
var router = express.Router();
var cacheManager = require('cache-manager');
var memCache = cacheManager.caching({store: 'memory', max: 1000000000, ttl: 3600});
/***twitter stuff**/
var Twit = require('twit');

//Router to get heros
router.get('/allTwits', function(req, res) {
	res.header('Content-type', 'application/json');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Charset', 'utf8');

	var cacheKey = req.headers.q + req.headers.count;

	memCache.wrap(cacheKey, function(callback){
		getTwits(req, callback);
	},function(err, data){
		res.send(data);
	});
});


var getTwits = function(req, callback) {
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

module.exports = router;