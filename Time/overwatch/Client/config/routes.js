var React = require('react');
var Base = require('../components/BaseComponent');
var Home = require('../components/HomeComponent');
var Heros = require('../components/HerosComponent');
var News = require('../components/NewsComponent');
var VideoYoutube = require('../components/VideoYoutubeComponent');
var VideoGfycat = require('../components/VideoGfycatComponent');
var Login = require('../components/LoginComponent');
var Signup = require('../components/SignupComponent');
var Guide = require('../components/GuideComponent');
var Pro = require('../components/ProComponent');
var Player = require('../components/PlayerComponent');
var HeroDetail = require('../components/HeroDetailComponent');
var HeroSkill = require('../components/HeroSkillComponent');
var NoMatch = require('../components/NoMatchComponent');
var BuildGuide = require('../components/BuildGuideComponent');
var Search = require('../components/SearchComponent');
import {Router, Route, IndexRoute} from 'react-router'

module.exports = (
	<Router>
		<Route path='/' component={Base}>
			<IndexRoute component={Search}></IndexRoute>
			<Route path="home" component={Home} />
			<Route path="search" component={Search} />
			<Route path='heros' component={Heros} />
			<Route path="news" component={News} />
            <Route path="videoYoutube" component={VideoYoutube} />
			<Route path="videoGfycat" component={VideoGfycat} />
	        <Route path="login" component={Login} />
	        <Route path="signup" component={Signup} />
			<Route path="guide" component={Guide} />
            <Route path="pro" component={Pro} />
			<Route path="player" component={Player} />
			<Route path="heroskill" component={HeroSkill} />
			<Route path="buildGuide" component={BuildGuide} />
			<Route path="*" component={NoMatch} />
		</Route>
	</Router>
);
