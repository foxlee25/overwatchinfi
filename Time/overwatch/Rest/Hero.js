var express = require('express');
var daoController = require('../DaoController.js');
var router = express.Router();
var fs = require('fs');
var apicache = require('apicache').middleware;

router.all('*', function (req, res ,next) {
	daoController.getDao('AnalysisDao', 'page_click', "heroPage");
    next();
});

//Router to get heros
/** path is /hero/allheros **/
router.get('/allheros', apicache('1 hour'), function(req, res) {
	res.header('Content-type', 'application/json');
	res.header('Charset', 'utf8');

	fs.readFile('./Json/heros.json', 'utf8', function (err, data) {
		if (err) {
			console.error(err);
			res.send([]);
			return;
		}
		var obj = JSON.parse(data);;
		res.send(obj);
	});
	// daoController.getDao('HeroDao', 'hero_findAll', {},function (heroArr) {
	// 	res.send(heroArr);
	// });
});

/** path is /hero/getHeroDetail **/
router.post('/getHeroDetail', function (req, res) {
	res.header('Content-type', 'application/json');
	res.header('Charset', 'utf8');
	var heroId = req.body.data-1;
	fs.readFile('./Json/HeroJsonTotalNew.json',  function (err, data) {
		if (err) {
			console.error(err);
			res.send([]);
			return;
		}
		var obj = JSON.parse(data);;
		console.log(JSON.stringify(obj[heroId]));
		res.send(obj[heroId]);
	});


});

/** path is /hero/addHeroDetails **/
router.post('/addHeroDetails', function (req, res) {
	var heroDetails = req.body.data;
	daoController.getDao('HeroDao', 'hero_addDetails', heroDetails);
});

/**path is /hero/clickHero **/
router.post('/clickHero', function (req, res) {
	res.header('Content-type', 'application/json');
	res.header('Charset', 'utf8');
	var hero = req.body.data;
	daoController.getDao('HeroDao', 'hero_click', hero);
});

/**path is /hero/heroDetail **/
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