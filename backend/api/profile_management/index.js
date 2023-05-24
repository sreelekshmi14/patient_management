var express = require('express');
var router = express.Router();

const { getProfiledata, viewProfile, editProfile } = require('./controller');

router.get('/', getProfiledata);
router.get('/:id', viewProfile);
router.patch('/:id', editProfile);

module.exports = router;
