var React = require('react');
var Base = require('../components/BaseComponent');
var Home = require('../components/HomeComponent');
var Heros = require('../components/HerosComponent');
var News = require('../components/NewsComponent');
var Twits = require('../components/TwitComponent');
var VideoYoutube = require('../components/VideoYoutubeComponent');
var VideoGfycat = require('../components/VideoGfycatComponent');
var Login = require('../components/LoginComponent');
var Signup = require('../components/SignupComponent');
var Pro = require('../components/ProComponent');
var Player = require('../components/PlayerComponent');
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
	        <Route path="login" component={Login} />
	        <Route path="signup" component={Signup} />
            <Route path="pro" component={Pro} />
			<Route path="player" component={Player} />
			<Route path="*" component={NoMatch} />
		</Route>
	</Router>
);
