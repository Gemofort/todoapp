const express = require('express');
const router = express.Router();
const { searchTasks } = require('../controllers/search.js');

router.post('/', searchTasks);

module.exports = router;