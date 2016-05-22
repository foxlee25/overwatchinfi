var React = require('react');

var HeroCard = React.createClass({
	getInitialState: function(){
		return {};
	},
	render: function(){
		return (
			<div className="col-md-3 col-sm-6 col-xs-12">
				<div className="heroCard hvr-bob">
		  			<img className="heroCardImg img-responsive" src={"./img/hero/"+this.props.hero.imgPath} />
				    <p id="cardTitle" className="card-text">{this.props.hero.heroname}</p>
			    </div>
			</div>
		);
	}
});

module.exports = HeroCard;