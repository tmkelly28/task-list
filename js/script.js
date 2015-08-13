var button = document.getElementById("addNewTask"),
    taskList = document.getElementById("task-list"),
    taskCount = 0;

function escapeHTML(entry) {
    "use strict";
    return entry.replace(/<|>/g, "");
}

function completeTask(event) {
    "use strict";
    taskList.removeChild(event.target);
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