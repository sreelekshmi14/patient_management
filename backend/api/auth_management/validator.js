const Joi = require('joi');
const { failedResponse } = require('../../helper/response');

exports.signupValidation = async (req, res, next) => {
  //   console.log('VALIDATION', req.body);
  const schema = Joi.object({
    name: Joi.string().required(),
    aadhar: Joi.string()
      .pattern(/^[0-9]{12}$/)
      .required()
      .messages({
        'string.pattern.base': 'Aadhar Number must be a 12-digit number',
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email is required',
      }),
    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone Number must be a 10-digit number',
      }),
    birthdayDate: Joi.string().required(),
    address: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    pincode: Joi.string()
      .pattern(/^[0-9]{6}$/)
      .required()
      .messages({
        'string.pattern.base': 'Pincode must be a 6-digit number',
      }),
  });

  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (err) {
    return res.json(failedResponse(err.message));
  }
};
