var React = require('react');
var AjaxService = require('../service/AjaxService');
var AppAction = require('../flux/Actions');
var Hashes = require('jshashes');
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
        login.userId = $('#loginComponent').find('input[name="login-userId"]').val();
        var pwd = $('#loginComponent').find('input[name="login-password"]').val();
        login.password  = new Hashes.SHA256().hex(pwd);
        AjaxService.post(url,{data : login},function(response){
            var status = response.data.status;
            if(status){
                window.sessionStorage.setItem('userId',login.userId);
                AppAction.loginSuccess(response.data);
                window.location.assign("#/home");

            }else{
                $('#loginForm-panelAlert').show();
            }

        }.bind(this));
        e.preventDefault();
        e.stopPropagation();
    },
    render: function(){
        return (
            <div className = "container-fluid">
              <div  id="loginComponent" className="login-card account-form">
                <h1>Login</h1>
                <br/>
                <form className="loginForm" onSubmit={ this.handleSubmit } >
                <div id="loginForm-panelAlert" className="alert alert-danger" role="alert" >Error : Incorrect Username or Password</div>
                <input name="login-userId" type="text" className="form-control account-input"  placeholder="Email or Username"  required />
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




