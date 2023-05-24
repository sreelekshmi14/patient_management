var express = require('express');
var router = express.Router();

const { listDiseasesNames } = require('./controller');

router.get('/', listDiseasesNames);

module.exports = router;
