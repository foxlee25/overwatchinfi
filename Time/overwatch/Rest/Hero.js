var express = require('express');
var daoController = require('../DaoController.js');
var router = express.Router();
var apicache = require('apicache').middleware;

//Router to get heros
/** path is /heros/allheros **/
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

/** path is /heros/addHeroDetails **/
router.post('/addHeroDetails', function (req, res) {
	var heroDetails = req.body.data;
	daoController.getDao('HeroDao', 'hero_addDetails', heroDetails);
});

module.exports = router;