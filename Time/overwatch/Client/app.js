var React = require('react');
var Render = require('react-dom');
import {Router, hashHistory} from 'react-router'
var Routes = require('./config/routes');

Render.render(<Router history={hashHistory} >{Routes}</Router>, document.getElementById('app'));
