var express = require('express');
var router = express.Router();

const {
  consultationCertificates,
  vaccineCertificates,
} = require('./controller');

// const { healthValidation } = require('./validator');

router.post('/consult', consultationCertificates);
router.post('/vaccine', vaccineCertificates);
// router.get('/', getConsultation);
// router.patch('/:id', cancellation);
// router.get('/time', getTimeSlots);
module.exports = router;
