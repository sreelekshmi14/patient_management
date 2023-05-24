const { Sequelize } = require('sequelize');
const { database } = require('../config');
// require('dotenv').config();

const sequelize = new Sequelize(database);

module.exports = sequelize;
