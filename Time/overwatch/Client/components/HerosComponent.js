var React = require('react');
var HttpService = require('../service/HttpService');
var _  = require('underscore');
var HeroCard = require('../views/HeroCard');

var Heros = React.createClass({
	getInitialState: function(){
		return {
			heros: []
		};
	},
	render: function(){
		return (
			<div className="marketing">
				<div id="herosComponent" className="row-fluid">
					{_.map(this.state.heros, function(hero){
						return(<HeroCard key={hero.key} hero={hero} />);
					}.bind(this))}
				</div>
			</div>
		);
	},
	componentDidMount: function(){
		HttpService.getHeros().then(function(response){
			this.state.heros = response.data;
			this.forceUpdate();
		}.bind(this)).catch(function(response){
			console.error(response);
		});
	}
});

module.exports = Heros;