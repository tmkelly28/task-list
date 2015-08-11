var button = document.getElementsByTagName("button")[0];
var taskList = document.getElementById("task-list");
var taskCount = 0;

function escapeHTML(entry) {
    return entry.replace(/\<|\>/g, "");
}

function completeTask() {
  //to-do
}

button.addEventListener("click", function() {
    var newTaskContent = escapeHTML(document.getElementById("newTask").value);
  newTaskContent = document.createTextNode(newTaskContent)
  var newTask = document.createElement("div");
  newTask.appendChild(newTaskContent);
  
  taskList.appendChild(newTask);
  taskCount += 1;
  taskList.lastChild.id="task" + taskCount.toString();
  taskList.lastChild.className="task";
  taskList.lastChild.addEventListener("click", completeTask);
});
