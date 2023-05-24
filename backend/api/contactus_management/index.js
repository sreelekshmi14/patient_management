var express = require('express');
var router = express.Router();

const {
  addContact,
  listContact,
  viewContact,
  deleteContact,
} = require('./controller');
const validator = require('./validator');

router.post('/add', validator, addContact);
router.get('/', listContact);
router.get('/:id', viewContact);
router.delete('/:id', deleteContact);

module.exports = router;
