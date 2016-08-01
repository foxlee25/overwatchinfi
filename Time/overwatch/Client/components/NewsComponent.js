var React = require('react');
var AjaxService = require('../service/AjaxService');
var _  = require('underscore');
var NewsCard = require('../views/NewsCard');
var $ = require('jquery');
var News = React.createClass({
	getInitialState: function(){
		window.localStorage.setItem('currentPage', 'news');

		return {
			news: [],
			page: []
		};
	},
	getNews: function(){
		//client side call to get dingdang news
		//!important need to call forceudpate to update UI
		AjaxService.get('/news/allNews', function(response){
			if(response instanceof Error){
				console.error("Can't get news data");
				return;
			}

			this.state.news = response.data;
			console.table(this.state.news);	
			this.pagination(1);		
		}.bind(this));
	},
	componentDidMount: function(){
		//call this when first launch
		this.getNews();
	},
	componentWillMount: function(){
		this.state.userId = window.sessionStorage.getItem('userId');
	},
	pagination: function(index){
		this.state.page = this.state.news.slice((index-1)*10, index*10);
		this.forceUpdate();
		window.scrollTo(0, 0);
	},
	submitNews: function(){
		//TODO need add model
		var url = '/news/addNews';
		var news = {};
		news.id= new Date();
		news.source = {};
		news.source.enriched = {};
		news.source.enriched.url = {};
		news.source.enriched.url.text  =  $('#adminaddNews').find('textarea[name="newsDetails"]').val();
		news.source.enriched.url.url  =  $('#adminaddNews').find('input[name="newsURL"]').val();
		news.source.enriched.url.image =  $('#adminaddNews').find('input[name="newsImageURL"]').val();
		news.source.enriched.url.title =  $('#adminaddNews').find('input[name="newsTitle"]').val();
		if(news.source.enriched.url.title){
			AjaxService.post(url,{data :news});
			setTimeout(function(){ window.location.reload(true); }, 2000);
		}

	},
	render: function(){
		return (
			<div>
				{this.state.userId==='admin'?<div id="adminaddNews"><div  className="form-inline">
		            <input name="newsTitle" type="text" className="form-control youtubevideoinput"  placeholder="Title" />
					<input name="newsImageURL" type="text" className="form-control youtubevideoinput"  placeholder="Image URL(option) " />
		            <input name="newsURL" type="text" className="form-control youtubevideoinput"  placeholder="News URL(option)" />
                    </div>
			<textarea className="form-control" name="newsDetails" placeholder="News Details.."></textarea>
			<button onClick={this.submitNews.bind(this)}  name="newsSubmit" className="btn btn-primary" >Submit</button></div>:<div></div>}
				<div id="newsComponent" >
					<div className="marketing">
					{_.map(this.state.page, function(item){
						return(<NewsCard key={item.id} new={item} />);
					}.bind(this))}
					</div>
				</div>
				{this.state.news.length>0?				
				<nav className="pagin col-sm-offset-5 col-sm-6">
				  <ul className="pagination">
				  	  <li><a onClick={this.pagination.bind(this, 1)}>1</a></li>
			  	  	  <li><a onClick={this.pagination.bind(this, 2)}>2</a></li>
			  	  	  <li><a onClick={this.pagination.bind(this, 3)}>3</a></li>
			  	  	  <li><a onClick={this.pagination.bind(this, 4)}>4</a></li>
			  	  	  <li><a onClick={this.pagination.bind(this, 5)}>5</a></li>
				  </ul>
				</nav>:null}
			</div>
		);
	}
});

module.exports = News;