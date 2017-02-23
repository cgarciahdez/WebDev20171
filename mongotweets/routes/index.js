var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

/* GET home page. */
console.log("hello?");
router.get('/', function(req, res, next) {
    var fs = require('fs');
    var tw;
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");


        fs.readFile('./public/tweets.json', 'utf8', function(err, data) {
            if (err) throw err;
            //console.log(data);
            var json = JSON.parse(data);

            db.collection('documents').drop(function() {
                insertDocuments(db, json, function() {
                    findDocuments(db, function(dat) { //PERO PORQUEEEE NO ERRRRREERERERERER
                        console.log("data?");
                        console.log(dat);
                        res.render('index', { title: 'Tweets', tweets: dat });
                        db.close();
                    });
                });
            });

        });





    });



});



var insertDocuments = function(db, json, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insert(json, function(err, doc) {
        if (err) throw err;
        callback(doc);
    });
}



var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        //console.log("Found the following records");
        //console.log(docs[0]["text"]);
        for (var i=0;i<docs.length;i++){
            //console.log(docs[i]["text"]);
        }
        callback(docs);
    });
}

module.exports = router;
