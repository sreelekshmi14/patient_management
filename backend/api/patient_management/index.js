var express = require('express');

var router = express.Router();

const { listPatients } = require('./controller');

router.get('/', listPatients);

module.exports = router;
