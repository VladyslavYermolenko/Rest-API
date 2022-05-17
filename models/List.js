let database = require('../database/taskLists.json');

//////////////////////////////////////////////////////////////////////

const increment = (init = database.reduce((prev, cur) => prev['id'] > cur['id'] ? prev : cur['id'])) => () => ++init;
const primaryKey = increment();

//////////////////////////////////////////////////////////////////////

function getID(arr, curID) {
    return arr.find(i => i['id'] === curID);
}

//////////////////////////////////////////////////////////////////////

function getAllLists() {
    return database;
}

function getList(listID) {
    const curList = getID(database, listID);

    if (curList) {
        return curList;
    }
}

//////////////////////////////////////////////////////////////////////

function createList(lists) {
    const newList = {
        id: primaryKey(),
        taskName: lists['listName'],
        tasks: []
    };

    database.push(newList);
    return database;
}

//////////////////////////////////////////////////////////////////////

function deleteList(listID) {
    const curList = getID(database, listID);

    if (curList) {
        const delTask = database.filter(i => i.id !== listID);
        return database = delTask;
    }
}

//////////////////////////////////////////////////////////////////////

function putList(listID, lists) {
    const curList = getID(database, listID);

    if (curList) {
        const putCurList = {
            id: curList['id'],
            listName: lists['listName'],
            tasks: []
        };
        Object.assign(curList, putCurList);
        return curList;
    }
}

//////////////////////////////////////////////////////////////////////

function patchList(listID, lists) {
    const curList = getID(database, listID);

    if (curList) {
        const patchCurList = {
            id: curList['id'],
            listName: lists['listName'] || curList['id'],
            tasks: lists['tasks'] || curList['tasks']
        };
        Object.assign(curList, patchCurList);
        return curList;
    }
}

//////////////////////////////////////////////////////////////////////

module.exports = {
    getID,
    getAllLists,
    getList,
    createList,
    deleteList,
    putList,
    patchList
};

// done