var express = require('express');
var router = express.Router();

const { listHospitals } = require('./controller');

router.get('/', listHospitals);

module.exports = router;
