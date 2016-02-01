var email, usernameSignUp, passwordSignUp;
var usernameSignIn, passwordSignIn;
var emailAuth = false, userAuth = false, passAuth = false,
	userAuthIn = false, passAuthIn = false;

//SIGN UP VALIDITY
document.getElementsByName("email")[0].addEventListener("input", function(event){
	email = this.value;
	var emailPattern = new RegExp("[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,5}");
	var elem = this.nextSibling.getElementsByTagName("i")[0];

	if(emailPattern.test(email) && email.indexOf(" ") == -1){
		elem.className = "fa fa-check-circle";
		emailAuth = true;
	}

	else {
		elem.className = "fa fa-close";		
	}
});

document.getElementsByName("usernameSignUp")[0].addEventListener("input", function(event){
	usernameSignUp = this.value;
	var usernamePattern = new RegExp("[a-zA-Z0-9_]{5}[a-zA-Z0-9_]+");
	var elem = this.nextSibling.getElementsByTagName("i")[0];

	if(usernamePattern.test(usernameSignUp) && usernameSignUp.indexOf(" ") == -1){
		elem.className = "fa fa-check-circle";
		userAuth = true;
	}

	else {
		elem.className = "fa fa-close";
	}
});

document.getElementsByName("passwordSignUp")[0].addEventListener("input", function(event){
	passwordSignUp = this.value;
	var elem = this.nextSibling.getElementsByTagName("i")[0];

	if(passwordSignUp.length < 6){
		elem.className = "fa fa-close";
	}

	else {
		elem.className = "fa fa-check-circle";
		passAuth = true;
	}
});

document.getElementsByName("email")[0].addEventListener("blur", function(event){
	if(this.value == ""){
		this.nextSibling.getElementsByTagName("i")[0].className = "fa fa-asterisk";
	}
});


document.getElementsByName("usernameSignUp")[0].addEventListener("blur", function(event){
	if(this.value == ""){
		this.nextSibling.getElementsByTagName("i")[0].className = "fa fa-asterisk";
	}
});

document.getElementsByName("passwordSignUp")[0].addEventListener("blur", function(event){
	if(this.value== ""){
		this.nextSibling.getElementsByTagName("i")[0].className = "fa fa-asterisk";
	}
});


//SIGN IN VALIDITY
document.getElementsByName("usernameSignIn")[0].addEventListener("input", function(event){
	usernameSignIn = this.value;
	var usernamePattern = new RegExp("[a-zA-Z0-9_]{5}[a-zA-Z0-9_]+");
	var elem = this.nextSibling.getElementsByTagName("i")[0];

	if(usernamePattern.test(usernameSignIn) && usernameSignIn.indexOf(" ") == -1){
		elem.className = "fa fa-check-circle";
		userAuthIn = true;
	}

	else {
		elem.className = "fa fa-close";
	}
});


document.getElementsByName("passwordSignIn")[0].addEventListener("input", function(event){
	passwordSignIn = this.value;
	var elem = this.nextSibling.getElementsByTagName("i")[0];

	if(passwordSignIn.length < 6){
		elem.className = "fa fa-close";
	}

	else {
		elem.className = "fa fa-check-circle";
		passAuthIn = true;
	}
});

document.getElementsByName("usernameSignIn")[0].addEventListener("blur", function(event){
	if(this.value == ""){
		this.nextSibling.getElementsByTagName("i")[0].className = "fa fa-asterisk";
	}
});

document.getElementsByName("passwordSignIn")[0].addEventListener("blur", function(event){
	if(this.value== ""){
		this.nextSibling.getElementsByTagName("i")[0].className = "fa fa-asterisk";
	}
});


//PREVENTING FORM SUBMISSION IF FORM IS NOT VALIDATED
document.getElementById("signUp").addEventListener("submit", function(event){
	if(!emailAuth || !userAuth || !passAuth) {
		event.preventDefault();
	}
}, false);

document.getElementById("signIn").addEventListener("submit", function(event){
	if(!userAuthIn || !passAuthIn) {
		event.preventDefault();
	}
}, false);