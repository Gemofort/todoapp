const express = require('express');
const router = express.Router();
const { delDone } = require('../controllers/deldone.js');

router.post('/', delDone);

module.exports = router;