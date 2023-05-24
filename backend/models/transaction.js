const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_config');

const transaction = sequelize.define('transaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  transactionHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  signupId: {
    type: DataTypes.UUID,
  },
  appointmentType: {
    type: DataTypes.ENUM(
      'vaccination',
      'consultation',
      'vaccinationCertificate',
      'consultationCertificate'
    ),
    defaultValue: 'consultation',
    allowNull: true,
  },
});
transaction.associate = (models) => {
  transaction.belongsTo(models.signup, {
    foreignKey: 'signupId',
    allowNull: false,
  });
};

module.exports = transaction;
