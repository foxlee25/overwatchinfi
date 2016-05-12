var React = require('react');
var appValues = require('../i18/AppProps');

var Base = React.createClass({
  render: function(){
    return(
      <div>
        <div className="navbar navbar-default navbar-static-top">
          <div className="container">
            <p className="navbar-text navbar-lfet">{appValues.appName}</p>
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