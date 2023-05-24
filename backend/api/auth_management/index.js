var express = require('express');
var router = express.Router();

const { addPatient, login, getProfile } = require('./controller');

const { signupValidation } = require('./validator');

router.post('/signup', signupValidation, addPatient);
router.post('/login', login);
// router.get('/profile', getProfile);

module.exports = router;
