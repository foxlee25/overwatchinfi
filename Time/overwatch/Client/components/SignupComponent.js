var React = require('react');
var AjaxService = require('../service/AjaxService');
var AppAction = require('../flux/Actions');
var properties = require('../i18/AppProps');
var Hashes = require('jshashes');
var $ = require('jquery');
var url = '/user/signup';
var Signup = React.createClass({
    getInitialState: function(){
        return {
        };
    },
    handleSubmit :function(e){
        $('#signupForm-panelAlert').hide();
        var signup = {};
        signup.email = $('#signupComponent').find('input[name="signup-email"]').val();
        signup.userId = $('#signupComponent').find('input[name="signup-userId"]').val();
        var pwd= $('#signupComponent').find('input[name="signup-password"]').val();
        signup.password  = new Hashes.SHA256().hex(pwd);
        AjaxService.post(url,{data : signup},function(response){
            var status = response.data.status;
            if(status){
                window.sessionStorage.setItem('userId',signup.userId);
                delete signup.password;
                AppAction.loginSuccess(signup);
                AppAction.toast(properties.signupSuccess);
                if(window.localStorage.getItem('currentPage')){
                    window.location.assign("#/"+window.localStorage.getItem('currentPage'));
                }else{
                    window.location.assign("#/search");
                }
            }else{
                $('#signupForm-panelAlert').show();
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
                     <div id="signupForm-panelAlert" className="alert alert-danger" role="alert" >Error : Email or Username already exists</div>
                     <input name="signup-email"  type="email" className="form-control account-input" placeholder="Email"  required />
                     <input name="signup-userId" type="text" className="form-control account-input"  placeholder="Username"  required />
                     <input name="signup-password"  type="password" className="form-control account-input" placeholder="Password" required />
                     <button type="submit" name="signupSubmit" className="signup signup-submit"  >Submit</button>
                  </form>
               </div>
            </div>
        );
    },
    componentDidMount: function(){
        $('#signupForm-panelAlert').hide();
    }
});

module.exports = Signup;

