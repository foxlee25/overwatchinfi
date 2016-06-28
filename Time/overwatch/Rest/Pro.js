'use strict'
var express = require('express');
var daoController = require('../DaoController.js');
var router = express.Router();
var blizzardScrapper = require('../util/BlizzardScrapper');

router.post('/all', function(req, res) {
	res.header('Content-type', 'application/json');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Charset', 'utf8');

	daoController.getDao('ProDao', 'pro_getData', req.body, function (doc, db) {
		db.close();
		if(doc.length > 0){
			res.send({info: doc[0]});
		}else{
			res.send({info: null});
		}
	});
});

router.get('/main/:platform/:region/:battleTag', function(req, res){
	res.header('Content-type', 'application/json');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Charset', 'utf8');

	let promise = new Promise(function(resolve, reject){
		blizzardScrapper.getBattleTagMainData(resolve, reject, req.params.region, req.params.platform, req.params.battleTag);
	});

	promise.then(function(val){
		if(val == {}){
			res.status(400).send();
		}else {
			res.send(val);
		}
	}).catch(function(val){
		res.status(400).send();
	});
});

module.exports = router;