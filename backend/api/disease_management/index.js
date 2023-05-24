var express = require('express');
var router = express.Router();

const {
  addDiseaseInfo,
  getDisease,
  viewDisease,
  deleteDisease,
} = require('./controller');

const { diseaseValidation } = require('./validator');

router.post('/add', diseaseValidation, addDiseaseInfo);
router.get('/', getDisease);
router.get('/:id', viewDisease);
router.delete('/:id', deleteDisease);

module.exports = router;
