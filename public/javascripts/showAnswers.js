window.addEventListener("load", function(){
	var divQues = document.getElementsByClassName("divQues");
	for(var x = 0; x<divQues.length; x++){
		divQues[x].addEventListener("click", bringAnswers, false);
	}
}, false);

function bringAnswers(event){
	this.getElementsByClassName("writeComment")[0].style.display = "block";
}