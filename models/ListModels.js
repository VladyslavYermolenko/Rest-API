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
        const newTask = await knex('liststable').insert([{listname: listName ?? "NULL"}]).returning('*');
        return newTask[0];
    }
    async deleteList(listId) {
        const findTask = await knex.select(`*`).from(`liststable`).where("listid", listId);
        if(findTask[0]) {
            await knex('taskstable').where('listid', listId).del();
            await knex('liststable').where('listid', listId).del();
            return true;
        }
    }
    async putList(listId, listName) {
        const oldList = await knex.select(`*`).from(`liststable`).where("listid", listId);
        if(oldList[0]) {
            await knex('liststable')
                .update({listname: listName})
                .where('listid', listId)
                .returning('*');
            const newTask = await knex.select(`*`).from(`liststable`).where("listid", listId);
            return newTask[0];
        }
    }
    async patchList(listId, listName) {
        const oldList = await knex.select(`*`).from(`liststable`).where("listid", listId);
        if(oldList[0]) {
            await knex('liststable')
                .update({listname: listName ?? Object.values(oldList.rows[0])[0]})
                .where('listid', listId)
                .returning('*');
            const newTask = await knex.select(`*`).from(`liststable`).where("listid", listId);
            return newTask[0];
        }
    }
}

module.exports = new ListModels();