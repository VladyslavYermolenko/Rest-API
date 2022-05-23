const TaskModels = require('../models/TaskModels');

class TaskController {
    async getAllTasks(_, res) {
        const task = await TaskModels.getAllTasks();
        res.status(200).json(task);
    }
    async getTask(req, res) {
        const {listId, id} = req.params;
        const task = await TaskModels.getTask(id, listId);
        if (task) {
            res.status(200).json(task);
        }
        else {
            res.status(404).send('Not Found!');
        }
    }
    async getTasksId(req, res) {
        const id = req.params['id'];
        const listId = req.params['listId'];
        const task = await TaskModels.getTasksId(id, listId);
        if (task) {
            res.status(200).json(task);
        }
        else {
            res.status(404).send('Not Found!');
        }
    }
    async getTasksList(req, res) {
        const { listId } = req.params;
        const query = req.query['all'];
        const task = TaskModels.getTasksList(listId, query);
        if (task) {
            res.status(200).json(task);
        }
        else {
            res.status(404).send('Not Found!');
        }
    }
    async createTask(req, res) {
        const listId = req.params['listId'];
        const data = req.body;
        const newTask = await TaskModels.createTask(data, listId);
        if (newTask) {
            res.status(200).json(newTask);
        }
        else {
            res.status(404).send('Not Found!');
        }
    }
    async deleteTask(req, res) {
        const id = req.params['id'];
        const listId = req.params['listId'];
        const isDelete = await TaskModels.deleteTask(id, listId);
        if (isDelete) {
            res.status(204).send();
        }
        else {
            res.status(404).send('Not Found!');
        }
    }
    async putTask(req, res) {
        const id = req.params['id'];
        const listId = req.params['listId'];
        const data = req.body;
        const newTask = TaskModels.putTask(id, listId, data);
        if (newTask) {
            res.status(200).json(newTask);
        }
        else {
            res.status(404).send('Not Found!');
        }
    }
    async patchTask(req, res) {
        const id = req.params['id'];
        const listId = req.params['listId'];
        const data = req.body;
        const newTask = TaskModels.patchTask(id, listId, data);
        if (newTask) {
            res.status(200).json(newTask);
        }
        else {
            res.status(404).send('Not Found!');
        }
    }
}

module.exports = new TaskController();

// done