var React = require('react');
var AppStore = require('../flux/Store');
import { Link } from 'react-router'

var Home = React.createClass({
	getInitialState: function() {
	    return {
	      loginData: AppStore.getLoginData(),
	    };
	},
	getLoginData: function(){
		this.setState({loginData: AppStore.getLoginData()});
	},
	componentDidMount: function(){
		AppStore.addListener(this.getLoginData);
	},
	componentDidUnMount: function(){
		AppStore.removeListener(this.getLoginData);
	},
	render: function() {
		return (
			<div>
				<section className="work-list">
					<div className="inner">
						<article className="work-item" data-show="on-scroll">
							<a><Link to={'/heros'}>
							<img src="./img/wallpapers/Hero.jpg" />
							<div className="content">
								<div>
									<div>
										<h1>Heros</h1>
									</div>
								</div>
							</div>
							</Link>
							</a>
						</article>
						<article className="work-item" data-show="on-scroll">
							<a><Link to={'/video'}>
							<img src="./img/wallpapers/Video.jpg" />
							<div className="content">
								<div>
									<div>
										<h1>Video</h1>
									</div>
								</div>
							</div>							
							</Link>
							</a>
						</article>
						<article className="work-item" data-show="on-scroll">
							<a><Link to={'/news'}>
							<img src="./img/wallpapers/News.jpg" />
							<div className="content">
								<div>
									<div>
										<h1>News</h1>
									</div>
								</div>
							</div>							
							</Link>
							</a>
						</article>
						<article className="work-item" data-show="on-scroll">
							<a><Link to={'/twits'}>
							<img src="./img/wallpapers/Twitter.jpg" />
							<div className="content">
								<div>
									<div>
										<h1>Twitter</h1>
									</div>
								</div>
							</div>							
							</Link>
							</a>
						</article>
						<article className="work-item" data-show="on-scroll">
							<a><Link to={'/about'}>
							<img src="./img/wallpapers/About.jpg" />
							<div className="content">
								<div>
									<div>
										<h1>About</h1>
									</div>
								</div>
							</div>							
							</Link>
							</a>
						</article>
						{this.state.loginData.id?
						<article className="work-item" data-show="on-scroll">
							<a><Link to={'/pro'}>
							<img src="./img/wallpapers/Pro.jpg" />
							<div className="content">
								<div>
									<div>
										<h1>Pro</h1>
									</div>
								</div>
							</div>							
							</Link>
							</a>
						</article>:null}
					</div>
				</section>
			</div>
		);
	}
});


module.exports = Home;
