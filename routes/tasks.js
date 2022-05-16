const router = require('express').Router();
const controller = require('../controllers/TaskController');

router.get('/', (req, res) => { // http :3000/tasks // or // http :3000/tasks?taskId=1
	const params = req.query['taskId'];
	let task = controller.getAllTasks();
	if (params) {
		task = controller.getID(task, parseInt(params));
		console.log(task);
		if (task) {
			res.json(task);
		}
		else if (params.search((/^[0-9]{1,}$/g) || null)=== null) {
			res.status(404).json('Incorrect ID task input!');
		}
		else {
			res.status(404).json('Task not found!');
		}
	}
	else {
		res.json(task);
	}
});

router.post('/:id', (req, res) => { // http POST :3000/tasks/1 taskName="New Task"
	// console.log(req);
		
	const listID = parseInt(req.query['listId']);
	const newTask = controller.createTask(listID, req.body);
	if (newTask) {
		res.json(newTask);
	}
	else {
		res.status(404).json('Failed to send request.');
	}
});

router.use(function (_, res, next) {
    res.status(404).json('Not found!');
});

module.exports = router;

// 