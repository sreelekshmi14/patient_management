const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_config');

const healthInformation = sequelize.define('healthInformation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  blood: {
    type: DataTypes.ENUM('A+', 'B+', 'A-', 'AB+', 'AB-', 'O+', 'O-'),

    allowNull: false,
  },
  height: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'others'),

    allowNull: false,
  },
  signupId: {
    type: DataTypes.UUID,
  },
});

healthInformation.associate = (models) => {
  healthInformation.belongsTo(models.signup, {
    foreignKey: 'signupId',
    allowNull: false,
  });
};

module.exports = healthInformation;
