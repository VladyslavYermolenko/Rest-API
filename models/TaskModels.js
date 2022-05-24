const knex = require('../database');

class TaskModels {
    async getAllTasks() {
        return knex.select(`*`).from(`taskstable`);
    }
    async getTask(id) {
        return await knex.select(`*`).from(`taskstable`).where("id", id)[0]
    }
    async getTasksList(listId, query) {
        if(query) { // ?all=true
            const allTasksList = await knex.select(`*`).from(`taskstable`).where("listid", listId);
            if(allTasksList[0]) {
                return allTasksList;
            }
        }
        else {
            const uncompletedTasks = await knex.select(`*`).from(`taskstable`).where("listid", listId).andWhere("done", false);
            if(uncompletedTasks[0]) {
                return uncompletedTasks;
            }
        }
    }
    async getTasksId(id, listId) {
        return await knex.select(`*`).from(`taskstable`).where("id", id).andWhere("listid", listId)[0];
    }
    async createTask(data, listId) {
        const newTask = await knex('taskstable').insert({
            taskName: data.taskName ?? "NULL",
            done: data.done ?? false,
            datetime: data.datetime ?? new Date().toLocaleDateString('sv'),
            listId: listId
        }).returning('*').toString();
        return newTask[0];
    }
    async deleteTask(id, listId) { 
        const findTask = await knex.select(`*`).from(`taskstable`).where("id", id).andWhere("listid", listId);
        if(findTask[0]) {
            knex('taskstable').where("id", id).andWhere("listid", listId).del();
            return true;
        }
    }
    async putTask(id, listId, data) {
        const selectTask = await knex.select(`*`).from(`taskstable`).where("id", id).andWhere("listid", listId);
        if(selectTask[0]) {
            await knex('taskstable').update({
                taskName: data.taskName ?? "NULL",
                done: data.done ?? false,
                datetime: data.datetime ?? new Date().toLocaleDateString('sv'),
                listId: listId
            }).where('id', id);
            const newTask = await knex.select(`*`).from(`taskstable`).where("id", id).andWhere("listid", listId);
            return newTask[0];
        }
    }

    async patchTask(id, listId, data) {
        const selectTask = await knex.select(`*`).from(`taskstable`).where("id", id).andWhere("listid", listId);
        if(selectTask[0]) {
            await knex('taskstable').update({
                taskName: data.taskName ?? oldTask.taskName,
                done: data.done ?? oldTask.done,
                datetime: data.datetime ?? oldTask.datetime,
                listId: listId
            }).where('id', id);
            const newTask = await knex.select(`*`).from(`taskstable`).where("id", id).andWhere("listid", listId);
            return newTask[0];
        }
    }
}

module.exports = new TaskModels();