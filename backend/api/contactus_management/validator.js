const Joi = require('joi');

//JOI VALIDATION
const contactUs = async (req, res, next) => {
 
  const contactSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string()
      .required()
      .pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
      .message('Invalid Phone number'),

    message: Joi.string().required(),
  });

  try {
    req.body = await contactSchema.validateAsync(req.body);
    next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = contactUs;
