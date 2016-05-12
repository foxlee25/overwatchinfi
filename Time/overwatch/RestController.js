/**** keep track all the rest req , first level router**/
var express = require('express');
var fs = require('fs');
var restController = express.Router();
//add all rest file here
var user = require('./Rest/User.js');
restController.use('/user', user);


module.exports = restController;