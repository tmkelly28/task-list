//initialize DOM-related and global variables
var addNewTaskButton = document.getElementById("addNewTask"),
    doneMenuButton = document.getElementById("doneMenu"),
    taskMenuButton = document.getElementById("taskMenu"),
    allDoneButton = document.getElementById("all-done"),
    allUndoneButton = document.getElementById("all-undone"),
    taskList = document.getElementById("task-list"),
    doneList = document.getElementById("done-task-list"),
    whereAmI = "tasks", //using whereAmI is not a good solution. Todo: replace it
    taskCount = 0;

// helper functions
function escapeHTML(entry) {
    "use strict";
    return entry.replace(/<|>/g, "");
}

function toggleTask(event) {
    "use strict";
    if (whereAmI === "tasks") {
        for (var i = 0; i < taskPage.tasks.length; i++) {
            if (eval(event.srcElement.id) === taskPage.tasks[i].id) {
            taskPage.tasks[i].currentPage = doneList;
            donePage.tasks.push(taskPage.tasks[i]);
            taskPage.tasks.splice(i, 1);
            taskPage.drawTasks(taskPage.tasks);
            }
        }
    } else if (whereAmI === "done") {
        for (var i = 0; i < donePage.tasks.length; i++) {
            if (eval(event.srcElement.id) === donePage.tasks[i].id) {
            donePage.tasks[i].currentPage = taskList;
            taskPage.tasks.push(donePage.tasks[i]);
            donePage.tasks.splice(i, 1);
            donePage.drawTasks(donePage.tasks);
            }
        }
    }
}

function toggleAll() {
    "use strict";
    if (whereAmI === "tasks") {
        for (var i = 0; i < taskPage.tasks.length; i++) {
            taskPage.tasks[i].currentPage = doneList;
            donePage.tasks.push(taskPage.tasks[i]);
        }
    taskPage.tasks = [];
    taskPage.drawTasks(taskPage.tasks);
    } else if (whereAmI === "done") {
        for (var i = 0; i < donePage.tasks.length; i++) {
            donePage.tasks[i].currentPage = taskList;
            taskPage.tasks.push(donePage.tasks[i]);
        }
    donePage.tasks = [];
    donePage.drawTasks(donePage.tasks);
    }
}

/* Task constructor
*/
function Task(content) {
    "use strict";
    this.content = content;
    this.id = taskCount;
    this.currentPage = taskList;
}
Task.prototype.drawSelf = function (content) {
    "use strict";
    var taskElement = document.createElement("div"),
        taskContent = document.createTextNode(content);
    taskElement.appendChild(taskContent);
    this.currentPage.appendChild(taskElement);
    this.currentPage.lastChild.id = this.id.toString();
    this.currentPage.lastChild.className = "task";
    this.currentPage.lastChild.addEventListener("click", toggleTask);
};

/* Page constructor
*/
function Page(pageType) {
    "use strict";
    this.tasks = [];
    this.pageType = pageType;
}
Page.prototype.drawTasks = function (tasks) {
    "use strict";
    this.pageType.innerHTML = "";
    for (var i = 0; i < tasks.length; i++) {
      tasks[i].drawSelf(tasks[i].content);
  }
};

// Add New Task button
addNewTaskButton.addEventListener("click", function () {
    "use strict";
    if (document.getElementById("newTask").value === "") { return; }
    taskCount += 1;
    var newTaskContent = escapeHTML(document.getElementById("newTask").value),
        newTask = new Task(newTaskContent);
    taskPage.tasks.push(newTask);
    taskPage.drawTasks(taskPage.tasks);
    document.getElementById("newTask").value = "";
});

// Done Menu button
doneMenuButton.addEventListener("click", function () {
    "use strict";
    whereAmI = "done";
    donePage.drawTasks(donePage.tasks);
});
            
// Task Menu button
taskMenuButton.addEventListener("click", function () {
    "use strict";
    whereAmI = "tasks";
    taskPage.drawTasks(taskPage.tasks);
});

// Mark All Done button
allDoneButton.addEventListener("click", toggleAll);

// Mark All Undone button
allUndoneButton.addEventListener("click", toggleAll);

// Initialize page objects
var taskPage = new Page(taskList);
var donePage = new Page(doneList);