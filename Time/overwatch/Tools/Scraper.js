'use strict'
var xRay = require('x-ray');
var fs = require('fs');
var async = require('async');
fs.readFile('../Json/heros.json', 'utf8', function (err, data) {
    if (err) {
        return;
    }

    var result = [];
    var xray = new xRay();
    var dataArr = JSON.parse(data);
    (function(){
	    //get the bio
	    var descriptionFunc = [];
	    dataArr.forEach(function(element){
			let name = element['heroname'].replace(":","-");
	    	let url = 'https://playoverwatch.com/en-us/heroes/'+name.toLowerCase()+'/';
	    	descriptionFunc.push(xray(url,
	    	 {
	    	 	poster: '.hero-image@src',
	    	 	description:['.hero-bio-backstory p'],
	    	 	role: '.hero-detail-role h4',
	    	 	overview: '.hero-detail-wrapper p',
	    	 	bio: {
	    	 		realname: '.name span',
	    	 		occupation: '.occupation span',
	    	 		base: '.base span',
	    	 		affiliation: '.affiliation span'
	    	 	},
	    	 	abilities: {
	    	 		name: ['.hero-ability-descriptor h4'],
	    	 		desc: ['.hero-ability-descriptor p']
	    	 	}
	    	 })(function(err, data){
	    	 	data['_id'] = element['heroname'].toLowerCase();
	    		result.push(data);
	    	}));
	    });

	    async.parallel(descriptionFunc, function(){
	    	fs.writeFile('../Json/scrape.json', JSON.stringify(result));
	    });
	})();


});		