var span = document.getElementById("divFormChange"),
	signIn = document.getElementsByClassName("divSignIn")[0],
	signUp = document.getElementsByClassName("divSignUp")[0],
	menu = document.getElementById("divMenu"),
	title = document.getElementsByClassName("divTitle")[0],
	menuItem = document.getElementsByClassName("listItem"),
	count = 0;

span.addEventListener("click", function(){
	count++;
	console.log(count);
	if(count == 1) {
		signUp.className = "divSignUp signUpStage2"
		signIn.className = "divSignIn signInStage2"
		span.innerHTML = "Already  have  an  account <span id = 'spanTextForm'> Log In </span>";
	}

	if(count == 2) {
		count = 0;
		signUp.className = "divSignUp"
		signIn.className = "divSignIn"
		span.innerHTML = "Don't  have  an  account <span id = 'spanTextForm'> Create an account </span>";
	}

}, false);

document.getElementsByClassName("divMenuButton")[0].addEventListener("click", function(){
	title.className = (title.className == "divTitle")?"divTitle divTitleColored":"divTitle"
	this.className = (this.className == "divMenuButton")?"divMenuButton divMenuButtonColored":"divMenuButton";
	menu.className = (menu.className == "divMenuNotVisible")?"divMenuVisible":"divMenuNotVisible";
}, false);

window.addEventListener("load", function(){
	for(var i = 0;  i < menuItem.length; i++){
		menuItem[i].countJump = 0;
	}
})

for(var i = 0; i < menuItem.length; i++){
	menuItem[i].addEventListener("mouseenter", jumpI, false);
}

function jumpI(event){
	jumpIcon(this);	
}

function jumpIcon(that){
	that.countJump++;
	switch(that.countJump){
		case 1: that.getElementsByTagName("i")[0].style.transform = "translateY(-20px)"; setTimeout(function(){jumpIcon(that)}, 200); break;
		case 2: that.getElementsByTagName("i")[0].style.transform = "translateY(15px)"; setTimeout(function(){jumpIcon(that)}, 200); break;
		case 3: that.getElementsByTagName("i")[0].style.transform = "translateY(-10px)"; setTimeout(function(){jumpIcon(that)}, 200); break;
		case 4: that.getElementsByTagName("i")[0].style.transform = "translateY(5px)"; that.countJump = 0; break;
	}
}