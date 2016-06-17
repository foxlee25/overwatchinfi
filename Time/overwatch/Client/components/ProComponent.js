var React = require('react');
var AppStore = require('../flux/Store');
var properties = require('../i18/AppProps');
var AjaxService = require('../service/AjaxService');
var ProfileCard = require('../views/ProfileCard');
var async = require('async');

var Pro = React.createClass({
	getInitialState: function() {
		var userId = window.sessionStorage.getItem('userId');
		var battleTag = window.localStorage.getItem('battleTag');
		return {info: null, userId: userId, searchError: false, battleTag: battleTag, gameData: null};
	},
	componentWillMount: function(){

	},
	componentDidMount: function(){
		
	},
	search: function(){
		var battleTag = this.refs.search.value;
		var region = this.refs.region.value;
		var platform = this.refs.platform.value;
		var achievements = `https://api.lootbox.eu/${platform}/${region}/${battleTag}/achievements`;
		var allHero = `https://api.lootbox.eu/${platform}/${region}/${battleTag}/allHeroes/`;
		var heros = `https://api.lootbox.eu/${platform}/${region}/${battleTag}/heroes`;
		var profile = `https://api.lootbox.eu/${platform}/${region}/${battleTag}/profile`;

		async.parallel({
			achievements: (callback) => {
				AjaxService.get(achievements, (response) => {
					callback(null, response.data);
				});
			},
			allHero: (callback) => {
				AjaxService.get(allHero, (response) => {
					callback(null, response.data);
				});
			},
			heros: (callback) => {
				AjaxService.get(heros, (response) => {
					callback(null, response.data);
				});
			},
			profile: (callback) => {
				AjaxService.get(profile, (response) => {
					callback(null, response.data);
				});
			}}, (err, response) => {
				if(response.profile.data === null){
					this.state.searchError = true;
				}

				this.state.gameData = response;
				this.state.battleTag = battleTag;
				this.forceUpdate();
				window.localStorage.setItem('battleTag', battleTag);
			}
		);
	},
	render: function() {
		if(this.state.userId) {
			if (!this.state.battleTag){
				return (
					<div className="container">
						<div className="row">
							<div className="col-lg-6">
								<div className="input-group">
									<input ref="search" type="text" className="form-control"
										   placeholder={properties.battleTag}/>
								  <span className="input-group-btn">
									<button className="btn btn-default" type="button" onClick={this.search.bind(this)}>Search</button>
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
					return (
						<div className="container">
							<ProfileCard profile={this.state.gameData.profile} />
						</div>
					);
				}
			}
		}else {
			return (
				<div>
					<p>login to get your personal data trainer</p>
				</div>
			);
		}
	}
});


module.exports = Pro;
