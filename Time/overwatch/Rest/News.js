var express = require('express');
var props = require('../util/properties.js');
var request = require('request');
var cronJob = require('cron').CronJob;
var daoController = require('../DaoController');
var router = express.Router();

var job = new cronJob({
    cronTime: '00 00 24 * * *',
    onTick: function() {
        getNews(null, function(err, data){
            if(err){
                return;
            }

            daoController.getDao('NewsDao', 'save_news', data.result.docs);
        });

      },
      start: false,
      timeZone: "America/Los_Angeles"
});

job.start();

//Router to get news
router.get('/allNews', function(req, res) {

	res.header('Content-type', 'application/json');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Charset', 'utf8');

    daoController.getDao('NewsDao', 'read_news', null,function (heroArr) {
        console.log(heroArr.length+"length");
        if(heroArr.length === 0){
            //db is empty
            //make a news request and store the data
            getNews(req, function(err, data){
                if(err){
                    console.error("Can't get news data");
                    res.send([]);
                    return;
                }

                console.info("Success get news data");
                res.send(data.result.docs);
                daoController.getDao('NewsDao', 'save_news', data.result.docs);
            });
        }else{
            res.send(heroArr);
        }
    });

});

var getNews = function(req, callback) {
    var options = {
        url: props.newsSource,
    };

    //make request to watson news
    var promise = new Promise(function(resolve, reject){
        request(options, function(err, response, body){
            if(err){
                reject();
                return;
            }

            resolve(response.body);
        });
    });

    promise.then(function(data){
        callback(null, JSON.parse(data));
    }).catch(function(data){
        callback(true, [])
    });
};

module.exports = router;