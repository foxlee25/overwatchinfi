var constants = require('./Constants');
var dispatcher = require('./Dispatcher');

var AppAction = {
	loginSuccess: function(loginData){
		dispatcher.handleViewAction({
			actionType: constants.loginSuccess,
			data: loginData
		});
	},
	videoData: function(videoData){
		dispatcher.handleViewAction({
			actionType: constants.videoData,
			data: videoData
		});
	},
	setHeroId: function(id){
		dispatcher.handleViewAction({
			actionType: constants.setHeroId,
			data: id
		});
	}
};

module.exports = AppAction;