
xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function(){
	if(xmlHttp.readyState == 4) {
		var res = JSON.parse(xmlHttp.responseText);
		if(res.likes){
			document.getElementsByClassName("noOfLikes")[0].innerHTML = '<i class = "fa fa-thumbs-o-up"></i>' + res.likes;
		}
		else if(res.unlikes){
			document.getElementsByClassName("noOfUnLikes")[0].innerHTML = '<i class = "fa fa-thumbs-o-down"></i>' + res.unlikes;
		}
	}
}

document.getElementsByClassName("noOfLikes")[0].addEventListener("click", function(req, res){
	var id = this.parentNode.parentNode.getElementsByTagName("input")[0].value;
	xmlHttp.open("POST", "/like");
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.send("id=" + id);
});

document.getElementsByClassName("noOfUnLikes")[0].addEventListener("click", function(req, res){
	var id = this.parentNode.parentNode.getElementsByTagName("input")[0].value;
	xmlHttp.open("POST", "/unlike");
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.send("id=" + id);
});