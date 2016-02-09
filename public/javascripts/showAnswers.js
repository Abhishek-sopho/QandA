window.addEventListener("load", function(){
	var divQues = document.getElementsByClassName("divQues");
	for(var x = 0; x<divQues.length; x++){
		divQues[x].addEventListener("click", bringAnswers, false);
	}
}, false);

function bringAnswers(event){
	this.getElementsByClassName("writeComment")[0].style.display = "block";
}


// Send Answers Data to server!!!!

var answerHttp = new XMLHttpRequest();

answerHttp.onreadystatechange = function(){
	if(answerHttp.readyState == 4){
		console.log(answerHttp.responseText);
	}
};

var formAnswer = document.getElementsByClassName("formAnswer");
for(var i = 0; i < formAnswer.length; i++){
	formAnswer[i].addEventListener("submit", sendAnswerToServer);
}

function sendAnswerToServer(event){
	var commentText = this.answerToPost.value;
	var postId = this.parentNode.parentNode.parentNode.getElementsByTagName("input")[0].value;
	var time = Number(new Date());
	answerHttp.open("POST", "/comment");
	answerHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	answerHttp.send("comment=" + commentText + "&postId=" + postId + "&time=" + time);
	event.preventDefault();
}