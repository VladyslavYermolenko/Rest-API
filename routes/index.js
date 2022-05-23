const express = require('express');
const router = express.Router();

const tasks = require('./tasks');
const lists = require('./lists');
const another = require('./another');

router.use('/lists', lists);
router.use('/', tasks);
router.use('/', another);

router.get('/', (_, res) => {
    res.status(301).redirect('/lists');
});

router.use(function (_, res, next) {
    res.status(404).json('Not found!');
});

module.exports = router;

// done