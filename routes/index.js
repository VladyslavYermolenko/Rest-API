const express = require('express');
const router = require('express').Router();
const listController = require('../controllers/ListController');
const taskController = require('../controllers/TaskController');
const anotherController = require('../controllers/AnotherControllers');

// const tasks = require('./tasks');
// const lists = require('./lists');
// const another = require('./another');

// router.use('', lists);
// router.use('/', tasks);
// router.use('/', another);

router.get('/', (_, res) => {
    res.status(301).redirect('/lists');
});

//////////////////////////////////////////////////////////////////////

router.get('/lists', listController.getAllLists);     // http :3000/lists
router.get('/lists/:listId', listController.getList); // http :3000/lists/2

router.post('/lists', listController.createList);

router.delete('/lists/:listId', listController.deleteList);

router.put('/lists/:listId', listController.putList);

router.patch('/lists/:listId', listController.patchList);

//////////////////////////////////////////////////////////////////////

router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:listId', taskController.getTask);
router.get('/lists/:listId/tasks', taskController.getTasksList);
router.get('/lists/:listId/tasks/:id', taskController.getTasksId);

router.post('/lists/:listId/tasks', taskController.createTask);

router.delete('/lists/:listId/tasks/:id', taskController.deleteTask);

router.put('/lists/:listId/tasks/:id', taskController.putTask);

router.patch('/lists/:listId/tasks/:id', taskController.patchTask);

//////////////////////////////////////////////////////////////////////

router.get('/dashboard', anotherController.getGashboard);
router.get('/collection/today', anotherController.getCollectionToday);

//////////////////////////////////////////////////////////////////////

router.use(function (_, res, next) {
    res.status(404).json('Not found!');
});

module.exports = router;

// done