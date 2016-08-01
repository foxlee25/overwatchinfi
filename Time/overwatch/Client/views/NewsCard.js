var React = require('react');
var AjaxService = require('../service/AjaxService');
var NewsCard = React.createClass({
	getInitialState: function(){
		return {};
	},
	openNewsLink: function(link){
		window.open(link);
	},
	componentWillMount: function(){
		this.state.userId = window.sessionStorage.getItem('userId');
		if(this.props.new.source.enriched.url.text.length > 500){
			this.props.new.source.enriched.url.text = this.props.new.source.enriched.url.text.substring(0, 500)+"...";
		}
	},
	removeNews: function(newsId, e){
		var url = '/news/removeNews';
		AjaxService.post(url,{data: {newsId : newsId}});
		window.location.reload(true);
		e.preventDefault();
		e.stopPropagation();
	},
	propTypes: {
		new: React.PropTypes.object
	},
	render: function(){
		return (
			<div id={this.props.new.id} className="newsCard row" onClick={this.openNewsLink.bind(this, this.props.new.source.enriched.url.url)}>
		{this.state.userId==='admin'?<div onClick={this.removeNews.bind(this, this.props.new.id)} className="glyphicon glyphicon-remove-circle news-remove-icon"></div>:<div></div>}
		        <div className="col-md-3 newsImgMargin" >
					{this.props.new.source.enriched.url.image?<img className="img-responsive" src={this.props.new.source.enriched.url.image} />:<img className="img-responsive" src={"./img/icon/logo.jpg"} />}
				</div>
			    <div className="col-md-9">
				    <h4>{this.props.new.source.enriched.url.title}</h4>
				    <p className="newsDescriptionColor">{this.props.new.source.enriched.url.text}</p>
				</div>
			</div>
		);
	}
});

module.exports = NewsCard;