/**** keep track all the rest req , first level router**/
var express = require('express');
var fs = require('fs');
var restController = express.Router();
//add all rest file here
var user = require('./Rest/User.js');
var hero = require('./Rest/Hero.js');
var news = require('./Rest/News.js');
var twits = require('./Rest/Twits.js');
var video = require('./Rest/Video.js');
var pro = require('./Rest/Pro.js');
var guide = require('./Rest/Guide.js');
restController.use('/user', user);
restController.use('/hero', hero);
restController.use('/news', news);
restController.use('/twits',twits);
restController.use('/video',video);
restController.use('/pro', pro);
restController.use('/guide', guide);

module.exports = restController;