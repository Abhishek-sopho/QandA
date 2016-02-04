var email, usernameSignUp, passwordSignUp;
var usernameSignIn, passwordSignIn;
var emailAuth = false, userAuth = false, passAuth = false,
	userAuthIn = false, passAuthIn = false, emailAvail = false, userAvail = false;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
	if(xmlhttp.readyState == 4){
		var res = JSON.parse(xmlhttp.responseText);
		console.log(res);
		if(res.output == "true"){
			if(res.check == "email"){
				emailAvail  = true;
				document.getElementsByName("email")[0].nextSibling.getElementsByTagName("i")[0].className = "fa fa-check-circle";
			}
			else if(res.check == "username"){
				userAvail = true;
				document.getElementsByName("usernameSignUp")[0].nextSibling.getElementsByTagName("i")[0].className = "fa fa-check-circle";
			}
		}
		else {
			if(res.check == "email"){
				document.getElementsByName("email")[0].nextSibling.getElementsByTagName("i")[0].className = "fa fa-warning";
			}
			else if(res.check == "username"){
				document.getElementsByName("usernameSignUp")[0].nextSibling.getElementsByTagName("i")[0].className = "fa fa-warning";
			}
		}
	}
}

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
	else if(emailAuth == true){
		xmlhttp.open("POST", "/available");
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlhttp.send("email=" + this.value + "&check=email");
		this.nextSibling.getElementsByTagName("i")[0].className = "fa fa-spin fa-spinner";

	}
});


document.getElementsByName("usernameSignUp")[0].addEventListener("blur", function(event){
	if(this.value == ""){
		this.nextSibling.getElementsByTagName("i")[0].className = "fa fa-asterisk";
	}
	else if(userAuth == true){
		xmlhttp.open("POST", "/available");
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlhttp.send("username=" + this.value + "&check=username");
		this.nextSibling.getElementsByTagName("i")[0].className = "fa fa-spin fa-spinner";
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
	if(!emailAuth || !userAuth || !passAuth || !emailAvail || !userAvail) {
		event.preventDefault();
	}
}, false);

document.getElementById("signIn").addEventListener("submit", function(event){
	if(!userAuthIn || !passAuthIn) {
		event.preventDefault();
	}
}, false);

window.addEventListener("load", function(){
	if(document.getElementsByName("usernameSignIn")[0].value != ""){
		userAuthIn = true;
		document.getElementsByName("usernameSignIn")[0].nextSibling.getElementsByTagName("i")[0].className = "fa fa-check-circle";
	}
})