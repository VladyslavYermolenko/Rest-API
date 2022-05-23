const db = require('../database');

//////////////////////////////////////////////////////////////////////

class ListModels {
    async getAllLists() {
        const lists = await db.query(
            `SELECT * FROM listsTable;`
        );
        return lists.rows;
    }
    async getList(listId) {
        const list = await db.query(
            `SELECT * FROM listsTable WHERE listId = $1;`,
            [listId]
        );
        if(list.rows[0]) {
            const task = await db.query(
                `SELECT * FROM tasksTable WHERE listId = $1;`,
                [listId]
            );
            if (task.rows[0]) {
                return task.rows;
            }
        }
        return list.rows[0];
    }
    async createTask(listName) {
        const newList = await db.query(
            `INSERT INTO listsTable (listName) 
            VALUES ($1) RETURNING *;`,
            [listName ?? "NULL"]
        );
        return newList.rows[0];
    }
    async deleteTask(listId) {
        const findTask = await db.query(
            `SELECT * FROM listsTable WHERE listId = $1;`,
            [listId]
        );
        if(findTask.rows[0]) {
            await db.query(
                `DELETE FROM tasksTable WHERE listId = $1;`,
                [listId]
            );
            await db.query(
                `DELETE FROM listsTable WHERE listId = $1;`,
                [listId]
            );
            return true;
        }
    }
    async putTask(listId, listName) {
        const findTask = await db.query(
            `SELECT * FROM listsTable WHERE listId = $1;`,
            [listId]
        );
        if(findTask.rows[0]) {
            await db.query(
                `DELETE FROM tasksTable WHERE listId = $1;`,
                [listId]
            );
            await db.query(
                `DELETE FROM listsTable WHERE listId = $1;`,
                [listId]
            );
            const newTask =  await db.query(
                `INSERT INTO listsTable (listName) 
                VALUES ($1) RETURNING *;`, 
                [listId]
            );
            return newTask.rows[0];
        }
    }
    async patchTask(listId, listName) {
        const oldList = await db.query(
            `SELECT * FROM listsTable WHERE listId = $1;`,
            [listId]
        );
        if(oldList.rows[0]) {
            await db.query(
                `UPDATE listsTable SET listName = $2 WHERE id = $1 RETURNING *;`,
                [listId, listName]
            );
            const newTask = await db.query(
                `SELECT * listsTable FROM taskName WHERE id = $1;`,
                [id]
            );
            return newTask.rows[0];
        }
    }
}

//////////////////////////////////////////////////////////////////////

module.exports = new ListModels();

// done