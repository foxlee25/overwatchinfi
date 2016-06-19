var React = require('react');
var appValues = require('../i18/AppProps');
var FbBtnView = require('../views/FbBtnView');
var NavDropdown = require("react-bootstrap/lib/NavDropdown");
var MenuItem = require("react-bootstrap/lib/MenuItem");
require("react-bootstrap/lib/Nav");
var AppStore = require('../flux/Store');
var ReactToastr = require("react-toastr");
var $ = require("jquery");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import { Router, Route, Link } from 'react-router'

var Base = React.createClass({
  getInitialState: function(){
    var userId = window.sessionStorage.getItem('userId');
    if(userId){
      var user={};
      user.userId=userId;
      return {
        loginData: user
      };
    }else{
      return {
        loginData: null
      };
    }

  },
  getLoginData: function(){
    this.setState({loginData: AppStore.getLoginData()});
    debugger;
    $(".login-signup-div").hide();
  },
    triggerToast: function(){
        var message = AppStore.getToastMessage();
        this.refs.container.success(
            "",
            message, {
                timeOut: 5000,
                extendedTimeOut: 10000
            });
    },
  componentDidMount: function(){
    AppStore.addListener("CHANGE", this.getLoginData);
      AppStore.addListener("TOAST", this.triggerToast);
  },
  componentDidUnMount: function(){
    AppStore.removeListener("CHANGE", this.getLoginData);
      AppStore.removeListener("TOAST", this.triggerToast);
  },
  render: function(){
    return(
      <div className="container">
          <ToastContainer ref="container"
                          toastMessageFactory={ToastMessageFactory}
                          className="toast-top-right" />

        <div id="navBand" className="navbar navbar-inverse">
          <div>
            <div className="navbar-header">
              <a className="navbar-brand"><Link to={'/home'}><img src="./img/logo/logo1.png" /></Link></a>
            </div>
            <ul className="nav navbar-nav">
              <li className="navTitle"><a><Link to={'/home'}>{appValues.home}</Link></a></li>
              <li className="navTitle"><a><Link to={'/guide'}>{appValues.guide}</Link></a></li>
              <li className="navTitle"><a><Link to={'/heros'}>{appValues.heros}</Link></a></li>
              <NavDropdown eventKey={3} title={appValues.video} className="navTitle" >
                   <MenuItem className="menuItem" eventKey={3}> <Link to={'/videoGfycat'}>{appValues.gfycat}</Link></MenuItem>
                   <MenuItem divider />
                   <MenuItem className="menuItem" eventKey={3}> <Link to={'/videoYoutube'}>{appValues.youtube}</Link></MenuItem>
              </NavDropdown>
              <li className="navTitle"><a><Link to={'/news'}>{appValues.news}</Link></a></li>
              <li className="navTitle"><a><Link to={'/pro'}>{appValues.pro}</Link></a></li>
            </ul>
             {this.state.loginData?<span className="helloUser">Hi, {this.state.loginData.userId}</span>:<span className="violator violator-compact pull-right"><a><Link to={'/login'}>Login</Link></a></span>}
          </div>
        </div>
        <div className="pageMarginTop">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Base;
