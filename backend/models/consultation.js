const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_config');

const consult = sequelize.define('consult', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'consulted', 'cancel'),
    defaultValue: 'pending',
    allowNull: true,
  },
  signupId: {
    type: DataTypes.UUID,
  },
  transactionId: {
    type: DataTypes.UUID,
  },
  doctorId: {
    type: DataTypes.UUID,
  },
  hospitalId: {
    type: DataTypes.UUID,
  },
  departmentId: {
    type: DataTypes.UUID,
  },
});

consult.associate = (models) => {
  consult.belongsTo(models.signup, {
    foreignKey: 'signupId',
    allowNull: false,
  });
  consult.belongsTo(models.doctor, {
    foreignKey: 'doctorId',
    allowNull: false,
  });
  consult.belongsTo(models.hospital, {
    foreignKey: 'hospitalId',
    allowNull: false,
  });
  consult.belongsTo(models.department, {
    foreignKey: 'departmentId',
    allowNull: false,
  });
  consult.belongsTo(models.transaction, {
    foreignKey: 'transactionId',
    allowNull: false,
  });
};

module.exports = consult;
