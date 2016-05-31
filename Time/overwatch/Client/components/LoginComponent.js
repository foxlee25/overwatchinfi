var React = require('react');
var AjaxService = require('../service/AjaxService');
var $ = require('jquery');
var url = '/user/login';
var Login = React.createClass({
    getInitialState: function(){
        return {
            email:null,
            password:null
        };
    },
    handleSubmit: function(){
        var login = {};
        login.email = $('#loginComponent').find('input[name="login-email"]').val();
        login.password = $('#loginComponent').find('input[name="login-password"]').val();
        AjaxService.post(url,{data : login},function(response){
        }.bind(this));
    },
    render: function(){
        return (
            <div className = "container-fluid">
            <div id="loginComponent" className="row">
            <form role="form">
            <input name="login-email" value={this.state.email} type="email" className="form-control" placeholder="email" required/>
            <input name="login-password" value={this.state.password} type="password" className="form-control" placeholder="password"  required/>
             </form>
             <button onClick={this.handleSubmit}  className="btn btn-lg btn-primary btn-block">Login</button>
            </div>
            </div>
        );
    },
    componentDidMount: function(){

    }
});

module.exports = Login;
