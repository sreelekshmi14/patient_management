var express = require('express');
var router = express.Router();

const { changePassword } = require('./controller');

router.post('/', changePassword);

module.exports = router;
