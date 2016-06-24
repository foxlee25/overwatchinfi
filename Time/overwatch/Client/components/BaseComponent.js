var React = require('react');
var appValues = require('../i18/AppProps');
var AppAction = require('../flux/Actions');
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
    logout: function(){
        window.sessionStorage.setItem('userId','');
        AppStore.setLoginData({})
        AppAction.toast(appValues.logout);
        window.location.reload(true);
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
              <Link className="navbar-brand" to={'/search'}><img src="./img/logo/owinfi.png" /></Link>
            </div>
            <ul className="nav navbar-nav">
              <li className="navTitle"><Link to={'/search'}>{appValues.home}</Link></li>
              <li className="navTitle"><Link to={'/guide'}>{appValues.guide}</Link></li>
              <li className="navTitle"><Link to={'/heros'}>{appValues.heros}</Link></li>
              <li className="navTitle"><Link to={'/news'}>{appValues.news}</Link></li>
              <NavDropdown id="header-video-dropdown" eventKey={3} title={appValues.video} className="navTitle" >
                  <MenuItem href="#/videoGfycat" className="menuItem" eventKey={3}>{appValues.gfycat}</MenuItem>
              <MenuItem divider />
              <MenuItem href="#/videoYoutube" className="menuItem" eventKey={3}> {appValues.youtube}</MenuItem>
              </NavDropdown>
            </ul>
             {this.state.loginData?<div className="logout-btn"><span className="helloUser">Hi, {this.state.loginData.userId} </span> <span onClick={this.logout.bind(this)} className="violator violator-compact ">{appValues.logout}</span></div>:<span className="violator violator-compact pull-right"><Link to={'/login'}>Login</Link></span>}
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
