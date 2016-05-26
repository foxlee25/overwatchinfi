var React = require('react');
var AppStore = require('../flux/Store');
var AjaxService = require('../service/AjaxService');

var Pro = React.createClass({
	getInitialState: function() {
		return {info: null, fbLogin: null};
	},
	componentWillMount: function(){

		let data = AppStore.getLoginData();
		this.state.fbLogin = data;
		let config = {
			data: this.state.fbLogin
		};

		AjaxService.post('/pro/all', config, function(response){
			if(response.data.info){
				this.setState({info: response.data.info});
			}
		});
	},
	componentDidMount: function(){
		
	},
	render: function() {
		return (
			<div>
				{this.state.info?<p>{this.state.info}</p>:<p>Seems like you don't have any data yet</p>}
			</div>
		);
	}
});


module.exports = Pro;
