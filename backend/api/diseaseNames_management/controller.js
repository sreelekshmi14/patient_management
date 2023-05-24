const { goodResponse, failedResponse } = require('../../helper/response');

const diseaseNames = require('../../models/diseaseNames');

//List
exports.listDiseasesNames = async (req, res, next) => {
  try {
    const diseasesNamesList = await diseaseNames.findAll({});
   
    return res.json(goodResponse({ diseasesNamesList }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};
