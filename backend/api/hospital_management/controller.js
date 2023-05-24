const { goodResponse, failedResponse } = require('../../helper/response');

const hospital = require('../../models/hospital');

//List
exports.listHospitals = async (req, res, next) => {
  try {
    const hospitalList = await hospital.findAll({});

    return res.json(goodResponse({ hospitalList }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};
