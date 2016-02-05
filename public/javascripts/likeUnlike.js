xmlHttp = new XMLHttpRequest();
var elem;

xmlHttp.onreadystatechange = function(){
	if(xmlHttp.readyState == 4) {
		console.log("Yo");
		var res = JSON.parse(xmlHttp.responseText);
		if(res.likes + 1){
			if(elem.className == "noOfLikes"){
				elem.innerHTML = '<i class = "fa fa-thumbs-o-up"></i>' + res.likes;
				elem.className = "noOfLikes noOfLiked";
				elem.nextSibling.className = "noOfUnLikes noOfUnLikesNotAllow";
			}

			else if(elem.className == "noOfLikes noOfLiked"){
				elem.innerHTML = '<i class = "fa fa-thumbs-o-up"></i>' + res.likes;
				elem.className = "noOfLikes";
				elem.nextSibling.className = "noOfUnLikes";
			}
		}
		else if(res.unlikes + 1){
			if(elem.className == "noOfUnLikes"){
				elem.innerHTML = '<i class = "fa fa-thumbs-o-down"></i>' + res.unlikes;
				elem.className = "noOfUnLikes noOfUnLiked";
				elem.previousSibling.className = "noOfLikes noOfLikesNotAllow";
			}

			else if(elem.className == "noOfUnLikes noOfUnLiked"){
				elem.innerHTML = '<i class = "fa fa-thumbs-o-down"></i>' + res.unlikes;
				elem.className = "noOfUnLikes";
				elem.previousSibling.className = "noOfLikes";
			}
		}
	}
}

	var len = document.getElementsByClassName("noOfLikes").length;
	for(i=0; i<len; i++){
		document.getElementsByClassName("noOfLikes")[i].addEventListener("click", callLike, false);
		document.getElementsByClassName("noOfUnLikes")[i].addEventListener("click", callUnLike, false);
	}

function callLike(req, res){
	elem = this;
	var id = this.parentNode.parentNode.getElementsByTagName("input")[0].value;
	if(this.className == "noOfLikes"){
		xmlHttp.open("POST", "/like");
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlHttp.send("id=" + String(id));
	}

	else if(this.className == "noOfLikes noOfLiked"){
		xmlHttp.open("POST", "/removeLike");
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlHttp.send("id=" + String(id));
	}
}

function callUnLike(req, res){
	elem = this;
	var id = this.parentNode.parentNode.getElementsByTagName("input")[0].value;
	if(this.className == "noOfUnLikes"){
		xmlHttp.open("POST", "/unlike");
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlHttp.send("id=" + String(id));
	}

	else if(this.className == "noOfUnLikes noOfUnLiked"){
		xmlHttp.open("POST", "/removeUnLike");
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlHttp.send("id=" + String(id));
	}
}