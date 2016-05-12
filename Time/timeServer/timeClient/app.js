var React = require('react');
var Render = require('react-dom');
var Router = require('react-router').Router;
var Routes = require('./config/routes');

Render.render(<Router>{Routes}</Router>, document.getElementById('app'));
