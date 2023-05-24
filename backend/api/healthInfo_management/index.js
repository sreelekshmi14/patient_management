var express = require('express');
var router = express.Router();

const {
  addHealthInfo,
  gethealth,
  edithealth,
  viewHealth,
} = require('./controller');

const { healthValidation } = require('./validator');

router.post('/add', healthValidation, addHealthInfo);
router.get('/:id', viewHealth);
router.patch('/:id', edithealth);
router.get('/', gethealth);

module.exports = router;
