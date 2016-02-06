
var mongoClient = require('mongodb').MongoClient,
	bcrypt = require('bcrypt'), availabe = true,
	show = require("./showPosts");

exports.index = function(req, res){
	if(req.session.user){
		res.redirect("/home");
	}
	else{
		if(!req.session.content){
			res.render("index", {"content": true, "form": req.session.form, "user": ""});
			req.session.destroy();
		}
		else{
			res.render("index", {"content": req.session.content, "form": req.session.form, "user": req.session.userError});
			req.session.destroy();
		}
	}
}

exports.signUp = function(req, res){
	mongoClient.connect("mongodb://127.0.0.1:27017/testLogin", function(err, db){
		if(err){
			res.end("error bro!!" + err);
		}

		else {
			var user = {
				username: req.body.usernameSignUp,
				pass: req.body.passwordSignUp,
				email: req.body.email,
			};

			bcrypt.genSalt(10, function(err, salt){
				bcrypt.hash(user.pass, salt, function(err, hash){
					user.pass = hash;

					db.collection('users').find({"username": user.username}).count(function(err, val){
						if(val == 0){
							db.collection('users').insertOne(user, function(err, result){
								if(err){
									res.end("OH CRAP!!! SOME INTERNAL ERROR");
									db.close();
								}

								else {
									db.close();
									req.session.user = user.username; //Login the user into his/her account and set the session
									res.redirect("/home");
								}
							});
						}

						else {
							db.close();
							req.session.content = "Usrname already Taken!";
							req.session.form = "signUp";
							res.redirect("/")
						}
					});
				});
			});
		}
	});
}

exports.signIn = function(req, res){
	mongoClient.connect("mongodb://127.0.0.1:27017/testLogin", function(err, db){
		if(err){
			res.end("Error signing in" + err);
		}

		else {
			var user = {
				username: req.body.usernameSignIn,
				password: req.body.passwordSignIn
			}
				
			db.collection('users').find({"username": user.username}).count(function(err, count){
				if(count == 0){
					db.close();
					req.session.content = "Wrong Username or Password!";
					req.session.form = "signIn";
					req.session.userError = user.username;
					res.redirect("/")
				}

				else {
					var cursor = db.collection('users').find({"username": user.username})
					cursor.each(function(err, doc){
						if(err){
							res.end("Some internal error!");
							db.close();
						}
						else {
							if(doc != null){
								bcrypt.compare(user.password, doc.pass, function(err, log){
									if(log == true){
										req.session.user = user.username; //Login the user into his/her account and set the session
										res.redirect("/home");
										db.close();
									}
									else {
										req.session.content = "Wrong Username or Password!";
										req.session.form = "signIn";
										req.session.userError = user.username;
										res.redirect("/");
										db.close();
									}
								});
							}
							else {
								db.close();
							}
						}
					});
				}
			});
		}
	});
};

exports.home = function(req, res){
	if(req.session.user){
		show.showQues(req, res);
	}
	else
		res.redirect("/");
};

exports.logOut = function(req, res){
	req.session.destroy();
	res.redirect("/");
}

exports.available = function(req, res){
	mongoClient.connect("mongodb://127.0.0.1:27017/testLogin", function(err, db){
		if(req.body.check == "email"){
			db.collection("users").find({"email": req.body.email}).count(function(err, val){
				if(val == 0){
					res.end(JSON.stringify({"output": "true", "check": "email"}));
					db.close();
				}
				else {
					res.end(JSON.stringify({"output": "false", "check": "email"}));
					db.close();
				}
			});
		}
		else if(req.body.check == "username"){
			db.collection("users").find({"username": req.body.username}).count(function(err, val){
				if(val == 0){
					res.end(JSON.stringify({"output": "true", "check": "username"}));
					db.close();
				}
				else {
					res.end(JSON.stringify({"output": "false", "check": "username"}));
					db.close();
				}
			});
		}
	});
}

exports.like = function(req, res){
	var id = req.body.id;
	mongoClient.connect("mongodb://127.0.0.1:27017/testLogin", function(err, db){
		if(err)
			res.send("" + false);
		else {
			db.collection("posts").update({"_id": id}, {$inc: {likes: 1}, $push: {likedBy: req.session.user}}, function(err, result){
				if(err){
					db.close();
					res.send("" + false)
				}
				else{
					var cursor = db.collection("posts").find({"_id": id});
					cursor.each(function(err, doc){
						if(doc!=null){
							res.send({"likes" : doc.likes});
						}
						else {
							db.close();
						}
					})
				}
			});
			
		}
	});
}

exports.unlike = function(req, res){
	var id = req.body.id;
	mongoClient.connect("mongodb://127.0.0.1:27017/testLogin", function(err, db){
		if(err)
			res.send("" + false);
		else {
			db.collection("posts").update({"_id": id}, {$inc: {unlikes: 1}, $push: {unlikedBy: req.session.user}}, function(err, result){
				if(err){
					db.close();
					res.send("" + false)
				}
				else{
					var cursor = db.collection("posts").find({"_id": id});
					cursor.each(function(err, doc){
						if(doc!=null){
							res.send({"unlikes": doc.unlikes});
						}
						else {
							db.close();
						}
					})
				}
			});
			
		}
	});
}

exports.removelike = function(req, res){
	var id = req.body.id;
	mongoClient.connect("mongodb://127.0.0.1:27017/testLogin", function(err, db){
		if(err)
			res.send("" + false);
		else {
			db.collection("posts").update({"_id": id}, {$pull: {"likedBy": req.session.user}, $inc: {"likes": -1}}, function(err, result){
				if(err){
					db.close();
					res.send("" + false)
				}
				else{
					var cursor = db.collection("posts").find({"_id": id});
					cursor.each(function(err, doc){
						if(doc!=null){
							res.send({"likes" : doc.likes});
						}
						else {
							db.close();
						}
					})
				}
			});
			
		}
	});
}

exports.removeunlike = function(req, res){
	var id = req.body.id;
	mongoClient.connect("mongodb://127.0.0.1:27017/testLogin", function(err, db){
		if(err)
			res.send("" + false);
		else {
			db.collection("posts").update({"_id": id}, {$inc: {unlikes: -1}, $pull: {unlikedBy: req.session.user}}, function(err, result){
				if(err){
					db.close();
					res.send("" + false)
				}
				else{
					var cursor = db.collection("posts").find({"_id": id});
					cursor.each(function(err, doc){
						if(doc!=null){
							res.send({"unlikes": doc.unlikes});
						}
						else {
							db.close();
						}
					})
				}
			});
			
		}
	});
}

exports.post = function(req, res){
	mongoClient.connect("mongodb://127.0.0.1:27017/testLogin", function(err, db){
		if(err){
			res.send("" + false);
		}

		else {
			var post = {
				"_id": Math.floor((Math.random()*99999999999) + 11111111111111) + "",
				"post": req.body.data,
				"date": req.body.time,
				"author": req.session.user,
				"likes": 0,
				"unlikes": 0,
				"likedBy": [],
				"unlikedBy": [],
				"comments": []
			}
			db.collection("posts").insertOne(post, function(err, r){
				if(err){
					console.log("Unable to POST!! " + err);
					db.close();
				}

				else {
					res.send("Success");
					db.close();
				}
			})
		}
	})
}

exports.getPosts = function(req, res){
	if(req.session.user){
		show.showPostsOnFly(req, res);
	}
	else
		res.redirect("/");
}