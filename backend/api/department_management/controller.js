const { goodResponse, failedResponse } = require('../../helper/response');

const dept = require('../../models/department');

//List
exports.listDepartments = async (req, res, next) => {
  try {
    const departmentList = await dept.findAll({});

    return res.json(goodResponse({ departmentList }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};
