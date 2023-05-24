const doctors = require('../../models/doctor');
const { goodResponse, failedResponse } = require('../../helper/response');

//List
exports.listDoctors = async (req, res, next) => {
  try {
    console.log(req.query);
    const doctorsList = await doctors.findAll({
      where: {
        departmentId: req.query.departmentId,
        hospitalId: req.query.hospitalId,
      },
    });
    return res.json(goodResponse({ doctorsList }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};


