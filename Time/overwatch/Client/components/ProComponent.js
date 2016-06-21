var React = require('react');
var properties = require('../i18/AppProps');
var AjaxService = require('../service/AjaxService');
var ProfileCard = require('../views/ProfileCard');
var AchievementCard = require('../views/AchievementCard');
var PlayedHeroCard = require('../views/PlayedHeroCard');
var LoadingView = require('../views/LoadingView');
var underscore = require('underscore');
var AppStore = require('../flux/Store');
var AppAction = require('../flux/Actions');
var async = require('async');
var $ = require('jquery');

var Pro = React.createClass({
	getInitialState: function() {
		var userId = window.sessionStorage.getItem('userId');
		var battleTag = JSON.parse(window.localStorage.getItem('battleTag'));

		return {info: null, userId: userId, searchError: false, battleTag: battleTag, gameData: null, loading: false};
	},
	componentWillMount: function(){
		if(this.state.battleTag) {
			if(AppStore.getProData().profile != null){
				this.state.gameData = AppStore.getProData();
			}else {
				this.search(this.state.battleTag.battleTag, this.state.battleTag.region, this.state.battleTag.platform);
			}
		}
	},
	componentDidMount: function(){
		$(window).on("load resize ", function() {
			var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
			$('.tbl-header').css({'padding-right':scrollWidth});
		}).resize();
	},
	searchBox: function(){
		this.search(this.refs.search.value.replace("#","-"), this.refs.region.value, this.refs.platform.value);
	},
	search: function(battleTag, region, platform){
		this.state.loading = true;
		this.state.searchError = false;
		this.forceUpdate();
		var battleTag = battleTag;
		var region = region;
		var platform = platform;
		var achievements = `https://api.lootbox.eu/${platform}/${region}/${battleTag}/achievements`;
		var allHero = `https://api.lootbox.eu/${platform}/${region}/${battleTag}/allHeroes/`;
		var heros = `https://api.lootbox.eu/${platform}/${region}/${battleTag}/heroes`;
		var profile = `https://api.lootbox.eu/${platform}/${region}/${battleTag}/profile`;

		async.parallel({
			achievements: (callback) => {
				AjaxService.get(achievements, (response) => {
					if(response instanceof Error){
						callback(response, null);
						return;
					}
					callback(null, response.data);
				});
			},
			allHero: (callback) => {
				AjaxService.get(allHero, (response) => {
					if(response instanceof Error){
						callback(response, null);
						return;
					}
					callback(null, response.data);
				});
			},
			heros: (callback) => {
				AjaxService.get(heros, (response) => {
					if(response instanceof Error){
						callback(response, null);
						return;
					}
					callback(null, response.data);
				});
			},
			profile: (callback) => {
				AjaxService.get(profile, (response) => {
					if(response instanceof Error){
						callback(response, null);
						return;
					}
					callback(null, response.data);
				});
			}}, (err, response) => {
				this.state.loading = false;

				if(err){
					this.state.searchError = true;
					AppAction.toast(properties.searchError);
					this.forceUpdate();
					return;
				}

				if(response.profile.error){
					AppAction.toast(properties.noMatchFound);
					this.forceUpdate();
					return;
				}

				let data = {
					battleTag: battleTag,
					region: region,
					platform: platform
				};
				this.state.gameData = response;
				this.state.battleTag = data;
				AppAction.setHeroData(response);
				this.forceUpdate();
				window.localStorage.setItem('battleTag', JSON.stringify(data));
			}
		);
	},
	render: function() {
			if (!this.state.battleTag){
				return (
					<div className="container">
						<div className="row pro-search">
							<div className="col-lg-6">
								<h4>Search</h4>
								<div className="input-group">
									<input ref="search" type="text" className="form-control"
										   placeholder={properties.battleTag}/>
								  <span className="input-group-btn">
									<button id="proSearchBTN" className="btn btn-default" type="button" onClick={this.searchBox.bind(this)}>Search</button>
								  </span>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="col-md-6">
									<h4>{properties.region}</h4>
									<select ref="region" className="form-control">
										<option default value="us">us</option>
										<option value="eu">eu</option>
									</select>
								</div>
								<div className="col-md-6">
									<h4>{properties.platform}</h4>
									<select ref="platform" className="form-control">
										<option default value="pc">pc</option>
										<option value="xbl">xbox</option>
										<option value="psn">play station</option>
									</select>
								</div>
							</div>
						</div>
							{this.state.loading? <div className="loading-container"><LoadingView /><p>Loading...</p></div>:
							<div>
								<div className="feature-tip">
									<h4>Input your battle tag to get the latest stats.</h4>
								</div>
								< div id="feature-slider">
								<figure>
									<img src={'./img/pro/feature1.png'} alt />
									<img src={'./img/pro/feature2.png'} alt />
									<img src={'./img/pro/feature1.png'} alt />
								</figure>
								</div>
							</div>
						}
					</div>
				);
			}else{
				if(this.state.searchError) {
					return (
						<div className="container">
							<p>There is something wrong with your search</p>
						</div>
					);
				}else{
					if(this.state.gameData) {
						return (
							<div className="container">
								<ProfileCard profile={this.state.gameData.profile}/>
								<div className="row">
									<div className="col-md-6">
										<div className="achievement-span">
											<span style={{color: "#333"}}>Achievements</span>
										</div>
										{underscore.map(this.state.gameData.achievements.achievements, (item) => {
											return (<AchievementCard achievement={item}/>);
										})}
									</div>
									<div className="col-md-6">
										<div className="played-hero-span">
											<span style={{color: "#333"}}>Played heros</span>
										</div>
										{underscore.map(this.state.gameData.heros, (hero) => {
											if (hero.percentage > 0) {
												return (<PlayedHeroCard hero={hero}/>);
											} else {
												return null;
											}
										})}
									</div>
								</div>
								<div className="row">
									<div className="played-heros-span">
										<span style={{color: "#333"}}>Stats</span>
									</div>
									<div className="tbl-header">
										<table className="pro-table" cellpadding="0" cellspacing="0" border="0">
											<thead>
											<tr>
												<th>Stat</th>
												<th>Value</th>
											</tr>
											</thead>
										</table>
									</div>
									<div className="tbl-content">
										<table className="pro-table" cellpadding="0" cellspacing="0" border="0">
											<tbody>
											{underscore.map(this.state.gameData.allHero, (value, key) => {
												return (
													<tr>
														<td>{key}</td>
														<td>{value}</td>
													</tr>
												);
											})}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						);
					}else{
						return (
							<div className="container">
								<div className="loading-container">
									<LoadingView />
									<p>Loading...</p>
								</div>
							</div>
						);
					}
				}
			}
	}
});


module.exports = Pro;
