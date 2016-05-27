var axios = require('axios');

var service = {
    rest: function(options,callback){
        axios(options).then(function (response) {
               console.log('request : ' + options.url);
               if (typeof callback === 'function') {
                   callback(response);
               }
           }).catch(function (response) {
              service.error(options.url,response);
           });
    },
    get: function (url, callback) {
           axios.get(url).then(function (response) {
               console.log('get request : ' + url);
               if (typeof callback === 'function') {
                   callback(response);
               }
           }).catch(function (response) {
               service.error(url,response);
           });
    },
    post:function(url,data,callback){
        if(!data)
            data = {};
          axios.post(url,data).then(function (response) {
               console.log('post request : ' + url);
               if (typeof callback === 'function') {
                   callback(response);
               }
           }).catch(function (response) {
              service.error(url,response);
           });
    },
    error : function(url,response){
        console.log('request : ' + url);
        if (response instanceof Error) {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', response.message);
        } else {
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            console.log(response.data);
            console.log(response.status);
            console.log(response.headers);
            console.log(response.config);
        }
    }
}

module.exports = service;