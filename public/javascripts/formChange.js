var span = document.getElementById("spanTextForm"),
	signIn = document.getElementsByClassName("divSignIn")[0],
	signUp = document.getElementsByClassName("divSignUp")[0],
	count = 0;

span.addEventListener("click", function(){
	count++;
	console.log(count);
	if(count == 1) {
		//signUp.style.left = "35%";
		//signUp.style.transform = "rotateY(0deg)";
		signUp.className = "divSignUp signUpStage2"
		//signIn.style.transform = "rotateY(120deg)";
		//signIn.style.left = "-80%";
		signIn.className = "divSignIn signInStage2"
		span.innerHTML = "Log in"
	}

	if(count == 2) {
		count = 0;
		//signIn.style.left = "35%";
		//signIn.style.transform = "rotateY(0deg)";
		//signUp.style.left = "145%";
		//signUp.style.transform = "rotateY(-120deg)";
		signUp.className = "divSignUp"
		signIn.className = "divSignIn"
		span.innerHTML = "Create an account"
	}

}, false);