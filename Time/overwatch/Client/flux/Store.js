var Dispatcher = require('./Dispatcher');
var Constants = require('./Constants');
var assign = require('object-assign');
var emitter = require('events').EventEmitter;

var EVENT = "CAHNGE";

var loginData = {};

function _setLoginData(data){
	loginData = data;
}

function _getLoginData(){
	return loginData;
}

var AppStore = assign(emitter.prototype, {
	getLoginData: function(){
		return _getLoginData();
	},
	emitChange: function(){
		this.emit(EVENT);
	},
	addListener: function(callback){
		this.on(EVENT, callback);
	},
	removeListener: function(callback){
		this.removeListener(EVENT, callback);
	},
	dispatcherIndex: Dispatcher.register(function(payLoad){
		var action = payLoad.action;
		switch(action.actionType){
			case Constants.loginSuccess:
				_setLoginData(action.data);
		}

		AppStore.emitChange();
		return true;
	})
});

module.exports = AppStore;