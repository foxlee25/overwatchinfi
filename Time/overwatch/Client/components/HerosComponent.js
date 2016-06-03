var React = require('react');
var AjaxService = require('../service/AjaxService');
var Underscore= require('underscore');
var HeroCard = require('../views/HeroCard');
var url = '/hero/allheros';
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
        	if(response instanceof Error){
        		console.error("Can't get hero data");
        		return;
        	}
            this.state.heros = response.data;
            console.table(this.state.heros);
			this.forceUpdate();
        }.bind(this));
	}
});

module.exports = Heros;