var React = require('react');
var AjaxService = require('../service/AjaxService');
var AppStore = require('../flux/Store');
var _ = require('underscore');
var $ = require('jquery');
var url = '/hero/heroDetail';

var HeroDetail = React.createClass({
	getInitialState: function(){
		return {
			detail: null
		};
	},
	componentDidMount: function(){
		
	},
	componentWillMount: function(){
		var id = AppStore.getHeroId();
		AjaxService.get(url+"/"+id, function(response){

			this.state.detail = response.data;
			this.forceUpdate();
		}.bind(this));
	},
	render: function(){
		if(this.state.detail) {
			return(
				<div className="container-fluid">
					<div className="detailBg">
						<img className="heroImg" src={this.state.detail.poster} />
						<div className="heroText">
							<h1>{this.state.detail._id.toUpperCase()}</h1>
							<h3>Biography</h3>
							{_.map(this.state.detail.bio, function(obj){
								return(<p>{obj}</p>);
							}.bind(this))}
							<h3>Role: {this.state.detail.role}</h3>
							<p>{this.state.detail.overview}</p>
							<h3>Story</h3>
							{_.map(this.state.detail.description, function(obj){
								return(<p>{obj}</p>);
							})}
							<h3>Abilities</h3>
							<table className="table">
								{_.map(this.state.detail.abilities.name, function(obj){
									let index = this.state.detail.abilities.name.indexOf(obj);
									return (<tr><td>{obj}</td><td>{this.state.detail.abilities.desc[index]}</td></tr>);
								}.bind(this))}
							</table>
						</div>
					</div>
				</div>
			);
		}else{
			return (
				<div></div>
			);
		}
	}
});

module.exports = HeroDetail;