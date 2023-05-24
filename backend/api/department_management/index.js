var express = require('express');
var router = express.Router();

const { listDepartments } = require('./controller');

router.get('/', listDepartments);

module.exports = router;
