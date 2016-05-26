var constants = require('./Constants');
var dispatcher = require('./Dispatcher');

var AppAction = {
	loginSuccess: function(loginData){
		dispatcher.handleViewAction({
			actionType: constants.loginSuccess,
			data: loginData
		});
	}
};

module.exports = AppAction;