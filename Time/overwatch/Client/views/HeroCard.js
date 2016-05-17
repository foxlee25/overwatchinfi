var React = require('react');

var HeroCard = React.createClass({
	getInitialState: function(){
		return {};
	},
	render: function(){
		return (
			<div className="col-sm-3">
				<div id="cardDiv">
		  			<img id="herocard" className="img-responsive" src={"./img/hero/"+this.props.hero.imgPath} />
				    <p id="cardTitle" className="card-text">{this.props.hero.heroname}</p>
			    </div>
			</div>
		);
	}
});

module.exports = HeroCard;