var express = require('express'),
	http = require('http'),
	route = require('./routes/route'),
	bodyParser = require('body-parser'),
	session = require('express-session');
	
var app = express();
var server = http.createServer(app);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.use(bodyParser());
app.use(session({secret: "mySecretCode!!"}));


app.get("/", function(req, res){
	route.index(req, res);
});

app.post("/signUp", function(req, res){
	route.signUp(req, res);
});

app.post("/signIn", function(req, res){
	route.signIn(req, res);
});

app.get("/home", function(req, res){
	route.home(req, res);
});

app.get("/logout", function(req, res){
	route.logOut(req, res);
});

app.post("/available", function(req, res){
	route.available(req, res);
});

app.post("/like", function(req, res){
	route.like(req, res);
})

app.post("/unlike", function(req, res){
	route.unlike(req, res);
})

app.post("/removeUnLike", function(req, res){
	route.removeunlike(req, res);
})

app.post("/removeLike", function(req, res){
	route.removelike(req, res);
})

app.post("/post", function(req, res){
	route.post(req, res);
})

app.post("/getPostsOnFly", function(req, res){
	route.getPosts(req, res);
})

app.post("/comment", function(req, res){
	route.addComment(req, res);
})

app.use(express.static(__dirname + "/public"));

// This must be last one otherwise it will route any other requests
// even for static files!!
app.get("*", function(req, res){
	res.send("<h1>404: Page not found</h1>");
});

server.listen(port, ip, function(){
	console.log("-----------------------------------");
	console.log("Server listening to port 3000");
	console.log("-----------------------------------");
});