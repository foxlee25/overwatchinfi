/**
 * Created by jinz2 on 6/7/16.
 */
var React = require('react');
var AjaxService = require('../service/AjaxService');
var CommentsLib= require('../side-comments/release/side-comments.js');
var $ = require('jquery');

var SideComments = CommentsLib.addFile('side-comments');


module.exports = SideComments;
