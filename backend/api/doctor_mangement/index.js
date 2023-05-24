var express = require('express');
var router = express.Router();

const { listDoctors } = require('./controller');

router.get('/', listDoctors);

module.exports = router;
