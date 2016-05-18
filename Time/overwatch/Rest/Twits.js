var express = require('express');
var daoController = require('../DaoController.js');
var router = express.Router();
var cacheManager = require('cache-manager');
var memCache = cacheManager.caching({store: 'memory', max: 1000000000, ttl: 3600});

//Router to get heros
router.get('/allTwits', function(req, res) {
	res.header('Content-type', 'application/json');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Charset', 'utf8');

	var cacheKey = req.headers.q + req.headers.count;

	memCache.wrap(cacheKey, function(callback){
		daoController.getTwits(req, callback);
	},function(err, data){
		res.send(data);
	});
});

module.exports = router;