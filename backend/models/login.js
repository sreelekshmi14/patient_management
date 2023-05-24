const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { stripe, jwts } = require('../config');

const login = sequelize.define(
  'login',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    email: { type: DataTypes.STRING, allowNull: false, unique: true },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('admin', 'patient'),
      defaultValue: 'patient',
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

login.validatePassword = function (pass) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    pass
  );
};

login.generateSalt = async function () {
  return await bcrypt.genSalt();
};

login.hashPassword = async function (pass, salt) {
  return await bcrypt.hash(pass, salt);
};

login.verifyPassword = async function (pass, hash, salt) {
  const hashPassword = await bcrypt.hash(pass, salt);
  if (hashPassword === hash) return true;
  else return false;
};

login.generateAuthToken = function (data) {
  try {
    let expiresIn = expireIn(10);

    if (data.rememberMe) {
      console.log('entered...');
      expiresIn = expireIn(720);
    }

    return jwt.sign(
      {
        id: data.id,
        email: data.email,
        validity: data.password.concat(data.id).concat(data.email),
      },
      jwts.secret_key,
      { expiresIn }
    );
  } catch (e) {
    console.log(e);
  }
};

const expireIn = (numDays) => {
  const dataObj = new Date();
  return dataObj.setMinutes(dataObj.getMinutes() + numDays);
};

module.exports = login;
