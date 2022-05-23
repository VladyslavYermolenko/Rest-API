const ListModels = require('../models/ListModels')

class ListController {
    async getAllLists(_, res) {
        const task = await ListModels.getAllLists();
        res.status(200).json(task);
    }
    async getList(req, res) {
        const listId = req.params['listId'];
        const list = await ListModels.getList(listId);
        if (list) {
            res.status(200).json(list);
        }
        else {
            res.status(404).send('Not Found!');
        }
    }
    async createTask(req, res) {
        const listName = req.body['listName'];
        const newList = await ListModels.createList(listName);
        if (newList) {
            res.status(200).json(newList);
        }
        else {
            res.status(404).send('Not Found!');
        }
    }
    async deleteTask(req, res) {
        const listId = req.params['listId'];
        const isDelete = await ListModels.deleteList(id, listId);
        if (isDelete) {
            res.status(204).send();
        }
        else {
            res.status(404).send('Not Found!');
        }
    }
    async putTask(req, res) {
        const listId = req.params['listId'];
        const listName = req.body['listName'];
        const newTask = ListModels.putList(listId, listName);
        if (newTask) {
            res.status(200).json(newTask);
        }
        else {
            res.status(404).send('Not Found!');
        }
    }
    async patchTask(req, res) {
        const listId = req.params['listId'];
        const listName = req.body['listName'];
        const newTask = ListModels.patchList(listId, listName);
        if (newTask) {
            res.status(200).json(newTask);
        }
        else {
            res.status(404).send('Not Found!');
        }
    }
}

module.exports = new ListController();

// done