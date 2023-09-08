var logInUser = JSON.parse(localStorage.getItem("loginUser"));
var welComemsgElement = document.getElementById("welComemsg");

console.log(logInUser);
welComemsgElement.innerHTML = "Welcome to " + logInUser.userName;

function LogOut() {
  localStorage.setItem("loginUser", null);
  window.location.href = "/index.html?";
}
