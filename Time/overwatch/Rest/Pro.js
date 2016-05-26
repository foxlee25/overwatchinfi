var express = require('express');
var daoController = require('../DaoController.js');
var router = express.Router();

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

module.exports = router;