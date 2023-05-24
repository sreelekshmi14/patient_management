const Joi = require('joi');
const { failedResponse } = require('../../helper/response');

exports.diseaseValidation = async (req, res, next) => {
  //   console.log('VALIDATION', req.body);
  const validationSchema = Joi.object({
    name: Joi.string().required(),
    startDate: Joi.date()
      .required()
      .max(new Date().toISOString().split('T')[0]),
    remarks: Joi.string().required(),
  });

  try {
    req.body = await validationSchema.validateAsync(req.body);
    next();
  } catch (err) {
    return res.json(failedResponse(e.message));
  }
};
