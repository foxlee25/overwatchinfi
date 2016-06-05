var React = require('react');
var AjaxService = require('../service/AjaxService');
var Hashes = require('jshashes');
var $ = require('jquery');
var url = '/user/signup';
var Signup = React.createClass({
    getInitialState: function(){
        return {
        };
    },
    handleSubmit :function(e){
        var signup = {};
        signup.email = $('#signupComponent').find('input[name="signup-email"]').val();
        signup.username = $('#signupComponent').find('input[name="signup-username"]').val();
        var pwd= $('#signupComponent').find('input[name="signup-password"]').val();
        signup.password  = new Hashes.SHA256().hex(pwd);
        AjaxService.post(url,{data : signup},function(response){
            var status = response.data.status;
            if(status){
                window.sessionStorage.setItem('username',signup.email);
                window.location.assign("#/home");
            }
        }.bind(this));
        e.preventDefault();
        e.stopPropagation();
    },
    render: function(){
        return (
            <div className = "container-fluid">
                <div  id="signupComponent" className="signup-card account-form">
                  <h1>Sign Up</h1>
                  <br/>
                  <form className="signupForm" onSubmit={ this.handleSubmit }>
                     <input name="signup-email"  type="email" className="form-control account-input" placeholder="Email"  required />
                     <input name="signup-username" type="text" className="form-control account-input"  placeholder="Username"  required />
                     <input name="signup-password"  type="password" className="form-control account-input" placeholder="Password" required />
                     <input type="submit" name="signupSubmit" className="signup signup-submit"  />
                  </form>
               </div>
            </div>
        );
    },
    componentDidMount: function(){

    }
});

module.exports = Signup;

