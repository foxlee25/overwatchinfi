var Dispatcher = require('./Dispatcher');
var Constants = require('./Constants');
var assign = require('object-assign');
var emitter = require('events').EventEmitter;

var EVENT = "CAHNGE";
var TOAST = "TOAST";

var loginData = {};
var videoData = {};
var heroId = '';
var message = '';

function _setLoginData(data){
	loginData = data;
}

function _getLoginData(){
	return loginData;
}

function _setVideoData(data){
	videoData = data;
}

function _getVideoData(){
	return videoData;
}

function _setHeroId(id){
	heroId = id;
}

function _getHeroId(){
	return heroId;
}

function _setToastMessage(data){
	message = data;
}

function _getToastMessage(){
	return message;
}

var AppStore = assign(emitter.prototype, {
	getLoginData: function(){
		return _getLoginData();
	},
	getVideoData: function(){
		return _getVideoData();
	},
	getHeroId: function(){
		return _getHeroId();
	},
	getToastMessage: function(){
		return _getToastMessage();
	},
	emitChange: function(type){
		this.emit(type);
	},
	addListener: function(type, callback){
		switch (type){
			case EVENT:
				this.on(EVENT, callback);
				break;
			case TOAST:
				this.on(TOAST, callback);
				break;
		}

	},
	removeListener: function(type, callback){
		switch (type){
			case EVENT:
				this.removeListener(EVENT, callback);
				break;
			case TOAST:
				this.removeListener(TOAST, callback);
				break;
		}
	},
	dispatcherIndex: Dispatcher.register(function(payLoad){
		var action = payLoad.action;
		switch(action.actionType){
			case Constants.loginSuccess:
				_setLoginData(action.data);
				AppStore.emitChange(EVENT);
				break;
			case Constants.videoData:
				_setVideoData(action.data);
				break;
			case Constants.setHeroId:
				_setHeroId(action.data);
				break;
			case Constants.toast:
				_setToastMessage(action.data);
				AppStore.emitChange(TOAST);
				break;
		}

		return true;
	})
});

module.exports = AppStore;