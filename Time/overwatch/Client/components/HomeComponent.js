var React = require('react');
var AppStore = require('../flux/Store');
var AppAction = require('../flux/Actions');
var properties = require('../i18/AppProps');
var underscore = require('underscore');
var AjaxService = require('../service/AjaxService');
import { Link } from 'react-router'

var Home = React.createClass({
	getInitialState: function() {
	    return {
	      loginData: AppStore.getLoginData(),
			news: [],
			videos: [],
			guides: []
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
	componentWillMount: function(){
		//make call to get latest videos
		var url = '/video/getAllVideos';
		AjaxService.post(url,{data :{source :'youtube',pageIndex: 1,videoNum : 5}},function(response){
			this.state.videos = response.data.slice(0, 4);
			this.forceUpdate();
		}.bind(this));
		//make call to get latest news
		AjaxService.get('/news/allNews', function(response){
			if(response instanceof Error){
				console.error("Can't get news data");
				return;
			}

			this.state.news = response.data.slice(0, 6);
			this.forceUpdate();
		}.bind(this));
		//make call to get key festure
		var url = '/guide/allGuides';
		AjaxService.post(url,{data :{sortType :'newest',pageIndex: 1, guideNum : 6}},function(response){
			if(response.data.length > 6){
				this.state.guides = response.data.slice(0, 6);
			}else{
				this.state.guides = response.data;
			}
			this.forceUpdate();
		}.bind(this));
	},
	setVideoData: function(video){
		video.genre = "youtube";
		AppAction.videoData(video);
		window.scrollTo(0, 0);
	},
	setId: function(path){
		let id = path.replace(".png", "");
		AppAction.setHeroId(id);
		window.scrollTo(0, 0);
	},
	render: function() {
		return (
			<div className="home-div">
				<div>
					<img className="home-poster" src="./img/wallpapers/Home.jpg" />
				</div>
				{this.state.videos.length>0?
					<div className="row">
						<h4 className="marginBottom">{properties.latestVideo}<span className="glyphicon glyphicon-th-list marginSpace" aria-hidden="true"></span></h4>


						{underscore.map(this.state.videos, function(video){
							return(
							<a>
								<div className="col-md-3 home-video-div" onClick={this.setVideoData.bind(this, video)}>
									<Link to={'/player'}>
									<img className="home-video" src={"http://img.youtube.com/vi/"+video.videoId+"/hqdefault.jpg"} />
									<img className="play-button"  src={"./img/icon/play.png"} />
									</Link>
								</div>
							</a>
							);
						}.bind(this))}
					</div>:null
				}
				<div className="row marginTop">
					{this.state.news.length>0 ?
						<div className="home-news">
							<h4>{properties.latestNews}<span className="glyphicon glyphicon-th-list marginSpace" aria-hidden="true"></span></h4>
							{underscore.map(this.state.news, function(newsItem){
								if(newsItem.source.enriched.url.text.length > 500){
									newsItem.source.enriched.url.text = newsItem.source.enriched.url.text.substring(0, 500)+"...";
								}
								return(
								<div className="home-news-div" onClick={() => {window.open(newsItem.source.enriched.url.url);}}>
									<p>{newsItem.source.enriched.url.title}</p>
									<p>{newsItem.source.enriched.url.text}</p>
								</div>
								);
							}.bind(this))}
						</div>:null
					}
					{this.state.guides.length>0?
						<div className="home-guide">
							<h4>{properties.teamGuide}<span className="glyphicon glyphicon-th-list marginSpace" aria-hidden="true"></span></h4>
							{underscore.map(this.state.guides, function(guide){
								return(
									<div className="home-guide-div">
										<img src={"./img/guide/map/"+guide.map} />
										<div className="home-guide-hero-div">
											<div className="home-guide-hero">
												{underscore.map(guide.heroList.slice(0, 3), function(hero){
													return (<a><Link onClick={this.setId.bind(this, hero)} to={'/herodetail'}><img src={"./img/hero/"+hero} /></Link></a>);
												}.bind(this))}
											</div>
											<div className="home-guide-hero">
												{underscore.map(guide.heroList.slice(3, 6), function(hero){
													return (<a><Link onClick={this.setId.bind(this, hero)} to={'/herodetail'}><img src={"./img/hero/"+hero} /></Link></a>);
												}.bind(this))}
											</div>
										</div>
									</div>
								);
							}.bind(this))}
						</div>:null
					}
				</div>
			</div>
		);
	}
});


module.exports = Home;

// <section className="work-list">
// 	<div className="inner">
// 		<article className="work-item" data-show="on-scroll">
// 			<a><Link to={'/heros'}>
// 				<img src="./img/wallpapers/Hero.jpg" />
// 				<div className="content">
// 					<div>
// 						<div>
// 							<h1>Heros</h1>
// 						</div>
// 					</div>
// 				</div>
// 			</Link>
// 			</a>
// 		</article>
// 		<article className="work-item" data-show="on-scroll">
// 			<a><Link to={'/video'}>
// 				<img src="./img/wallpapers/Video.jpg" />
// 				<div className="content">
// 					<div>
// 						<div>
// 							<h1>Video</h1>
// 						</div>
// 					</div>
// 				</div>
// 			</Link>
// 			</a>
// 		</article>
// 		<article className="work-item" data-show="on-scroll">
// 			<a><Link to={'/news'}>
// 				<img src="./img/wallpapers/News.jpg" />
// 				<div className="content">
// 					<div>
// 						<div>
// 							<h1>News</h1>
// 						</div>
// 					</div>
// 				</div>
// 			</Link>
// 			</a>
// 		</article>
// 		<article className="work-item" data-show="on-scroll">
// 			<a><Link to={'/twits'}>
// 				<img src="./img/wallpapers/Twitter.jpg" />
// 				<div className="content">
// 					<div>
// 						<div>
// 							<h1>Twitter</h1>
// 						</div>
// 					</div>
// 				</div>
// 			</Link>
// 			</a>
// 		</article>
// 		<article className="work-item" data-show="on-scroll">
// 			<a><Link to={'/about'}>
// 				<img src="./img/wallpapers/About.jpg" />
// 				<div className="content">
// 					<div>
// 						<div>
// 							<h1>About</h1>
// 						</div>
// 					</div>
// 				</div>
// 			</Link>
// 			</a>
// 		</article>
// 	</div>
// </section>