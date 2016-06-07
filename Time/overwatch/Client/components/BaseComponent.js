var React = require('react');
var appValues = require('../i18/AppProps');
var FbBtnView = require('../views/FbBtnView');
var NavDropdown = require("react-bootstrap/lib/NavDropdown");
var MenuItem = require("react-bootstrap/lib/MenuItem");
require("react-bootstrap/lib/Nav");
var AppStore = require('../flux/Store');
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
  },
  componentDidMount: function(){
    AppStore.addListener(this.getLoginData);
  },
  componentDidUnMount: function(){
    AppStore.removeListener(this.getLoginData);
  },
  render: function(){
    return(
      <div className="container">

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
    {this.state.loginData?null:<NavDropdown eventKey={3} title={appValues.account} className="navTitle" >
                    <MenuItem className="menuItem" eventKey={3}> <Link to={'/login'}>{appValues.login}</Link></MenuItem>
                   <MenuItem divider />
                   <MenuItem className="menuItem" eventKey={3}> <FbBtnView /> </MenuItem>
                   <MenuItem divider />
                   <MenuItem className="menuItem" eventKey={3}> <Link to={'/signup'}>{appValues.signup}</Link></MenuItem>
               </NavDropdown>}
              <li className="navTitle"><a><Link to={'/about'}>{appValues.about}</Link></a></li>
            </ul>
             {this.state.loginData?<b className="helloUser">Hello {this.state.loginData.userId}</b>:null}
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
