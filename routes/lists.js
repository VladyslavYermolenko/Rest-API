const router = require('express').Router();
const controller = require('../controllers/ListController');

router.get('/', (_, res) => { // http :3000/lists
    try {
        res.status(200).json(controller.getAllLists());
    }
    catch (err) {
        res.status(404).json('Error.');
        console.error(err);
    }
});

router.get('/:listId/tasks', (req, res) => { // http :3000/lists/1/tasks
    try {
        const params = req.params['listId'];
        if (params) {
            let task = controller.getList(Number(params));
            if (task) {
                res.status(200).json(task);
            }
            else if (params.search((/^[0-9]{1,}$/g) || null) === null) {
                res.status(404).json('Incorrect ID task input!');
            }
            else {
                res.status(404).json('Task not found!');
            }
        }
        else {
            res.json(controller.getAllLists());
        }
    }
    catch (err) {
        res.status(404).json('Error.');
        console.error(err);
    }
});

router.post('/', (req, res) => { // http POST :3000/lists listName="New List"
    try {
        const newList = controller.createList(req.body);

        if (Object.keys(req.body)[0] === 'listName') {
            if (newList) {
                res.status(201).json(newList);
            }
            else {
                res.status(404).json('Failed to send request.');
            }
        }
        else {
            res.status(404).json('The body is incorrect.');
        }
    }
    catch (err) {
        res.status(404).json('Error.');
        console.error(err);
    }
});

router.delete('/', (req, res) => { // http DELETE :3000/lists listId=1
    try {
        const listID = Number(req.body['listId']);

        if (listID) {
            const taskList = controller.deleteList(listID);
            if (taskList) {
                res.status(204).send();
            }
            else {
                res.status(404).json('Failed to remove item from database.');
            }
        }
        else {
            res.status(404).json('The query is incorrect.');
        }
    }
    catch (err) {
        res.status(404).json('Error.');
        console.error(err);
    }
});

router.put('/', (req, res) => { // http PUT :3000/lists?listId=1 listName="Put List"
    try {
        const listID = Number(req.query['listId']);

        if (listID) {
            const newTask = controller.putList(listID, req.body);
            if (newTask) {
                res.status(200).json(newTask);
            }
            else {
                res.status(404).json('Failed to remove item from database.');
            }
        }
        else {
            res.status(404).json('The query is incorrect.');
        }
    }
    catch (err) {
        res.status(404).json('Error.');
        console.error(err);
    }
});

router.patch('/', (req, res) => { // http PATCH :3000/lists?listId=1 listName="Patch List"
    try {
        const listID = Number(req.query['listId']);

        if (listID) {
            const newTask = controller.patchList(listID, req.body);
            if (newTask) {
                res.status(200).json(newTask);
            }
            else {
                res.status(404).json('Failed to remove item from database.');
            }
        }
        else {
            res.status(404).json('The query is incorrect.');
        }
    }
    catch (err) {
        res.status(404).json('Error.');
        console.error(err);
    }
});

router.use(function (_, res, next) {
    res.status(404).json('Not found!');
});

module.exports = router;

// done