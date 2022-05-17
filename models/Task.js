const database = require('../database/taskLists.json');

//////////////////////////////////////////////////////////////////////

const increment = (init = getAllTasks().reduce((prev, cur) => prev['id'] > cur['id'] ? prev : cur['id'])) => () => ++init;
const primaryKey = increment();

//////////////////////////////////////////////////////////////////////

function getID(arr, curID) {
    return arr.find(i => i['id'] === curID);
}

function getListIDWithTaskID(taskID) {
    try {
        let listID = database.find(objList => objList['tasks']
            .flat().find(objTask => objTask['id'] === taskID));
        return listID['id'];
    }
    catch { TypeError } {
        return undefined;
    }
}

//////////////////////////////////////////////////////////////////////

function getAllTasks() {
    let tasksList = [];

    for (let i = 1; i < database.length + 1; i++) {
        const listID = getID(database, i);
        if (listID) {
            tasksList.push(listID['tasks']);
        }
    }
    tasksList = tasksList.flat()
        .sort((objA, objB) => {
            if (objA['id'] > objB['id']) {
                return 1;
            }
            if (objA['id'] < objB['id']) {
                return -1;
            }
            return 0;
        });
    return tasksList;
}

function getTaskByListId(curID) {
    const listID = getID(database, curID);
    if (listID) {
        return listID['tasks'].sort((objA, objB) => {
            if (objA['id'] > objB['id']) {
                return 1;
            }
            if (objA['id'] < objB['id']) {
                return -1;
            }
            return 0;
        });
    }
}

//////////////////////////////////////////////////////////////////////

function createTask(listID, lists) {
    const curList = getID(database, listID);

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

//////////////////////////////////////////////////////////////////////

function deleteTask(listID, taskID) {
    const curList = getID(database, listID);
    if (curList) {
        const curTask = getID(curList['tasks'], taskID);
        if (curTask) {
            curList['tasks'].splice(curList['tasks'].indexOf(curTask), 1);
            return true;
        }
    }
}

//////////////////////////////////////////////////////////////////////

function putTask(listID, taskID, lists) {
    const curTasksInList = getID(database, listID)['tasks'];

    if (curTasksInList) {
        const curTask = getID(curTasksInList, taskID);
        if (curTask) {
            const putCurTask = {
                id: curTask['id'],
                taskName: lists['taskName'],
                done: lists['done']
            };
            Object.assign(curTask, putCurTask);
            return curTask;
        }
    }
}

//////////////////////////////////////////////////////////////////////

function patchTask(listID, taskID, lists) {
    const curTasksInList = getID(database, listID)['tasks'];

    if (curTasksInList) {
        const curTask = getID(curTasksInList, taskID);
        if (curTask) {
            const patchCurTask = {
                id: curTask['id'],
                taskName: lists['taskName'] || curTask['taskName'],
                done: lists['done'] === "true" || curTask['done']
            };
            Object.assign(curTask, patchCurTask);
            return curTask;
        }
    }
}

//////////////////////////////////////////////////////////////////////

module.exports = {
    getID,
    getListIDWithTaskID,
    getTaskByListId,
    getAllTasks,
    createTask,
    deleteTask,
    putTask,
    patchTask
};

// done