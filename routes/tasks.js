const router = require('express').Router();
const controller = require('../controllers/TaskController');

router.get('/', controller.getAllTasks);
router.get('/:id', controller.getTask);

router.post('/:id', (req, res) => { // http POST :3000/tasks/1 taskName="New Task"
	try {
		const listID = Number(req.params['id']);
		const newTask = controller.createTask(listID, req.body);
		if (Object.keys(req.body)[0] === 'taskName') {
			if (newTask) {
				res.status(201).json(newTask);
			}
			else {
				res.status(404).json('Failed to send request.');
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

router.delete('/', (req, res) => { // http DELETE :3000/tasks taskId=1

	try {
		const taskID = Number(req.body['taskId']);
		const listID = controller.getListIDWithTaskID(taskID);

		if (listID) {
			const taskList = controller.deleteTask(listID, taskID);
			if (taskList) {
				res.status(204).send();
			}
			else {
				res.status(404).json('Failed to remove item from database.');
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

router.put('/', (req, res) => { // http PUT :3000/tasks?taskId=1 done=true // or // http PUT :3000/tasks?taskId=1 taskName="Put Task"
	try {
		const taskID = Number(req.query['taskId']);
		const listID = controller.getListIDWithTaskID(taskID);

		if (listID) {
			const newTask = controller.putTask(listID, taskID, req.body);
			if (newTask) {
				res.status(200).json(newTask);
			}
			else {
				res.status(404).json('Failed to change item from database.');
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

router.patch('/', (req, res) => { // http PATCH :3000/tasks?taskId=1 done=true // or // http PATCH :3000/tasks?taskId=1 taskName="Patch Task"
	try {
		const taskID = Number(req.query['taskId']);
		const listID = controller.getListIDWithTaskID(taskID);

		if (listID) {
			const newTask = controller.patchTask(listID, taskID, req.body);
			if (newTask) {
				res.status(200).json(newTask);
			}
			else {
				res.status(404).json('Failed to change item from database.');
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
