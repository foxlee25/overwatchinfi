var React = require('react');
var AjaxService = require('../service/AjaxService');
var $ = require('jquery');
var url = '/user/signup';
var Signup = React.createClass({
    getInitialState: function(){
        return {
            email:null,
            password:null
        };
    },
    handleSubmit: function(){
        var signup = {};
        signup.email = $('#signupComponent').find('input[name="signup-email"]').val();
        signup.password = $('#signupComponent').find('input[name="signup-password"]').val();
        alert( signup.email +  signup.password);
        AjaxService.post(url,{data : signup});
    },
    render: function(){
        return (
            <div className = "container-fluid">
            <div id="signupComponent" className="row">
            <form role="form">
               <input name="signup-email" value={this.state.email} type="email" className="form-control" placeholder="email" required/>
               <input name="signup-password" value={this.state.password} type="password" className="form-control" placeholder="password"  required/>
            </form>
             <button onClick={this.handleSubmit}  className="btn btn-lg btn-primary btn-block">Sign Up</button>
            </div>
            </div>
        );
    },
    componentDidMount: function(){

    }
});

module.exports = Signup;
