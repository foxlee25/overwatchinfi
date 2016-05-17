var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');


var RestController = require('./RestController.js');
var app = express();
app.use(cors());
//use on ec2
//app.listen(80);
//use on local
app.listen(3000, '127.0.0.1');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
/**
 * process all rest call
 */
app.use(RestController);

//serve front end files
app.use(express.static('./overwatch/Client/'));

//load html default
app.get('/', function (req, res) {
    res.sendfile('./overwatch/Client/index.html');
});
console.log('Time Server start...');