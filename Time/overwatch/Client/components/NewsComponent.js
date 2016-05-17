var React = require('react');
var HttpService = require('../service/HttpService');
var _  = require('underscore');
var NewsCard = require('../views/NewsCard');

var News = React.createClass({
	getInitialState: function(){
		return {
			news: []
		};
	},
	getNews: function(index){
		HttpService.getDingDangNews(index).then(function(response){
			this.state.news = response.data.results;
			this.forceUpdate();
			window.scrollTo(0, 0);
		}.bind(this)).catch(function(response){
			console.error(response);
		});
	},
	componentDidMount: function(){
		this.getNews(1);
	},
	render: function(){
		return (
			<div>
				<div id="newsComponent" className="container">
					<div className="marketing">
					{_.map(this.state.news, function(item){
						return(<NewsCard key={item.url} new={item} />);
					}.bind(this))}
					</div>
				</div>
				<nav className="pagin col-sm-offset-5 col-sm-6">
				  <ul className="pagination">
				  	  <li><a onClick={this.getNews.bind(this, 1)}>1</a></li>
			  	  	  <li><a onClick={this.getNews.bind(this, 11)}>2</a></li>
			  	  	  <li><a onClick={this.getNews.bind(this, 21)}>3</a></li>
			  	  	  <li><a onClick={this.getNews.bind(this, 31)}>4</a></li>
			  	  	  <li><a onClick={this.getNews.bind(this, 41)}>5</a></li>
				  </ul>
				</nav>
			</div>
		);
	}
});

module.exports = News;