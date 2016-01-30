var email, usernameSignUp, passwordSignUp;

document.getElementsByName("email")[0].addEventListener("input", function(event){
	email = this.value;
	var emailPattern = new RegExp("[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,5}");
	var elem = this.nextSibling.getElementsByTagName("i")[0];

	if(emailPattern.test(email) && email.indexOf(" ") == -1){
		elem.className = "fa fa-check-circle";
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