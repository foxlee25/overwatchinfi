var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'Client/public');
var APP_DIR = path.resolve(__dirname, 'Client');
var BOWER_DIR = path.resolve(__dirname, 'Client/bower_components')

var config = {
  entry: APP_DIR + '/app.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        exclude : BOWER_DIR,
        loader : 'babel'
      }
    ]
  }
};

module.exports = config;