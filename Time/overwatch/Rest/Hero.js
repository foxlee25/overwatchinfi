var express = require('express');
var daoController = require('../DaoController.js');
var router = express.Router();
var apicache = require('apicache').middleware;

//Router to get heros
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
    // daoController.getDataFromFile('heros.json',function(heros){
	// 	res.send(heros);
	// });
});

module.exports = router;