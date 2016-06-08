var React = require('react');
var appValues = require('../i18/AppProps');
var FbBtnView = require('../views/FbBtnView');
var NavDropdown = require("react-bootstrap/lib/NavDropdown");
var MenuItem = require("react-bootstrap/lib/MenuItem");
require("react-bootstrap/lib/Nav");
var AppStore = require('../flux/Store');
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import { Router, Route, Link } from 'react-router'

var Base = React.createClass({
  getInitialState: function(){
    return {
      loginData: null
    };
  },
  getLoginData: function(){
    this.setState({loginData: AppStore.getLoginData()});
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
        {this.state.loginData?<b className="welcome">Welcome {this.state.loginData.username}</b>:null}
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
              <NavDropdown eventKey={3} title={appValues.account} className="navTitle" >
                   <MenuItem className="menuItem" eventKey={3}> <Link to={'/login'}>{appValues.login}</Link></MenuItem>
                   <MenuItem divider />
                   <MenuItem className="menuItem" eventKey={3}> <FbBtnView /> </MenuItem>
                   <MenuItem divider />
                   <MenuItem className="menuItem" eventKey={3}> <Link to={'/signup'}>{appValues.signup}</Link></MenuItem>
               </NavDropdown>
              <li className="navTitle"><a><Link to={'/about'}>{appValues.about}</Link></a></li>
              {this.state.loginData?<li className="navTitle"><a><Link to={'/pro'}>{appValues.pro}</Link></a></li>:null}
            </ul>
          </div>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Base;
