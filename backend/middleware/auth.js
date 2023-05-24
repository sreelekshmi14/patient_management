const jwt = require('jsonwebtoken');
const users = require('../models/login');
const { stripe, jwts } = require('../config');

module.exports = async (req, res, next) => {
  try {
    // if (req.originalUrl.startsWith('/auth/login')) return next();
    if (
      req.originalUrl.startsWith('/auth') ||
      req.originalUrl.startsWith('/contact')
    ) {
      return next();
    }
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
    // console.log(token);
    if (!token) {
      return res.json({
        success: false,
        msg: 'Unauthorized Access',
      });
    }

    const decoded = await jwt.verify(token, jwts.secret_key);

    if (!decoded) {
      return res.json({
        success: false,
        msg: 'Invalid Token',
      });
    }

    if (decoded.exp < Date.now()) {
      return res.json({ success: false, msg: 'Token Expired' });
    }

    const isUserExists = await users.findOne({ where: { id: decoded.id } });

    if (!isUserExists) {
      return res.json({ success: false, msg: 'Access Denied' });
    }
    let matchvalidity = isUserExists.password
      .concat(isUserExists.id)
      .concat(isUserExists.email);

    // console.log();
    if (matchvalidity != decoded.validity) {
      return res.json({ success: false, msg: 'Access Denied' });
    }
    req.user = decoded;
    req.userData = isUserExists;

    return next();
  } catch (ex) {
    console.log('auth catch', ex.message);
    return res.json({ success: false, msg: ex.message });
  }
};
