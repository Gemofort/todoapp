const express = require('express');
const router = express.Router();

const { loadMainpage, addTask } = require('../controllers/mainpage');
const { taskDone } = require('../controllers/done');
const { taskDelete } = require('../controllers/deleted');
const { undoDone } = require('../controllers/undo');

router.get('/', loadMainpage);

router.post('/', addTask);

router.post('/:id/completed', taskDone);

router.post('/:id/deleted', taskDelete);

router.post('/:id/undo', undoDone);

module.exports = router;