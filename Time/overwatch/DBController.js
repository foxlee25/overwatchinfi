/******* start DB Module ********/
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
//use on local
//var url = 'mongodb://localhost:27017/local';
//!! ec2 test environment !!
var url = 'mongodb://ec2-52-39-92-64.us-west-2.compute.amazonaws.com:27017/overwatch';
//!! ec2 production environment. !!
//var url = 'mongodb://ec2-52-36-229-82.us-west-2.compute.amazonaws.com:27017/overwatch';
//use on ec2 admin
//var url = 'mongodb://admin:linxi521@ec2-52-36-229-82.us-west-2.compute.amazonaws.com:27017/admin';
var DBConnection;


/**
 * will reuse connection if already created
 */
var DBController = {};
DBController.getConnection = function (callback) {
    if (DBConnection === undefined) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                //request to mongo success
                DBConnection = db;
                console.log('DBConnection...');
                callback(DBConnection);
            }

        });
    } else {
        callback(DBConnection);
    }

}



/**** the global Service object.A service may contain multiple DB request ****/
module.exports = DBController;