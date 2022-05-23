const db = require('../database');

//////////////////////////////////////////////////////////////////////

class TaskModels {
    async getAllTasks() {
        const tasks = await db.query(
            `SELECT * FROM tasksTable;`
        );
        return tasks;
    }
    async getTask(id) {
        const task = await db.query(
            `SELECT * FROM tasksTable WHERE id = $1;`,
            [id]
        );
        return task.rows[0];
    }
    async getTasksId(id, listId) {
        const task = await db.query(
            `SELECT * FROM tasksTable WHERE id = $1 and listId = $2;`,
            [id, listId]
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
                `SELECT * FROM tasksTable WHERE listId = $1 and done = $2;`,
                [listId, false]
            );
            if(uncompletedTasks.rows[0]) {
                return uncompletedTasks.rows;
            }
        }
    }
    async createTask(data, listId) {
        const newTask = await db.query(
            `INSERT INTO tasksTable (taskName, done, datetime, listId) 
            VALUES ($1, $2, $3, $4) RETURNING *;`,
            [
                data.taskName ?? "NULL",
                date.done ?? false,
                date.datetime ?? new Date().toLocaleDateString('sv'),
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
                `UPDATE tasksTable SET taskName = $2, done = $3, datetime = $4, l_id = $5 WHERE id = $1 RETURNING *;`,
                [
                    id, 
                    data.taskName ?? "NULL",
                    date.done ?? false,
                    date.datetime ?? new Date(),
                    listId
                ]
            );
            const newTask = await db.query(
                `SELECT * tasksTable FROM taskName WHERE id = $1;`,
                [id]
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
                `UPDATE tasksTable SET taskName = $2, done = $3, datetime = $4, l_id = $5 WHERE id = $1 RETURNING *;`,
                [
                    id, 
                    data.taskName ?? oldTask.taskName,
                    date.done ?? oldTask.done,
                    date.datetime ?? oldTask.datetime,
                    listId
                ]
            );
            const newTask = await db.query(
                `SELECT * tasksTable FROM taskName WHERE id = $1;`,
                [id]
            );
            return newTask.rows[0];
        }
    }
}

//////////////////////////////////////////////////////////////////////

module.exports = new TaskModels();

// done