const express = require('express');
const router = express.Router();

const tasks = require('./tasks');
const lists = require('./lists');

router.use('/tasks', tasks);
router.use('/lists', lists);
router.use('/dashboard', dashboard);
router.use('/collection', collection);

router.get('/', (_, res) => {
    res.status(301).redirect('/lists');
});

router.use(function (_, res, next) {
    res.status(404).json('Not found!');
});

module.exports = router;

// done