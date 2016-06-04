var React = require('react');

var NewsCard = React.createClass({
	getInitialState: function(){
		return {};
	},
	openNewsLink: function(link){
		window.open(link);
	},
	componentWillMount: function(){
		if(this.props.new.source.enriched.url.text.length > 500){
			this.props.new.source.enriched.url.text = this.props.new.source.enriched.url.text.substring(0, 500)+"...";
		}
	},
	render: function(){
		return (
			<div className="newsCard row" onClick={this.openNewsLink.bind(this, this.props.new.source.enriched.url.url)}>
				<div className="col-md-3 newsImgMargin" >
					{this.props.new.source.enriched.url.image?<img className="img-responsive" src={this.props.new.source.enriched.url.image} />:null}
				</div>
			    <div className="col-md-9" id="newsText">
				    <h4>{this.props.new.source.enriched.url.title}</h4>
				    <p className="newsDescriptionColor">{this.props.new.source.enriched.url.text}</p>
				</div>
			</div>
		);
	}
});

module.exports = NewsCard;