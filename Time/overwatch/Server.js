var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');
var compression = require('compression');
var logger = require('morgan');



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
console.log('Time Server start...');