// initialize DOM-related and global variables
var addNewTaskButton = document.getElementById("addNewTask"),
    doneMenuButton = document.getElementById("doneMenu"),
    taskMenuButton = document.getElementById("taskMenu"),
    allDoneButton = document.getElementById("all-done"),
    allUndoneButton = document.getElementById("all-undone"),
    trashAllButton = document.getElementById("trash-accept"),
    activeList = document.getElementById("task-list"),
    doneList = document.getElementById("done-task-list"),
    allTasks = [],
    taskCount = 0;

// helper functions
function escapeHTML(entry) {
    "use strict";
    return entry.replace(/<|>/g, "");
}

function toggleTask(event) {
    "use strict";
    var list = activeList;
    for (var i = 0; i < allTasks.length; i++) {
        if (Number(event.srcElement.id) === allTasks[i].id) {
            if (allTasks[i].activeStatus === true) {
                allTasks[i].activeStatus = false;
            } else {
                list = doneList;
                allTasks[i].activeStatus = true;
            }
            drawTasks(allTasks, list);
        }
    }
}
 
function toggleAll(event) {  
    "use strict";
    if (event.srcElement.id === "all-done") {
        for (var i = 0; i < allTasks.length; i++) {
            if (allTasks[i].activeStatus === true) {
                allTasks[i].activeStatus = false;
            }
        }
        drawTasks(allTasks, activeList);
    } else if (event.srcElement.id === "all-undone") {
        for (var i = 0; i < allTasks.length; i++) {
            if (allTasks[i].activeStatus === false) {
                allTasks[i].activeStatus = true;
            }
        }
        drawTasks(allTasks, doneList);
    }
}

function drawTasks(tasks, list) {
    "use strict";
    list.innerHTML = "";
    for (var i = 0; i < tasks.length; i++) {
        if (list === activeList) {
            if (tasks[i].activeStatus === true) {
                tasks[i].drawSelf(tasks[i].content);
            }
        } else if (list === doneList) {
            if (tasks[i].activeStatus === false) {
                tasks[i].drawSelf(tasks[i].content);
            }
        }
    }
}

// Task constructor
function Task(content) {
    "use strict";
    this.content = content;
    this.id = taskCount;
    this.activeStatus = true;
}
Task.prototype.drawSelf = function (content) {
    "use strict";
    var taskElement = document.createElement("div"),
        taskContent = document.createTextNode(content),
        list = activeList;
    taskElement.appendChild(taskContent);
    if (this.activeStatus !== true) {
        list = doneList;
    }
    list.appendChild(taskElement);
    list.lastChild.id = this.id.toString();
    list.lastChild.className = "task";
    list.lastChild.addEventListener("click", toggleTask);
};

// Add New Task button
addNewTaskButton.addEventListener("click", function () {
    "use strict";
    if (document.getElementById("newTask").value === "") { return; }
    taskCount += 1;
    var newTaskContent = escapeHTML(document.getElementById("newTask").value),
        newTask = new Task(newTaskContent);
    allTasks.push(newTask);
    drawTasks(allTasks, activeList);
    document.getElementById("newTask").value = "";
});

// Done Menu button
doneMenuButton.addEventListener("click", function () {
    "use strict";
    drawTasks(allTasks, doneList);
});
            
// Task Menu button
taskMenuButton.addEventListener("click", function () {
    "use strict";
    drawTasks(allTasks, activeList);
});

// Mark All Done button
allDoneButton.addEventListener("click", toggleAll);

// Mark All Undone button
allUndoneButton.addEventListener("click", toggleAll);

// Trash All button
trashAllButton.addEventListener("click", function () {
    var trashIndexes = [];
    for (var i = 0; i < allTasks.length; i++) {
        if (allTasks[i].activeStatus === false) {
            trashIndexes.push(i);
        }
    }
    for (var i = trashIndexes.length - 1; i >= 0; i--) {
        allTasks.splice(trashIndexes[i], 1);
    }
    doneList.innerHTML = "";
});