const db = require('../database/');

//////////////////////////////////////////////////////////////////////

class ListModels {
    async getAllLists() {
        const lists = await db.query(
            `SELECT * FROM listsTable;`
        );
        return lists.rows;
    }
    async getList(l_id) {
        const list = await db.query(
            `SELECT * FROM listsTable WHERE l_id = $1;`,
            [l_id]
        );
        if(list.rows[0]) {
            const task = await db.query(
                `SELECT * FROM tasksTable WHERE l_id = $1;`,
                [l_id]
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
    async deleteTask(l_id) {
        const findTask = await db.query(
            `SELECT * FROM listsTable WHERE l_id = $1;`,
            [l_id]
        );
        if(findTask.rows[0]) {
            await db.query(
                `DELETE FROM tasksTable WHERE l_id = $1;`,
                [l_id]
            );
            await db.query(
                `DELETE FROM listsTable WHERE l_id = $1;`,
                [l_id]
            );
            return true;
        }
    }
    async putTask(l_id, listName) {
        const findTask = await db.query(
            `SELECT * FROM listsTable WHERE l_id = $1;`,
            [l_id]
        );
        if(findTask.rows[0]) {
            await db.query(
                `DELETE FROM tasksTable WHERE l_id = $1;`,
                [l_id]
            );
            await db.query(
                `DELETE FROM listsTable WHERE l_id = $1;`,
                [l_id]
            );
            const newTask =  await db.query(
                `INSERT INTO listsTable (listName) 
                VALUES ($1) RETURNING *;`, 
                [l_id]
            );
            return newTask.rows[0];
        }
    }
    async patchTask(l_id, listName) {
        const oldList = await db.query(
            `SELECT * FROM listsTable WHERE l_id = $1;`,
            [l_id]
        );
        if(oldList.rows[0]) {
            await db.query(
                `UPDATE listsTable SET listName = $2 WHERE id = $1 RETURNING *;`,
                [l_id, listName]
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