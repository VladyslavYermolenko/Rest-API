const db = require('../database');

//////////////////////////////////////////////////////////////////////

class TaskModels {
    async getAllTasks() {
        const tasks = await db.query(
            `SELECT * FROM tasksTable;`
        );
        return tasks.rows;
    }
    async getTask(listId) {
        const task = await db.query(
            `SELECT * FROM tasksTable WHERE id = $1;`,
            [listId]
        );
        return task.rows[0];
    }
    async getTasksList(listId, query) {
        if(query) { // ?all=true
            const allTasksList = await db.query(
                `SELECT * FROM tasksTable WHERE listId = $1;`,
                [listId]
            );
            if(allTasksList.rows[0]) {
                return allTasksList.rows;
            }
        }
        else {
            const uncompletedTasks = await db.query(
                `SELECT * FROM tasksTable WHERE listId = $1 and done = false;`,
                [listId]
            );
            if(uncompletedTasks.rows[0]) {
                return uncompletedTasks.rows;
            }
        }
    }
    async getTasksId(id, listId) {
        const task = await db.query(
            `SELECT * FROM tasksTable WHERE id = $1 and listId = $2;`,
            [id, listId]
        );
        return task.rows[0];
    }
    async createTask(data, listId) {
        const newTask = await db.query(
            `INSERT INTO tasksTable (taskName, done, datetime, listId) 
            VALUES ($1, $2, $3, $4) RETURNING *;`,
            [
                data.taskName ?? "NULL",
                data.done ?? false,
                data.datetime ?? new Date().toLocaleDateString('sv'),
                listId
            ]
        );
        return newTask.rows[0];
    }
    async deleteTask(id, listId) {
        const findTask = await db.query(
            `SELECT * FROM tasksTable WHERE id = $1 and listId = $2;`,
            [id, listId]
        );
        if(findTask.rows[0]) {
            await db.query(
                `DELETE FROM tasksTable WHERE id = $1 and listId = $2;`,
                [id, listId]
            );
            return true;
        }
    }
    async putTask(id, listId, data) {
        const selectTask = await db.query(
            `SELECT * FROM tasksTable WHERE id = $1 and listId = $2;`,
            [id, listId]
        );
        if(selectTask.rows[0]) {
            await db.query(
                `UPDATE tasksTable SET taskName = $2, done = $3, datetime = $4, listId = $5 WHERE id = $1 RETURNING *;`,
                [
                    id, 
                    data.taskName ?? "NULL",
                    data.done ?? false,
                    data.datetime ?? new Date().toLocaleDateString('sv'),
                    listId
                ]
            );
            const newTask = await db.query(
                `SELECT * FROM tasksTable WHERE id = $1 and listId = $2;`,
                [id, listId]
            );
            return newTask.rows[0];
        }
    }

    async patchTask(id, listId, data) {
        const oldTask = await db.query(
            `SELECT * FROM tasksTable WHERE id = $1 and listId = $2;`,
            [id, listId]
        );
        if(oldTask.rows[0]) {
            await db.query(
                `UPDATE tasksTable SET taskName = $2, done = $3, datetime = $4, listId = $5 WHERE id = $1 RETURNING *;`,
                [
                    id, 
                    data.taskName ?? oldTask.taskName,
                    data.done ?? oldTask.done,
                    data.datetime ?? oldTask.datetime,
                    listId
                ]
            );
            const newTask = await db.query(
                `SELECT * FROM tasksTable WHERE id = $1 and listId = $2;`,
                [id, listId]
            );
            return newTask.rows[0];
        }
    }
}

//////////////////////////////////////////////////////////////////////

module.exports = new TaskModels();

// done