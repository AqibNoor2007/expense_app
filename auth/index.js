var nameElement = document.getElementById("userName");
var emailElement = document.getElementById("email");
var passwordElement = document.getElementById("password");
var confirmPasswordElement = document.getElementById("confirm_password");
var signInForm = document.getElementById("signInForm");
var logInForm = document.getElementById("logInForm");
var logInPassword = document.getElementById("logInPassword");
var logInEmail = document.getElementById("logInEmail");

function FormVisiavle(visiable, event) {
  event.preventDefault();
  if (visiable == "logIn") {
    logInForm.classList.remove("formHidden");
    logInForm.classList.add("formVisiable");
    signInForm.classList.remove("formVisiable");
    signInForm.classList.add("formHidden");
  }
  if (visiable == "signIn") {
    logInForm.classList.remove("formVisiable");
    logInForm.classList.add("formHidden");
    signInForm.classList.remove("formHidden");
    signInForm.classList.add("formVisiable");
  }
}

function CheckValidation(id, styleClass, msg) {
  var errorId = document.getElementById(id);
  errorId.innerText = msg;
  errorId.classList.add(styleClass);
}

function HandleUserError() {
  var nameValue = nameElement.value;
  if (nameValue.length >= 3) {
    document.getElementById("errorName").classList.remove("hidden");
  } else {
    CheckValidation("errorName", "hidden", "Name must be atleast 3 letters");
  }
}

function HandleEmailError() {
  var emailValue = emailElement.value;
  if (!emailValue.includes("@")) {
    CheckValidation("errorEmail", "hidden", "Email is included @");
  } else if (emailValue.includes(" ")) {
    CheckValidation("errorEmail", "hidden", "Email not contians spaces");
  } else {
    document.getElementById("errorEmail").classList.remove("hidden");
  }
}

function HandlepasswordError() {
  var passwordValue = passwordElement.value;

  if (!(passwordValue.length >= 8)) {
    CheckValidation("errorPassword", "hidden", "Password must be 8 letter");
  } else if (
    passwordValue.includes("@") ||
    passwordValue.includes("$") ||
    passwordValue.includes("#")
  ) {
    document.getElementById("errorPassword").classList.remove("hidden");
  } else {
    CheckValidation(
      "errorPassword",
      "hidden",
      "Add one special chracter @,#,$"
    );
  }
}

function HandleLogInPasswordError() {
  var passwordValue = logInPassword.value;

  if (!(passwordValue.length >= 8)) {
    CheckValidation(
      "logInErrorPassword",
      "hidden",
      "Password must be 8 letter"
    );
  } else if (
    passwordValue.includes("@") ||
    passwordValue.includes("$") ||
    passwordValue.includes("#")
  ) {
    document.getElementById("logInErrorPassword").classList.remove("hidden");
  } else {
    CheckValidation(
      "logInErrorPassword",
      "hidden",
      "Add one special chracter @,#,$"
    );
  }
}

function HandleLogInEmailError() {
  var emailValue = logInEmail.value;
  if (emailValue.includes("@")) {
    document.getElementById("logInErrorEmail").classList.remove("hidden");
  } else {
    CheckValidation("logInErrorEmail", "hidden", "Email is included @");
  }
}

function HandleConfirmPasswordError() {
  var passwordValue = confirmPasswordElement.value;

  if (!(passwordValue == passwordElement.value)) {
    CheckValidation(
      "errorConfirmPassword",
      "hidden",
      "Password Does not match"
    );
  } else {
    document.getElementById("errorConfirmPassword").classList.remove("hidden");
  }
}
function SignUp(event) {
  event.preventDefault();
  var userName = nameElement.value;
  var email = emailElement.value;
  var password = passwordElement.value;
  var confirmPassword = confirmPasswordElement.value;

  if (!(userName || email || password || confirmPassword)) {
    var error = document.getElementsByClassName("error");
    for (var i = 0; i < error.length; i++) {
      error[i].classList.add("hidden");
    }
  } else if (!userName) {
    CheckValidation("errorName", "hidden", "Name is required");
  } else if (!(userName.length >= 3)) {
    CheckValidation("errorName", "hidden", "Name must be atleast 3 letters");
  } else if (!email) {
    CheckValidation("errorEmail", "hidden", "Email is required");
  } else if (!email.includes("@")) {
    CheckValidation("errorEmail", "hidden", "Email is included @");
  } else if (email.includes(" ")) {
    CheckValidation("errorEmail", "hidden", "Enter a valid email");
  } else if (!password) {
    CheckValidation("errorPassword", "hidden", "Password is required");
  } else if (!(password.length >= 8)) {
    CheckValidation(
      "errorPassword",
      "hidden",
      "Password must be atleast 8 letters"
    );
  } else if (
    !(
      password.includes("@") ||
      password.includes("$") ||
      password.includes("#")
    )
  ) {
    CheckValidation(
      "errorPassword",
      "hidden",
      "Add one special chracter @,#,$"
    );
  } else if (!(confirmPassword == password)) {
    CheckValidation(
      "errorConfirmPassword",
      "hidden",
      "Password Dose not match"
    );
  } else {
    var existingUsers = JSON.parse(localStorage.getItem("authUsers")) || [];
    existingUsers.push({
      userName,
      email,
      password,
    });
    users = JSON.stringify(existingUsers);
    localStorage.setItem("authUsers", users);

    document.getElementById("signloder").classList.remove("lodding");
    document.getElementById("signloder").classList.add("loddingVisiable");
    document.getElementById("signInBtn").classList.add("lodding");
    setTimeout(function () {
      window.location.href = "/dashBoard";
    }, 2000);

    nameElement.value = "";
    emailElement.value = "";
    passwordElement.value = "";
    confirmPasswordElement.value = "";
  }
}

function LogIn(event) {
  event.preventDefault();

  var email = logInEmail.value;
  var password = logInPassword.value;

  if (!(email || password)) {
    var error = document.getElementsByClassName("logInError");
    for (var i = 0; i < error.length; i++) {
      error[i].classList.add("hidden");
    }
  } else if (!email) {
    CheckValidation("logInErrorEmail", "hidden", "Email is required");
  } else if (!email.includes("@")) {
    CheckValidation("logInErrorEmail", "hidden", "Email is included @");
  } else if (email.includes(" ")) {
    CheckValidation("logInErrorEmail", "hidden", "Enter a valid email");
  } else if (!password) {
    CheckValidation("logInErrorPassword", "hidden", "Password is required");
  } else if (!(password.length >= 8)) {
    CheckValidation(
      "logInErrorPassword",
      "hidden",
      "Password must be atleast 8 letters"
    );
  } else if (
    !(
      password.includes("@") ||
      password.includes("$") ||
      password.includes("#")
    )
  ) {
    CheckValidation(
      "logInErrorPassword",
      "hidden",
      "Add one special chracter @,#,$"
    );
  } else {
    var getUser = JSON.parse(localStorage.getItem("authUsers"));

    var userData;
    if (getUser == null) {
      document.getElementById("indecation").classList.add("existHidden");
      setTimeout(function () {
        document.getElementById("indecation").classList.remove("existHidden");
      }, 3000);
    } else {
      var user = getUser.find(function (element, index) {
        if (element.email == email) {
          userData = element;
          if (getUser[index].password == password) {
            document.getElementById("loginloder").classList.remove("lodding");
            document
              .getElementById("loginloder")
              .classList.add("loddingVisiable");
            document.getElementById("logInBtn").classList.add("lodding");
            setTimeout(function () {
              window.location.href = "/dashBoard";
            }, 2000);
            console.log(element);
          } else {
            CheckValidation(
              "logInErrorPassword",
              "hidden",
              "Password Does not Match"
            );
          }
        }
        if (!userData) {
          document.getElementById("indecation").classList.add("existHidden");
          setTimeout(function () {
            document
              .getElementById("indecation")
              .classList.remove("existHidden");
          }, 3000);
        }
      });
    }
  }
}

function LogOut() {
  window.location.href = "/index.html?";
}
