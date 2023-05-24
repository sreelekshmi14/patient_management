const disease = require('../../models/disease');
const signup = require('../../models/sign_up');
const dieaseNamess = require('../../models/diseaseNames');

const { goodResponse, failedResponse } = require('../../helper/response');

exports.addDiseaseInfo = async (req, res, next) => {
  try {
    console.log(req.body);
    const User = await signup.findOne({ where: { loginId: req.user.id } });

    const Disease = await disease.create({
      startDate: req.body.startDate,
      remarks: req.body.remarks,
      diseaseNames: req.body.name,
      signupId: User.id,
    });

    return res.json(goodResponse({ Disease }, 'Added Successfully'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};

exports.getDisease = async (req, res, next) => {
  try {
    const isUser = await signup.findOne({ where: { loginId: req.user.id } });

    const diseasesList = await disease.findAll({
      where: { signupId: isUser.id },
      include: [
        {
          model: dieaseNamess,
        },
      ],
    });

    return res.json(goodResponse({ diseasesList }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};

// view
exports.viewDisease = async (req, res, next) => {
  try {
    const id = req.params.id;
    const isUser = await signup.findOne({ where: { loginId: req.userData.id } });
    const Diseaseinfos = await disease.findByPk(id, {
      where: { signupId: isUser.id },
      include: [
        {
          model: dieaseNamess,
        },
      ],
    });

    return res.json(goodResponse({ Diseaseinfos }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};
//delete
exports.deleteDisease = async (req, res) => {
  const id = req.params.id;
  try {
    const diseases = await disease.findByPk(id);

    await diseases.destroy();
    return res.json(goodResponse({ diseases }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};
