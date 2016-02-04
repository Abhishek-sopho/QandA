var mongoClient = require('mongodb').MongoClient;

exports.showQues = function(req, res){
	allPosts = [];
	mongoClient.connect("mongodb://127.0.0.1:27017/testLogin", function(err, db){
		if(err){
			console.log("Error connecting to db!!");
			res.send("Out for maintainance!");
		}

		else {
			var cursor = db.collection('posts').find();
			cursor.each(function(err, doc){
				if(doc != null){
					allPosts.push(doc);
				}
				if(doc == null){
					db.close();
					res.render("home", {"posts": allPosts});
				}
			});
		}
	});
}