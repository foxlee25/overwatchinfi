var React = require('react');

var HeroCard = React.createClass({
	getInitialState: function(){
		return {};
	},
	render: function(){
		return (
			<div className="col-sm-2">
				<div className="card">
				  <img id="herocard" className="card-img-top" src={"./img/hero/"+this.props.hero.imgPath} alt="Card image cap" />
				  <div className="card-block">
				    <p id="cardTitle" className="card-text">{this.props.hero.heroname}</p>
				  </div>
				</div>
			</div>
		);
	}
});

module.exports = HeroCard;