/**** keep track all the rest req , first level router**/
var express = require('express');
var fs = require('fs');
var restController = express.Router();
//add all rest file here
var user = require('./Rest/User.js');
var hero = require('./Rest/Hero.js');
restController.use('/user', user);
restController.use('/heros', hero);


module.exports = restController;