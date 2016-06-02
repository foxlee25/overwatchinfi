var React = require('react');
var AjaxService = require('../service/AjaxService');
var Hashes = require('jshashes');
var $ = require('jquery');
var url = '/user/login';
var Login = React.createClass({
    getInitialState: function(){
        return {

        };
    },
    handleSubmit :function(e){
        var login = {};
        login.email = $('#loginComponent').find('input[name="login-email"]').val();
        var pwd = $('#loginComponent').find('input[name="login-password"]').val();
        login.password  = new Hashes.SHA256().hex(pwd);
        AjaxService.post(url,{data : login},function(response){
        }.bind(this));

        e.preventDefault();
        e.stopImmediatePropagation();
    },
    render: function(){
        return (
            <div className = "container-fluid">
              <div  id="loginComponent" className="login-card account-form">
                <h1>Log-in</h1>
                <br/>
                <form className="loginForm" onSubmit={ this.handleSubmit } >
                <div id="loginForm-panelAlert" className="alert alert-danger" role="alert" >Username or Password is wrong</div>
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




