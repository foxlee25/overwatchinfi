var axios = require('axios');

var service = {
	getHeros: function(){
		return axios.get('/heros/allheros');
	}
};

module.exports = service;