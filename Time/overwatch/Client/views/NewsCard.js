var React = require('react');

var NewsCard = React.createClass({
	getInitialState: function(){
		return {};
	},
	openNewsLink: function(link){
		window.open(link);
	},
	render: function(){
		return (
			<div className="newsCard row" onClick={this.openNewsLink.bind(this, this.props.new.url)}>
				<div className="col-md-3 newsImgMargin" >
					{this.props.new.iurl?<img className="img-responsive" src={this.props.new.iurl} />:null}
				</div>
			    <div className="col-md-9" id="newsText">
				    <h4>{this.props.new.title}</h4>
				    <p className="newsDescriptionColor">{this.props.new.kwic}</p>
				    {this.props.new.author?<p id="author">author {this.props.new.author}</p>:null}
				    {this.props.new.domain?<p id="domain">{this.props.new.domain}</p>:null}
				</div>
			</div>
		);
	}
});

module.exports = NewsCard;