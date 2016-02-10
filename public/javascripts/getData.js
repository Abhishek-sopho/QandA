

// Updating Posts on the fly!
// I will send AJAX request every 5 seconds
// to fetch newer data that has been posted!

var getData = new XMLHttpRequest(),
	getAns = new XMLHttpRequest();

getData.onreadystatechange = function(){
	if(getData.readyState == 4){
		var res = JSON.parse(getData.responseText).newPosts;
		appendPost(res);
		appendLikesAndUnlikes(JSON.parse(getData.responseText).likes);
		setTimeout(getPosts, 5000);
	}
};

window.addEventListener("load", function(event){
	setTimeout(getPosts, 5000);
}, false);


//Updating Posts!
function getPosts(){
	var divQues = document.getElementsByClassName("divQues")[0];
	if(divQues != undefined)
		var elem = divQues.getElementsByTagName("input")[1];
	var latestDate = (!elem)?0:elem.value;
	getData.open("POST", "/getPostsOnFly");
	getData.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	getData.send("latestDate=" + latestDate);
}

function appendPost(res){
	for(var x in res){
			var div = document.createElement("div");
			div.className = "divQues";
			var date = new Date(Number(res[x].date));

			if(res[x].likedBy.indexOf(username) != -1){
				var contentLike = '<div class = "otherDetails"><div class = "noOfLikes noOfLiked"><i class = "fa fa-thumbs-o-up"></i>' + res[x].likes + '</div><div class = "noOfUnLikes noOfUnLikesNotAllow"><i class = "fa fa-thumbs-o-down"></i>' +  res[x].unlikes + '</div></div>';
			}

			else {
				if(res[x].unlikedBy.indexOf(username) != -1){
					var contentLike = '<div class = "otherDetails"><div class = "noOfLikes noOfLikesNotAllow"><i class = "fa fa-thumbs-o-up"></i>' + res[x].likes + '</div><div class = "noOfUnLikes noOfUnLiked"><i class = "fa fa-thumbs-o-down"></i>' +  res[x].unlikes + '</div></div>';
				}

				else {
					var contentLike = '<div class = "otherDetails"><div class = "noOfLikes"><i class = "fa fa-thumbs-o-up"></i>' + res[x].likes + '</div><div class = "noOfUnLikes"><i class = "fa fa-thumbs-o-down"></i>' +  res[x].unlikes + '</div></div>';
				}
			}

			if(res[x].comments.length == 0){
				var contentComment = '<div class = "divAnswers"><span class = "noAnswer"> No Answers/Comments Yet </span></div>';
			}

			var contentHidden = '<input type = "hidden" value = "' + res[x]._id + '" class = "' + res[x]._id + '">\n<input type = "hidden" value = "' + res[x].date + '">',
				contentPost = '<div class = "postStatement"> ' + res[x].post + '</div>',
				contentAuthor = '<div class = "authorDetails">Posted By <b>' + res[x].author + '</b> on <b>' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' at ' + date.getHours() + ':' + date.getMinutes() + '</b></div>',
				writeComment = '<div class = "writeComment"><form action = "#" action = "POST" class = "formAnswer"><textarea class = "answerToPost" placeholder = "Comment or Answer..." name = "answerToPost"></textarea><br><input type = "submit" value = "Answer" class = "submitAnswer"><input type = "reset" value = "Clear" class = "clearAnswer"></form></div>';

			div.innerHTML = contentHidden + contentPost + contentAuthor + contentLike + contentComment + writeComment;
			div.addEventListener("click", bringAnswers, false);
			document.getElementById("divBody").insertBefore(div, document.getElementsByClassName("divQues")[0]);
			document.getElementsByClassName("noOfLikes")[0].addEventListener("click", callLike, false);
			document.getElementsByClassName("noOfUnLikes")[0].addEventListener("click", callUnLike, false);
		}
}

function appendLikesAndUnlikes(res){
	for(var x in res){
		var parent = document.getElementsByClassName(res[x]._id)[0].parentNode;
		parent.getElementsByClassName("noOfLikes")[0].innerHTML = '<i class = "fa fa-thumbs-o-up"></i>' + res[x].likes;
		parent.getElementsByClassName("noOfUnLikes")[0].innerHTML = '<i class = "fa fa-thumbs-o-down"></i>' + res[x].unlikes;
	}
}

//Updating Answers/Comments
getAns.onreadystatechange = function(){
	if(getAns.readyState == 4){
		appendNewAns(getAns.responseText);
		countAns += 1;
		setTimeout(getAnswers, 2000);
	}
};

var countAns = 0;

function getAnswers(){
	var divQues = document.getElementsByClassName("divQues");
		if(countAns > divQues.length - 1)
			countAns = 0;
		divQues = divQues[countAns];
		postId = divQues.getElementsByTagName("input")[0].value;
		ans = divQues.getElementsByClassName("divAnswers")[0].getElementsByClassName("answers");
		len = ans.length;
		if(len == 0)
			ans = 0;
		else
			ans = ans[len - 1].getElementsByTagName("input")[0].value;
	
	getAns.open("POST", "/getAnswersOnFly");
	getAns.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	getAns.send("postId=" + postId + "&lastComment=" + ans);
}

function appendNewAns(newAns){
	newAns = (JSON.parse(newAns)).newData;
	var elem = document.getElementsByClassName(newAns[i]._id)[0].parentNode;
	
	for(var i = 0; i < newAns.comments.length; i++){

		var div = docment.createChild("div");
		div.className = "answers";
		div.innerHTML = "<input type = 'hidden' value = 'newAns[i].comments.'"
	}
}