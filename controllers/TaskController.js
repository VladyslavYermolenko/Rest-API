const Task = require('../models/Task');

class TaskController {
    getID(arr, curID) {
        return Task.getID(arr, curID);
    }
    getListIDWithTaskID(taskID) {
        return Task.getListIDWithTaskID(taskID);
    }
    getAllTasks() {
        return Task.getAllTasks();
    }
    getTaskByListId(curID) {
        return Task.getTaskByListId(curID);
    }
    createTask(listID, lists) {
        return Task.createTask(listID, lists);
    }
    deleteTask(listID, taskID) {
        return Task.deleteTask(listID, taskID);
    }
    putTask(listID, taskID, lists) {
        return Task.putTask(listID, taskID, lists);
    }
    patchTask(listID, taskID, lists){
        return Task.patchTask(listID, taskID, lists);
    }
}

module.exports = new TaskController();

// done