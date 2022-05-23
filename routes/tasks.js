const router = require('express').Router();
const taskController = require('../controllers/TaskController');

router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTask);
router.get('/lists/:id/tasks', taskController.getTasksList);
router.get('/lists/:listId/tasks/:id', taskController.getTasksId);

router.post('/lists/:listId/tasks', taskController.createTask);

router.delete('/lists/:listId/tasks/:id', taskController.deleteTask);

router.put('/lists/:listId/tasks/:id', taskController.putTask);

router.patch('/lists/:listId/tasks/:id', taskController.patchTask);

router.use(function (_, res, next) {
	res.status(404).send('Not found!');
});

module.exports = router;

// done
