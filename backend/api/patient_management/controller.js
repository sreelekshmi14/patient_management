const { Op } = require('sequelize');
const patient = require('../../models/sign_up');
const login = require('../../models/login');
const { goodResponse, failedResponse } = require('../../helper/response');

exports.listPatients = async (req, res) => {
  try {
    const Patients = await patient.findAll({
      where: {
        '$login.role$': { [Op.not]: 'admin' },
      },
      include: [
        {
          model: login,
        },
      ],
    });

    return res.json(goodResponse({ Patients }, 'Data is'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};
