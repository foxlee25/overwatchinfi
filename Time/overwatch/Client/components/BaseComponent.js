var React = require('react');
var appValues = require('../i18/AppProps');
import { Router, Route, Link } from 'react-router'

var Base = React.createClass({
  render: function(){
    return(
      <div>
        <div className="navbar navbar-default navbar-static-top">
          <div>
            <div className="collapse navbar-collapse" id="js-navbar-collapse">
              <ul className="nav navbar-nav">
                <li><Link to={'/home'}>{appValues.appName}</Link></li>
                <li><Link to={'/heros'}>{appValues.heros}</Link></li>
                <li><Link to={'/about'}>{appValues.about}</Link></li>
              </ul>
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