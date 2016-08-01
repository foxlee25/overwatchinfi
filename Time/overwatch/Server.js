var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');
var compression = require('compression');
var logger = require('morgan');
var sm = require('sitemap')



var RestController = require('./RestController.js');
var app = express();
app.use(cors());
app.use(compression());
app.use(logger('dev'));
//use on ec2
//app.listen(80);
//use on local
app.listen(3000, '127.0.0.1');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.enable('trust proxy');
/**
 * process all rest call
 */
app.use(RestController);

//serve front end files
app.use(express.static('./Client/'));

//load html default
app.get('/', function (req, res) {
    res.sendfile('./Client/index.html');
});

var sitemap = sm.createSitemap ({
    hostname: 'http://www.owinfi.com/',
    cacheTime: 600000,        // 600 sec - cache purge period
    urls: [
        { url: '#/guide/',  changefreq: 'daily', priority: 1 },
        { url: '#/heros/',  changefreq: 'monthly',  priority: 0.6 },
        { url: '#/news/' ,  changefreq: 'weekly',  priority: 0.7 },
        { url: '#/videoYoutube/',   changefreq: 'weekly',  priority: 0.8 },
        { url: '#/videoGfycat/',   changefreq: 'weekly',  priority: 0.8 }
    ]
});

app.get('/sitemap.xml', function(req, res) {
    sitemap.toXML( function (err, xml) {
        if (err) {
            return res.status(500).end();
        }
        res.header('Content-Type', 'application/xml');
        res.send( xml );
    });
});


console.log('Server start...');