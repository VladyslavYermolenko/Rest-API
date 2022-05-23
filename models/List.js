const db = require('../database/');

//////////////////////////////////////////////////////////////////////

class ListModels {
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
        return task;
    }
    async getTasksList(l_id, list) {
        if(list) {
            const allTasksList = await db.query(
                `SELECT * FROM tasksTable WHERE l_id = $1;`,
                [l_id]
            );
            if(allTasksList.rows[0]) {
                return allTasksList.rows;
            }
        }
        else {
            const uncompletedTasks = await db.query(
                `SELECT * FROM tasksTable WHERE l_id = $1 and done = $2;`,
                [l_id, false]
            );
            if(uncompletedTasks.rows[0]) {
                return uncompletedTasks.rows;
            }
        }
    }
    async createTask(data, l_id) {
        const newTask = await db.query(
            `INSERT INTO tasksTable (taskName, done, datetime, l_id) 
            VALUES ($1, $2, $3, $4) RETURNING *;`,
            [
                data.nameTask ? data.nameTask : "NULL",
                date.done ? date.done : false,
                date.datetime ? date.datetime : new Date(),
                l_id
            ]
        );
        return task.rows[0];
    }
    async deleteTask(id, l_id) {
        const findTask = await db.query(
            `SELECT * FROM tasksTable WHERE id = $1 and l_id = $2;`,
            [id, l_id]
        );
        if(findTask.rows[0]) {
            await db.query(
                `DELETE FROM tasksTable WHERE id $1 and l_id = $2;`,
                [id, l_id]
            );
            return true;
        }
    }
    async putTask(id, l_id, data) {
        const selectTask = await db.query(
            `SELECT * FROM tasksTable WHERE id = $1 and l_id = $2`,
            [id, l_id]
        );
        if(selectTask.rows[0]) {
            await db.query(
                `UPDATE tasksTable SET taskName = $2, done = $3, datetime = $4, l_id = $5 WHERE id = $1 RETURNING *;`,
                [
                    id, 
                    data.taskName ?? "NULL",
                    date.done ?? false,
                    date.datetime ?? new Date(),
                    l_id
                ]
            );
            const newTask = await db.query(
                `SELECT * tasksTable FROM taskName WHERE id = $1;`,
                [id]
            );
            return newTask.rows[0];
        }
    }

    async patchTask(id, l_id, data) {
        const oldTask = await db.query(
            `SELECT * FROM tasksTable WHERE id = $1 and l_id = $2;`,
            [id, l_id]
        );
        if(oldTask.rows[0]) {
            await db.query(
                `UPDATE tasksTable SET taskName = $2, done = $3, datetime = $4, l_id = $5 WHERE id = $1 RETURNING *;`,
                [
                    id, 
                    data.taskName ?? oldTask.taskName,
                    date.done ?? oldTask.done,
                    date.datetime ?? oldTask.datetime,
                    l_id
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

module.exports = ListModels();

// done