var mongoClient = require('mongodb').MongoClient;

exports.showQues = function(req, res){
	allPosts = [];
	mongoClient.connect("mongodb://127.0.0.1:27017/testLogin", function(err, db){
		if(err){
			console.log("Error connecting to db!!");
			res.send("Out for maintainance!");
		}

		else {
			var cursor = db.collection('posts').find().sort({"date": -1});
			cursor.each(function(err, doc){
				if(doc != null){
					allPosts.push(doc);
				}
				if(doc == null){
					db.close();
					res.render("home", {"posts": allPosts, "user": req.session.user});
				}
			});
		}
	});
}

exports.showPostsOnFly = function(req, res){
	var latestDate = req.body.latestDate;
	var newPosts = [], likes = [], comments = [];
	mongoClient.connect("mongodb://127.0.0.1:27017/testLogin", function(err, db){
		if(err){
			res.send({"newPosts": newPosts, "likes": likes, "comments": comments});
		}

		else {
			var cursor = db.collection("posts").find({date: {$gt: String(latestDate)}});
			cursor.each(function(err, doc){
				if(err){
					res.send({"newPosts": newPosts, "likes": likes, "comments": comments});
					db.close();
				}

				else if(doc!=null){
					newPosts.push(doc);
				}

				else {
					cursor = db.collection("posts").find({date: {$lte :String(latestDate)}}).sort({"date": -1});
					cursor.each(function(err, doc){
						if(err){
							res.send({"newPosts": newPosts, "likes": likes, "comments": comments});
							db.close();
						}

						else if(doc!=null){
							likes.push({"_id": doc._id, "likes": doc.likes, "unlikes": doc.unlikes});
							comments.push({"_id": doc._id, "comments": doc.comments});
						}

						else {
							res.send({"newPosts": newPosts, "likes": likes, "comments": comments});
							db.close();
						}
					});
				}
			})
		}
	});
}