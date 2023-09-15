var logInUser = JSON.parse(localStorage.getItem("loginUser"));
var welComemsgElement = document.getElementById("welComemsg");

welComemsgElement.innerHTML = "Welcome to " + logInUser.userName;

function LogOut() {
  localStorage.setItem("loginUser", null);
  window.location.href = "/index.html?";
}

var addInput = document.getElementById("new-task");
var addBTn = document.getElementById("addTodo");
var emptyInput = document.getElementById("error");
var incompletetask = document.getElementById("incomplete-tasks");
function CheckValue() {
  emptyInput.classList.add("hidden");
}
CreateNewTaskElement();
function AddTodo() {
  if (addInput.value) {
    var userTodo = JSON.parse(localStorage.getItem("userTodo")) || [];
    userTodo.push({ userId: logInUser.id, value: addInput.value });
    localStorage.setItem("userTodo", JSON.stringify(userTodo));
    addInput.value = "";
    CreateNewTaskElement();
  } else {
    emptyInput.classList.remove("hidden");
  }
}

function CreateNewTaskElement() {
  var userTodo = JSON.parse(localStorage.getItem("userTodo"));

  incompletetask.innerHTML = "";
  userTodo.map(function (todo, index) {
    if (todo.userId == logInUser.id) {
      var listItem = document.createElement("li");
      var label = document.createElement("label");
      var editInput = document.createElement("input");
      var editButton = document.createElement("button");
      var deleteButton = document.createElement("button");

      editInput.type = "text";
      label.innerText = todo.value;
      editButton.innerText = "Edit";
      editButton.className = "edit";
      deleteButton.innerText = "Delete";
      deleteButton.className = "delete";

      deleteButton.addEventListener("click", function () {
        userTodo.splice(index, 1);
        localStorage.setItem("userTodo", JSON.stringify(userTodo));
        CreateNewTaskElement();
      });
      editButton.addEventListener("click", function () {
        if (listItem.classList.contains("editMode")) {
          label.innerText = editInput.value;
          editButton.innerText = "Edit";
          userTodo[index].value = editInput.value;
          localStorage.setItem("userTodo", JSON.stringify(userTodo));
        } else {
          editInput.value = label.innerText;
          editButton.innerText = "Save";
        }
        listItem.classList.toggle("editMode");
      });

      listItem.appendChild(label);
      listItem.appendChild(editInput);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);

      incompletetask.appendChild(listItem);
    }
  });
}
