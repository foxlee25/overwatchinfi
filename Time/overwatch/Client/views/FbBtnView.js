var React = require('react');
var FacebookLogin = require('react-facebook-login');
var AjaxService = require('../service/AjaxService');
var AppAction = require('../flux/Actions');

var FbBtnView = React.createClass({
	responseFacebook: function(response){
		if(response.id && response.name){
			this.setState({
				id: response.id
			});
			AppAction.loginSuccess(response);
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
				id="fblogin"
				appId="239756926404790"
				autoLoad={true}
				cssClass="fbBtn"
				callback={this.responseFacebook} />
			);
		}
	}
});

module.exports = FbBtnView;
