var postHttp = new XMLHttpRequest();

postHttp.onreadystatechange = function(){
	if(postHttp.readyState == 4){
		document.getElementsByClassName("textToPost")[0].value = "";
		getPosts();
	}
};

document.getElementsByClassName("formPost")[0].addEventListener("submit", function(event){
	var data = this.textToPost.value;
	var time = new Date();
	if(data.trim){
		postHttp.open("POST", "/post");
		postHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		postHttp.send("data=" + encodeURIComponent(data) + "&time=" + Number(time));
	}
	event.preventDefault();
}, false);