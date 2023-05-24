var express = require('express');
const {
  vaccinationcreate,
  getVaccination,
  checkdate,
  cancellation,
  listvaccine,
} = require('./controller');
var router = express.Router();

router.post('/add', vaccinationcreate);

router.get('/', getVaccination);
router.get('/vaccine', listvaccine);
router.get('/getdate', checkdate);
router.patch('/:id', cancellation);

module.exports = router;
