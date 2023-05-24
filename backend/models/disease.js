const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_config');

const disease = sequelize.define('disease', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },

  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  remarks: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  signupId: {
    type: DataTypes.UUID,
  },
  diseaseNames: {
    type: DataTypes.UUID,
  },
});

disease.associate = (models) => {
  disease.belongsTo(models.signup, {
    foreignKey: 'signupId',
    allowNull: false,
  });
  disease.belongsTo(models.diseaseNames, {
    foreignKey: 'diseaseNames',
    allowNull: false,
  });
};

module.exports = disease;
