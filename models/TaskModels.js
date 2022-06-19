const db = require('../database');

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
            `INSERT INTO tasksTable (taskName, taskDescription, done, duedate, listId) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
            [
                data['taskname'] ?? "NULL",
                data['taskdescription'] ?? "",
                data.done ?? false,
                data.duedate,
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
                `UPDATE tasksTable SET taskName = $2, taskDescription = $3, done = $4, duedate = $5, listId = $6 WHERE id = $1 RETURNING *;`,
                [
                    id, 
                    data['taskname'] ?? "NULL",
                    data['taskdescription'] ?? "",
                    data.done ?? false,
                    data.duedate,
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
            `SELECT done FROM tasksTable WHERE id = $1 and listId = $2;`,
            [id, listId]
        );
        console.log(data);
        console.log(oldTask.rows);
        if(oldTask.rows[0]) {
            await db.query(
                `UPDATE tasksTable SET done = $2 WHERE id = $1 RETURNING *;`,
                [
                    id, 
                    data.done ?? oldTask.rows.done,
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

module.exports = new TaskModels();