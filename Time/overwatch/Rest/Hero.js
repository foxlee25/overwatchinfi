var express = require('express');
var daoController = require('../DaoController.js');
var router = express.Router();

//Router to get heros
router.get('/allheros', function(req, res) {
	res.header('Content-type', 'application/json');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Charset', 'utf8');
	daoController.getHeros(function(heros){
		res.send(heros);
	});
});

module.exports = router;