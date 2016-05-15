var React = require('react');
var Base = require('../components/BaseComponent');
var Home = require('../components/HomeComponent');
var Heros = require('../components/HerosComponent');
var NoMatch = require('../components/NoMatchComponent');
var Router = require('react-router');
var browserHistory = Router.browserHistory;
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;

module.exports = (
	<Router history={browserHistory}>
		<Route path='/' component={Base}>
			<IndexRoute component={Home}></IndexRoute>
			<Route path="home" component={Home} />
			<Route path='heros' component={Heros} />
			<Route path="*" component={NoMatch} />
		</Route>
	</Router>
);
