const heathInfo = require('../../models/healthInformation');
const signup = require('../../models/sign_up');

const { goodResponse, failedResponse } = require('../../helper/response');

exports.addHealthInfo = async (req, res, next) => {
  try {
    const User = await signup.findOne({ where: { loginId: req.userData.id } });

    const health = await heathInfo.create({
      blood: req.body.blood,
      height: req.body.height,
      weight: req.body.weight,
      gender: req.body.gender,
      signupId: User.id,
    });

    return res.json(goodResponse({ health }, 'Added Successfully'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};

exports.gethealth = async (req, res, next) => {
  try {
    const isUser = await signup.findOne({ where: { loginId: req.user.id } });
    const health = await heathInfo.findOne({
      where: { signupId: isUser.id },
    });

    return res.json(goodResponse({ health }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};

//view
exports.viewHealth = async (req, res, next) => {
  try {
    const id = req.params.id;
    const Healthinfos = await heathInfo.findByPk(id);

    return res.json(goodResponse({ Healthinfos }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};
exports.edithealth = async (req, res) => {
  const { id } = req.params;

  try {
    // Update the gallery item with the given ID

    const updatedhealth = await heathInfo.update(
      {
        blood: req.body.blood,
        height: req.body.height,
        weight: req.body.weight,
        gender: req.body.gender,
      },
      { where: { id } }
    );

    return res.json(goodResponse({ updatedhealth }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};
