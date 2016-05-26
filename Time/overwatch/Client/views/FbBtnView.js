var React = require('react');
var FacebookLogin = require('react-facebook-login');
var AjaxService = require('../service/AjaxService');

var FbBtnView = React.createClass({
	responseFacebook: function(response){
		if(response.id && response.name){
			this.setState({
				id: response.id
			});
			AjaxService.post('/login/fb', response, function(response){
				if(response.status === 200){
					
				}
			});
		}
	},
	getInitialState: function(){
		return {
			id: null
		};
	},
	render: function(){
		if(this.state.id){
			return(
				<img className="fbAvatar" src={"http://graph.facebook.com/"+this.state.id+"/picture?type=normal"} />
			);
		}else{
			return(
				<FacebookLogin 
				appId="238534016527081"
				autoLoad={true}
				cssClass="fbBtn"
				callback={this.responseFacebook} />
			);
		}
	}
});

module.exports = FbBtnView;
