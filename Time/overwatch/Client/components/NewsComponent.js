var React = require('react');
var AjaxService = require('../service/AjaxService');
var _  = require('underscore');
var NewsCard = require('../views/NewsCard');

var News = React.createClass({
	getInitialState: function(){
		return {
			news: []
		};
	},
	getNews: function(index){
		//client side call to get dingdang news
		//!important need to call forceudpate to update UI
		AjaxService.get('/news/allNews', function(response){
			if(response instanceof Error){
				console.error("Can't get news data");
				return;
			}

			this.state.news = response.data;
			console.table(this.state.news);
			this.forceUpdate();
			window.scrollTo(0, 0);			
		}.bind(this));
	},
	componentDidMount: function(){
		//call this when first launch
		this.getNews(1);
	},
	render: function(){
		return (
			<div>
				<div id="newsComponent" className="container">
					<div className="marketing">
					{_.map(this.state.news, function(item){
						return(<NewsCard key={item.id} new={item} />);
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