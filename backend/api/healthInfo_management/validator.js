const Joi = require('joi');
const { failedResponse } = require('../../helper/response');

exports.healthValidation = async (req, res, next) => {
  //   console.log('VALIDATION', req.body);

  const healthInformationValidationSchema = Joi.object({
    blood: Joi.string()
      .valid('A+', 'B+', 'A-', 'AB+', 'AB-', 'O+', 'O-')
      .required(),
    height: Joi.string().required(),
    weight: Joi.string().required(),
    gender: Joi.string().valid('male', 'female', 'others').required(),
  });

  try {
    req.body = await healthInformationValidationSchema.validateAsync(req.body);
    next();
  } catch (err) {
    return res.json(failedResponse(err.message));
  }
};
