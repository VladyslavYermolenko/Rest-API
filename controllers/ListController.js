const List = require('../models/List')

class ListController {
    getID(arr, curID) {
        return List.getID(arr, curID);
    }
    getAllLists() {
        return List.getAllLists();
    }
    getTask(taskID) {
        return getTask(taskID);
    }
    getList(listID) {
        return getList(listID);
    }

    createTask(listID, lists) {
        return createTask(listID, lists);
    }
    
    createList(lists) {
        return createList(lists);
    }

    deleteTask(listID, taskID) {
        return deleteTask(listID, taskID);
    }
    deleteList(listID) {
        return deleteList(listID);
    }

    putTask(listID, taskID, lists) {
        return putTask(listID, taskID, lists);
    }
    putList(listID, lists) {
        return putList(listID, lists);
    }

    patchTask(listID, taskID, lists) {
        return patchTask(listID, taskID, lists);
    }
}

module.exports = new ListController();

// done