let database = require('../database/taskLists.json');

//////////////////////////////////////////////////////////////////////

function getID(arr, curID) {
    return arr.find(i => i['id'] === curID);
}

//////////////////////////////////////////////////////////////////////

function getAllLists() {
    return database;
}

function getTask(taskID) {
    const curListID = getID(database, taskID);
    
    if (curListID) {
        return curListID['tasks'];
    }
}

function getList(listID) {
    const curList = getID(database, listID);

    if (curList) {
        return curList;
    }
}

//////////////////////////////////////////////////////////////////////

function createTask(listID, lists) {
    const curList = getID(database, listID);

    const increment = (init = curList['tasks'].length) => () => ++init;
    const primaryKey = increment();

    const newTask = {
        id: primaryKey(),
        taskName: lists['taskName'],
        done: false
    };

    if (curList) {
        curList['tasks'].push(newTask);
        return curList['tasks'];
    }
}

function createList(lists) {
    const increment = (init = lists.length) => () => ++init;
    const primaryKey = increment();

    const newList = {
        id: primaryKey(),
        taskName: lists['listName'],
        tasks: []
    };

    database.push(newList);
    return database;
}

//////////////////////////////////////////////////////////////////////

function deleteTask(listID, taskID) {
    const curList = getID(database, listID);
    
    if (curList) {
        const curTask = getID(curList['tasks'], taskID);
        if (curTask) {
            const delTask = database['tasks'].filter(i => i.id !== taskID);
            return curList['tasks'] = delTask;
        }
    }
}

function deleteList(listID) {
    const curList = getID(database, listID);
    
    if (curList) {
        const delTask = database.filter(i => i.id !== listID);
        return database = delTask;
    }
}

//////////////////////////////////////////////////////////////////////

function putTask(listID, taskID, lists) {
    const curTasksInList = getID(database, listID)['tasks'];
    if (curTasksInList) {
        const curTask = getID(curTasksInList, taskID);
        if (curTask) {
            const putCurTask = {
                taskName: lists['taskName'],
                done: false
            };
        }
        Object.assign(curTask, putCurTask);
        return curTask;
    }
}

function putList(listID, lists) {
    const curList = getID(database, listID);

    if (curList) {
        const putCurList = {
            listName: lists['listName'],
            tasks: []
        };
        Object.assign(curList, putCurList);
        return curList;
    }
    // or here
    // Object.assign(curTask, putCurTask);
    // return curTask;
}

//////////////////////////////////////////////////////////////////////

function patchTask(listID, taskID, lists) {
    const curTasksInList = getID(database, listID)['tasks'];
    if (curTasksInList) {
        const curTask = getID(curTasksInList, taskID);
        if (curTask) {
            Object.assign(curTask, lists);
            return curTask;
        }
    }
}

function patchList(listID, lists) {
    const curList = getID(database, listID);
    if (curList) {
        Object.assign(curList, lists);
        return curTask;
    }
}

//////////////////////////////////////////////////////////////////////

module.exports = {
    getID,
    getAllLists,
    getTask,
    getList,

    createTask,
    createList,

    deleteTask,
    deleteList,

    putTask,
    putList,

    patchTask,
    patchList
};

// done