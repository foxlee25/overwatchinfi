var axios = require('axios');

var service = {
	getHeros: function(){
		return axios.get('/heros/allheros');
	},
	getDingDangNews: function(index) {
		return axios({
			method: 'get',
			url: '/news/allDingDangNews',
			headers: {pagination: index, language: 'en'}
		});
	},
	getTwits: function(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 

		today = yyyy+'-'+mm+'-'+dd;
		return axios({
			method: 'get',
			url: '/twits/allTwits',
			headers: {q: 'overwatch since:'+today, count: 50}
		});
	}
};

module.exports = service;