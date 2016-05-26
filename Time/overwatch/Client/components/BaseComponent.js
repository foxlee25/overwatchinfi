var React = require('react');
var appValues = require('../i18/AppProps');
var FbBtnView = require('../views/FbBtnView');
var AppStore = require('../flux/Store');
import { Router, Route, Link } from 'react-router'

var Base = React.createClass({
  getInitialState: function(){
    return {
      loginData: null,
    };
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
        {this.state.loginData?<b className="welcome">welcome {this.state.loginData.name}</b>:null}
        <div id="navBand" className="navbar navbar-inverse">
          <div>
            <div className="navbar-header">
              <a className="navbar-brand"><Link to={'/home'}><img src="./img/logo/logo1.png" /></Link></a>
            </div>
            <ul className="nav navbar-nav">
              <li className="navTitle"><a><Link to={'/home'}>{appValues.home}</Link></a></li>
              <li className="navTitle"><a><Link to={'/heros'}>{appValues.heros}</Link></a></li>
              <li className="navTitle"><a><Link to={'/video'}>{appValues.video}</Link></a></li>
              <li className="navTitle"><a><Link to={'/news'}>{appValues.news}</Link></a></li>
              <li className="navTitle"><a><Link to={'/twits'}>{appValues.twits}</Link></a></li>
              <li className="navTitle"><a><Link to={'/about'}>{appValues.about}</Link></a></li> 
              {this.state.loginData?<li className="navTitle"><a><Link to={'/pro'}>{appValues.pro}</Link></a></li>:null}
            </ul>
            <div className="navbar-header navbar-right">
              <FbBtnView />
            </div>
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
