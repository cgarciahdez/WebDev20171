var express = require('express');
var router = express.Router();

/* GET home page. */
console.log("hello?");
router.get('/', function(req, res, next) {
    var fs = require('fs');
    var obj;
    
    fs.readFile('./public/tweets.json', 'utf8', function(err, data) {
        console.log("holi");
        if (err) throw err;
        //console.log(err);
        //console.log(data);
        obj = JSON.parse(data);
        //console.log(obj);
        res.render('index', { 
        	title: 'Tweets' ,
        	tweets: obj
        });
    });
    
});

module.exports = router;
