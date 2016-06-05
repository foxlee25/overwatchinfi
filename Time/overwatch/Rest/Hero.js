var express = require('express');
var daoController = require('../DaoController.js');
var router = express.Router();
var apicache = require('apicache').middleware;

//Router to get heros
/** path is /hero/allheros **/
router.get('/allheros', apicache('1 hour'), function(req, res) {
	res.header('Content-type', 'application/json');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Charset', 'utf8');
	
	daoController.getDao('HeroDao', 'hero_findAll', {},function (heroArr) {
		console.log('User rest getAllUsers' + heroArr);
		console.log(heroArr[0]);
		res.send(heroArr);
	});
});

/** path is /hero/addHeroDetails **/
router.post('/addHeroDetails', function (req, res) {
	var heroDetails = req.body.data;
	daoController.getDao('HeroDao', 'hero_addDetails', heroDetails);
});

/**path is /video/clickHero **/
router.post('/clickHero', function (req, res) {
	res.header('Content-type', 'application/json');
	res.header('Charset', 'utf8');
	var hero = req.body.data;
	daoController.getDao('HeroDao', 'hero_click', hero);
});

/**path is /video/heroDetail **/
router.get('/heroDetail/:id', function(req, res) {
	res.header('Content-type', 'application/json');
	res.header('Charset', 'utf8');
	var id = req.params.id;
	daoController.getDao('HeroDao', 'hero_detail', id.toLowerCase(), function(detailObj) {
		if(detailObj === null){
			res.send({});
			return;
		}

		res.send(detailObj);

	})
});

module.exports = router;