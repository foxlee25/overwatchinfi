var React = require('react');
var Base = require('../components/BaseComponent');
var Home = require('../components/HomeComponent');
var Heros = require('../components/HerosComponent');
var News = require('../components/NewsComponent');
var Twits = require('../components/TwitComponent');
var VideoYoutube = require('../components/VideoYoutubeComponent');
var VideoGfycat = require('../components/VideoGfycatComponent');
var Pro = require('../components/ProComponent');
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
			<Route path="news" component={News} />
			<Route path="twits" component={Twits} />
            <Route path="videoYoutube" component={VideoYoutube} />
			<Route path="videoGfycat" component={VideoGfycat} />
            <Route path="pro" component={Pro} />
			<Route path="*" component={NoMatch} />
		</Route>
	</Router>
);
