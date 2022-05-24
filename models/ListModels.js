const knex = require('../database');

class ListModels {
    
    async getAllLists() {
        return await knex.select(`*`).from(`liststable`);
    }
    async getList(listId) {
        const list = await knex.select(`*`).from(`liststable`).where("listid", listId);
        if(list[0]) {
            const task = await knex.select(`*`).from(`taskstable`).where("listid", listId);
            if (task[0]) return task;
        }
        return list[0];
    }
    async createList(listName) {
        const newTask = await knex.raw(
            `INSERT INTO listsTable (listName) 
            VALUES (?) RETURNING *;`,
            [listName ?? "NULL"]
        );
        return newTask.rows[0];
    }
    async deleteList(listId) {
        const findTask = await knex.select(`*`).from(`liststable`).where("listid", listId);
        if(findTask[0]) {
            await knex.raw(
                `DELETE FROM tasksTable WHERE listId = ?;`,
                [listId]
            );
            await knex.raw(
                `DELETE FROM listsTable WHERE listId = ?;`,
                [listId]
            );
            return true;
        }
    }
    async putList(listId, listName) {
        const oldList = await knex.select(`*`).from(`liststable`).where("listid", listId);
        if(oldList[0]) {
            const listNameValue = listName;
            console.log(listNameValue)
            await knex('liststable')
                .update({listName: listNameValue})
                .where('listid', listId)
                .returning('*');
            const newTask = await knex.select(`*`).from(`liststable`).where("listid", listId);
            console.log(newTask[0])
            return newTask[0];
        }
    }
    async patchList(listId, listName) {
        const oldList = await knex.select(`*`).from(`liststable`).where("listid", listId);
        if(oldList[0]) {
            // await knex('listsTable')
            //     .update({listName: listName ?? Object.values(oldList[0])[0]})
            //     .where('listId', listId)
            //     .returning('*').toString();
            await knex.raw(
                `UPDATE listsTable SET listName = '??' WHERE listId = ?? RETURNING *;`,
                [
                    listName ?? Object.values(oldList.rows[0])[0],
                    Number(listId)
                ]
            );
            const newTask = await knex.select(`*`).from(`liststable`).where("listid", listId);
            return newTask[0];
        }
    }
}

module.exports = new ListModels();