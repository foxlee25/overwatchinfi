var express = require('express');
var daoController = require('../DaoController.js');
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
		daoController.getDingDangNews(req, callback);
	},function(err, data){
		res.send(data);
	});

});

module.exports = router;