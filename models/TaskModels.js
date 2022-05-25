const knex = require('../database');

class TaskModels {
    async getAllTasks() {
        return knex.select(`*`).from(`taskstable`);
    }
    async getTask(id) {
        const task = await knex.select(`*`).from(`taskstable`).where("id", id);
        console.log(task[0]);
        return task[0];
    }
    async getTasksList(listId, query) {
        if(query) { // ?all=true
            const allTasksList = await knex.select(`*`).from(`taskstable`).where("listid", listId);
            console.log(allTasksList);
            if(allTasksList[0]) return allTasksList;
        }
        else {
            const uncompletedTasks = await knex.select(`*`).from(`taskstable`).where("listid", listId).andWhere("done", false);
            if(uncompletedTasks[0]) return uncompletedTasks;
        }
    }
    async getTasksId(id, listId) {
        const task = await knex.select(`*`).from(`taskstable`).where("id", id).andWhere("listid", listId);
        return task[0];
    }
    async createTask(data, listId) {
        const newTask = await knex('taskstable').insert({
            taskname: data.taskName ?? "NULL",
            done: data.done ?? false,
            datetime: data.datetime ?? new Date().toLocaleDateString('sv'),
            listid: listId
        }).returning('*');
        console.log(newTask);
        return newTask[0];
    }
    async deleteTask(id, listId) { 
        const findTask = await knex.select(`*`).from(`taskstable`).where("id", id).andWhere("listid", listId);
        if(findTask[0]) {
            await knex('taskstable').where("id", id).andWhere("listid", listId).del();
            return true;
        }
    }
    async putTask(id, listId, data) {
        const selectTask = await knex.select(`*`).from(`taskstable`).where("id", id).andWhere("listid", listId);
        if(selectTask[0]) {
            await knex('taskstable').update({
                taskname: data.taskName ?? "NULL",
                done: data.done ?? false,
                datetime: data.datetime ?? new Date().toLocaleDateString('sv'),
                listid: listId
            }).where('id', id);
            const newTask = await knex.select(`*`).from(`taskstable`).where("id", id).andWhere("listid", listId);
            return newTask[0];
        }
    }

    async patchTask(id, listId, data) {
        const selectTask = await knex.select(`*`).from(`taskstable`).where("id", id).andWhere("listid", listId);
        if(selectTask[0]) {
            await knex('taskstable').update({
                taskname: data.taskName ?? oldTask.taskName,
                done: data.done ?? oldTask.done,
                datetime: data.datetime ?? oldTask.datetime,
                listid: listId
            }).where('id', id);
            const newTask = await knex.select(`*`).from(`taskstable`).where("id", id).andWhere("listid", listId);
            return newTask[0];
        }
    }
}

module.exports = new TaskModels();