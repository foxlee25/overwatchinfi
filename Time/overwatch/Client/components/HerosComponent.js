var React = require('react');
var AjaxService = require('../service/AjaxService');
var Underscore= require('underscore');
var HeroCard = require('../views/HeroCard');
var url = '/heros/allheros';
var Heros = React.createClass({
	getInitialState: function(){
		return {
			heros: []
		};
	},
	render: function(){
		return (
			<div className = "container-fluid">
				<div id="herosComponent" className="row">
					{Underscore.map(this.state.heros, function(hero){
						return(<HeroCard key={hero.key} hero={hero} />);
					}.bind(this))}
				</div>
			</div>
		);
	},
	componentDidMount: function(){    
        AjaxService.get(url,function(response){
            this.state.heros = response.data;
			this.forceUpdate();
        }.bind(this));
	}
});

module.exports = Heros;