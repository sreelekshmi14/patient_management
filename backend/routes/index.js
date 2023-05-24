var express = require('express');
var router = express.Router();

router.use('/auth', require('../api/auth_management/index'));
router.use('/profile', require('../api/profile_management/index'));
router.use('/health', require('../api/healthInfo_management/index'));
router.use('/disease', require('../api/disease_management/index'));
router.use('/diseasenames', require('../api/diseaseNames_management/index'));
router.use('/department', require('../api/department_management/index'));
router.use('/hospital', require('../api/hospital_management/index'));
router.use('/doctor', require('../api/doctor_mangement/index'));
router.use('/consultation', require('../api/consultation_management/index'));
router.use('/contact', require('../api/contactus_management/index'));
router.use('/vaccination', require('../api/Vaccination_management/index'));
router.use('/certificate', require('../api/certificate_management/index'));
router.use('/transaction', require('../api/transaction_management/index'));
router.use('/patients', require('../api/patient_management/index'));
router.use('/password', require('../api/change_password_management/index'));

module.exports = router;
