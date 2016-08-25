'use strict'

const express = require('express');
const router = express.Router();
const apicache = require('apicache').options({ debug: true }).middleware;
const blizzardSource = require('../util/BlizzardSource');
var daoController = require('../DaoController.js');

router.all('*', function (req, res ,next) {
	daoController.getDao('AnalysisDao', 'page_click', "proPage");
	next();
});

router.get('/battle/basicinfo/:platform/:region/:battleTag',apicache('1 day'), (req, res) => {
	req.apicacheGroup = req.params.platform+req.params.region+req.params.battleTag;
	
	var promise = new Promise((resolve, reject) => {
		blizzardSource.basicInfo(resolve, reject, req.params.region, req.params.platform, req.params.battleTag);
	});

	promise.then( (val) => {
		if(val === {}){
			res.status(400).send();
		}else{
			res.send(val);
		}
	});
});

router.get('/battle/featurestats/:platform/:region/:battleTag/:type', apicache('1 day'), (req, res) => {
	req.apicacheGroup = req.params.platform+req.params.region+req.params.battleTag+req.type;

	var promise = new Promise((resolve, reject) => {
		blizzardSource.featureStats(resolve, reject, req.params.region, req.params.platform, req.params.battleTag, req.params.type);
	});

	promise.then( (val) => {
		if(val === {}){
			res.status(400).send();
		}else{
			res.send(val);
		}
	});
});

router.get('/battle/heros/:platform/:region/:battleTag/:type', apicache('1 day'), (req, res) => {
	req.apicacheGroup = req.params.platform+req.params.region+req.params.battleTag+req.type;

	var promise = new Promise((resolve, reject) => {
		blizzardSource.heros(resolve, reject, req.params.region, req.params.platform, req.params.battleTag, req.params.type);
	});

	promise.then( (val) => {
		if(val === {}){
			res.status(400).send();
		}else{
			res.send(val);
		}
	});
});

router.get('/battle/careerBest/:platform/:region/:battleTag/:type', apicache('1 day'), (req, res) => {
	req.apicacheGroup = req.params.platform+req.params.region+req.params.battleTag+req.type;

	var promise = new Promise((resolve, reject) => {
		blizzardSource.careerBest(resolve, reject, req.params.region, req.params.platform, req.params.battleTag, req.params.type);
	});

	promise.then( (val) => {
		if(val === {}){
			res.status(400).send();
		}else{
			res.send(val);
		}
	});
});

router.get('/battle/achievements/:platform/:region/:battleTag', apicache('1 day'), (req, res) => {
	req.apicacheGroup = req.params.platform+req.params.region+req.params.battleTag+req.type;

	var promise = new Promise((resolve, reject) => {
		blizzardSource.achievements(resolve, reject, req.params.region, req.params.platform, req.params.battleTag);
	});

	promise.then( (val) => {
		if(val === {}){
			res.status(400).send();
		}else{
			res.send(val);
		}
	});
});

module.exports = router;