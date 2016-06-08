var React = require('react');
var AjaxService = require('../service/AjaxService');
var AppAction = require('../flux/Actions');
var Hashes = require('jshashes');
var properties = require('../i18/AppProps');
var $ = require('jquery');
var url = '/user/login';
var Login = React.createClass({
    getInitialState: function(){
        return {

        };
    },
    handleSubmit :function(e){
        $('#loginForm-panelAlert').hide();
        var login = {};
        login.email = $('#loginComponent').find('input[name="login-email"]').val();
        var pwd = $('#loginComponent').find('input[name="login-password"]').val();
        login.password  = new Hashes.SHA256().hex(pwd);
        AjaxService.post(url,{data : login},function(response){
            var status = response.data.status;
            if(status){
                window.sessionStorage.setItem('userId',login.email);
                AppAction.loginSuccess(response.data);
                AppAction.toast(properties.loginSuccess);
                window.location.assign("#/home");

            }else{
                $('#loginForm-panelAlert').show();
                AppAction.toast(properties.loginError);
            }

        }.bind(this));
        e.preventDefault();
        e.stopPropagation();
    },
    render: function(){
        return (
            <div className = "container-fluid">
              <div  id="loginComponent" className="login-card account-form">
                <h1>Log-in</h1>
                <br/>
                <form className="loginForm" onSubmit={ this.handleSubmit } >
                <div id="loginForm-panelAlert" className="alert alert-danger" role="alert" >Error : Incorrect Username or Password</div>
                <input name="login-email" type="email" className="form-control account-input"  placeholder="Email"  required />
                <input name="login-password" type="password" className="form-control account-input"  placeholder="Password" required />
                <input type="submit" name="loginSubmit" className="login login-submit"  />
                </form>
                <div class="login-help">
                <a href="#">Forgot Password</a>
                </div>
             </div>

            </div>
        );
    },
    componentDidMount: function(){
        $('#loginForm-panelAlert').hide();
    }
});

module.exports = Login;




