var express = require('express');

var router = express.Router();

const {listTransaction} = require('./controller');


router.get('/', listTransaction);


module.exports = router;
