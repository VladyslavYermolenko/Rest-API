const router = require('express').Router();
const anotherController = require('../controllers/AnotherControllers');

router.get('/dashboard', anotherController.dashboard);
router.get('/collection/today', anotherController.collection);

router.use(function (_, res, next) {
    res.status(404).send('Not found!');
});

module.exports = router;