var Dispatcher = require('./Dispatcher');
var Constants = require('./Constants');
var assign = require('object-assign');
var emitter = require('events').EventEmitter;

var EVENT = "CAHNGE";

var loginData = {};
var videoData = {};
var heroId = '';

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
				AppStore.emitChange();
				break;
			case Constants.videoData:
				_setVideoData(action.data);
				break;
			case Constants.setHeroId:
				_setHeroId(action.data);
				break;
		}

		return true;
	})
});

module.exports = AppStore;