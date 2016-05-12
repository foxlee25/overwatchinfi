var React = require('react');
var Base = require('../components/BaseComponent');
var Home = require('../components/HomeComponent');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;

module.exports = (
	<Route path='/' component={Base}>
		<IndexRoute component={Home}></IndexRoute>
	</Route>);
