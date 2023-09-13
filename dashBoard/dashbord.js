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

//New Task List Item
function CreateNewTaskElement() {
  //Create List Item

  var userTodo = JSON.parse(localStorage.getItem("userTodo"));

  incompletetask.innerHTML = "";
  userTodo.map(function (todo, index) {
    if (todo.userId == logInUser.id) {
      var listItem = document.createElement("li");
      var checkBox = document.createElement("input");
      var label = document.createElement("label");
      var editInput = document.createElement("input");
      var editButton = document.createElement("button");
      var deleteButton = document.createElement("button");

      checkBox.type = "checkbox";
      editInput.type = "text";
      label.innerText = todo.value;
      editButton.innerText = "Edit";
      editButton.className = "edit";
      deleteButton.innerText = "Delete";
      deleteButton.className = "delete";

      deleteButton.addEventListener("click", function () {
        // Remove the item from userTodo array
        userTodo.splice(index, 1);
        // Update localStorage with the modified userTodo array
        localStorage.setItem("userTodo", JSON.stringify(userTodo));
        // Re-render the tasks
        CreateNewTaskElement();
      });

      listItem.appendChild(checkBox);
      listItem.appendChild(label);
      listItem.appendChild(editInput);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);

      incompletetask.appendChild(listItem);
    }
  });
}

//Add a new task
var addTask = function () {
  console.log("Add task...");
  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

//Edit an existing task
var editTask = function () {
  console.log("Edit task...");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");

  //if the class of the parent is .editMode
  if (containsClass) {
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
  }

  //Toggle .editMode on the list item
  listItem.classList.toggle("editMode");
};

//Delete an existing task
var deleteTask = function () {
  console.log("Delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  //Remove the parent list item from the ul
  ul.removeChild(listItem);
};

//Mark a task as complete
var taskCompleted = function () {
  console.log("Task complete...");
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

//Mark a task as incomplete
var taskIncomplete = function () {
  console.log("Task incomplete...");
  //Append the task list item to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  //bind editTask to edit button
  editButton.onclick = editTask;

  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;

  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
};

// var ajaxRequest = function() {
// 	console.log("AJAX request");
// }

//Set the click handler to the addTask function
// addButton.addEventListener("click", addTask);
//addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
