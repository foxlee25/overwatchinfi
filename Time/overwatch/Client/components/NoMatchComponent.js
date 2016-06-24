var React = require('react');

var NoMatch = React.createClass({
	getInitialState: function(){
		return {};
	},
	render: function(){
		return (
			<div className="container">
				<p>404</p>
			</div>
		);
	}
});

module.exports = NoMatch;