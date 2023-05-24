const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_config');

const diseaseNames = sequelize.define('diseaseNames', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = diseaseNames;
