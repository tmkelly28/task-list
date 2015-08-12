var button = document.getElementsByTagName("button")[0],
    taskList = document.getElementById("task-list"),
    taskCount = 0;

function escapeHTML(entry) {
    "use strict";
    return entry.replace(/<|>/g, "");
}

function completeTask() {
    "use strict";
  //to-do
}

button.addEventListener("click", function () {
    "use strict";
    var newTaskContent = escapeHTML(document.getElementById("newTask").value),
        newTask = document.createElement("div");
    newTaskContent = document.createTextNode(newTaskContent);
    newTask.appendChild(newTaskContent);
  
    taskList.appendChild(newTask);
    taskCount += 1;
    taskList.lastChild.id = "task" + taskCount.toString();
    taskList.lastChild.className = "task";
    taskList.lastChild.addEventListener("click", completeTask);
});