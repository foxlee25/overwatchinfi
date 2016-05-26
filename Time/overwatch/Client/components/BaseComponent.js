var React = require('react');
var appValues = require('../i18/AppProps');
var FbBtnView = require('../views/FbBtnView');
import { Router, Route, Link } from 'react-router'

var Base = React.createClass({
  getInitialState: function(){
    return {
      id: null,
    };
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
              <li className="navTitle"><a><Link to={'/heros'}>{appValues.heros}</Link></a></li>
              <li className="navTitle"><a><Link to={'/video'}>{appValues.video}</Link></a></li>
              <li className="navTitle"><a><Link to={'/news'}>{appValues.news}</Link></a></li>
              <li className="navTitle"><a><Link to={'/twits'}>{appValues.twits}</Link></a></li>
              <li className="navTitle"><a><Link to={'/about'}>{appValues.about}</Link></a></li> 
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
