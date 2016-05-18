var React = require('react');
var appValues = require('../i18/AppProps');
import { Router, Route, Link } from 'react-router'

var Base = React.createClass({
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
              <li className="navTitle"><a><Link to={'/news'}>{appValues.news}</Link></a></li>
              <li className="navTitle"><a><Link to={'/twits'}>{appValues.twits}</Link></a></li>
              <li className="navTitle"><a><Link to={'/about'}>{appValues.about}</Link></a></li> 
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