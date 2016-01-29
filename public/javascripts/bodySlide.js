var body, prevBody = document.getElementById("divBody1"), workingBody;
var prevActiveMenu = document.getElementsByClassName("liHomeActive")[0];

function bringBody(event){
	body = document.getElementById("divBody" + this.bodyCount);

	// Here I am checking if the body which is to be slided is already in view
	// If if is we should do nothing. But not only this if we are working over it
	// i.e., it is being brought into view, we must not do anything. If we don't
	// check working body prevBody will be equal to something other than we will
	// actually put a lot of requests into stack which will have the body to be in
	// view as prevBody as it'll be set in first setTimeout and thus it will get out
	// of the view and screen will become white i.e., background-color!!
	
	if(body != prevBody && body != workingBody){
		workingBody = body;
		prevActiveMenu.className = prevActiveMenu.className.slice(0, prevActiveMenu.className.length - 6);
		document.getElementsByClassName("divMenuButton")[0].className = "divMenuButton divMenuButtonColored" + this.bodyCount;
		document.getElementsByClassName("divTitle")[0].className = "divTitle divTitleColored" + this.bodyCount;
		this.className = this.className + "Active";
		prevActiveMenu = this;

		if(document.getElementById("divMenu").offsetHeight == document.body.offsetHeight){
			document.getElementsByClassName("divTitle")[0].className = (title.className == "divTitle")?"divTitle divTitleColored" + prevActiveMenu.bodyCount:"divTitle"
			document.getElementsByClassName("divMenuButton")[0].className = (this.className == "divMenuButton")?"divMenuButton divMenuButtonColored" + prevActiveMenu.bodyCount:"divMenuButton";
			document.getElementById("divMenu").className = (menu.className == "divMenuNotVisible")?"divMenuVisible":"divMenuNotVisible";
		}

		body.style.zIndex = "12";
		prevBody.style.zIndex = "11";
		body.style.transition = "top 1s";
		body.style.top = "0px";

		setTimeout(function(){
			body.style.transition = "none";
			prevBody.style.top = "-100%";
			prevBody = body;
			countClick = 0;
		}, 1000);
	}
}