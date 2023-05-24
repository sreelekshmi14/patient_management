const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_config');

const signup = sequelize.define('signup', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aadharNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pinCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loginId: {
    type: DataTypes.UUID,
  },
});

signup.associate = (models) => {
  signup.belongsTo(models.login, { foreignKey: 'loginId', allowNull: false });
};

module.exports = signup;
