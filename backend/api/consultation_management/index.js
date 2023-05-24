var express = require('express');
var router = express.Router();

const {
  addConsultationInfo,
  getConsultation,
  cancellation,
  getTimeSlots,
} = require('./controller');

// const { healthValidation } = require('./validator');

router.post('/add', addConsultationInfo);
router.get('/', getConsultation);
router.patch('/:id', cancellation);
router.get('/time', getTimeSlots);
module.exports = router;
