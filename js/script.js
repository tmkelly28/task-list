// initialize DOM-related and global variables
var addNewTaskButton = document.getElementById("addNewTask"),
    doneMenuButton = document.getElementById("doneMenu"),
    taskMenuButton = document.getElementById("taskMenu"),
    allDoneButton = document.getElementById("all-done"),
    allUndoneButton = document.getElementById("all-undone"),
    trashAllButton = document.getElementById("trash-accept"),
    editTaskButton = document.getElementById("edit-task"),
    confirmEditButton = document.getElementById("edit-accept"),
    activeList = document.getElementById("task-list"),
    doneList = document.getElementById("done-task-list"),
    allTasks = [],
    storedTaskText = "",
    storedTaskId = 0,
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

function storeTaskData(event) {
    storedTaskText = event.srcElement.previousSibling.textContent;
    storedTaskId = Number(event.srcElement.previousSibling.id);
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
    var liEl = document.createElement("li"),
        taskEl = document.createElement("a"),
        btnEl = document.createElement("a"),
        taskContent = document.createTextNode(content),
        list = activeList;
    
    taskEl.href = "#";
    taskEl.className = "ui-btn";
    taskEl.id = this.id.toString();
    taskEl.appendChild(taskContent);
    
    btnEl.href = "#action-popup";
    btnEl.className = "ui-btn ui-btn-icon-notext ui-icon-gear";
    btnEl.setAttribute("data-rel", "popup");
    btnEl.addEventListener("click", storeTaskData);
    
    liEl.appendChild(taskEl);
    liEl.appendChild(btnEl);
    liEl.className = "ui-li-has-alt ui-li-has-thumb";
    liEl.addEventListener("click", toggleTask);
    if (this.activeStatus !== true) {
        list = doneList;
    }
    list.appendChild(liEl);
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

// Initiate Edit button
editTaskButton.addEventListener("click", function (event) {
    "use strict";
    var originalTask = storedTaskText;
    document.getElementById("editTask").value = originalTask;
});

// Confirm Edit button
confirmEditButton.addEventListener("click", function () {
    "use strict";
    if (document.getElementById("editTask").value === "") { return; }
    var newTaskContent = escapeHTML(document.getElementById("editTask").value);
    for (var i = 0; i < allTasks.length; i++) {
        if (allTasks[i].id === storedTaskId) {
            allTasks[i].content = newTaskContent;
        }
    }
    drawTasks(allTasks, activeList);
});