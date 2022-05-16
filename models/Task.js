const database = require('../database/taskLists.json');

//////////////////////////////////////////////////////////////////////

const increment = (init = 0) => () => ++init;
const primaryKey = increment();

//////////////////////////////////////////////////////////////////////

function getID(arr, curID) {
    return arr.find(i => i['id'] === curID);
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
            console.log(`${objA} ${objB}`)
            if (objA['id'] > objB['id']) {
                return 1;
            }
            if (objA['id'] < objB['id']) {
                return -1;
            }
            return 0;
        });
    console.log(tasksList);
    return tasksList;
}

function getTask(curID) {
    const listID = getID(database, curID);
    if (listID) {
        return listID['tasks'];
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
            const delTask = database['tasks'].filter(i => i.id !== taskID);
            return curList['tasks'] = delTask;
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
                taskName: lists['taskName'],
                done: false
            };
            Object.assign(curTask, putCurTask);
            return curTask;
        }
        // or here
        // Object.assign(curTask, putCurTask);
        // return curTask;
    }
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

//////////////////////////////////////////////////////////////////////

module.exports = {
    getID,
    getTask,
    getAllTasks,
    createTask,
    deleteTask,
    putTask,
    patchTask
};

// done