const router = require('express').Router();
const listController = require('../controllers/ListController');

router.get('/', listController.getAllLists);
router.get('/:listId', listController.getList);

router.post('/', listController.createTask);

router.delete('/:listId', listController.deleteTask);

router.put('/:listId', listController.putTask);

router.patch('/:listId', listController.patchTask);

router.use(function (_, res, next) {
    res.status(404).send('Not found!');
});

module.exports = router;

// done