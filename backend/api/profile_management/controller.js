const Login = require('../../models/login');
const Signup = require('../../models/sign_up');

const { goodResponse, failedResponse } = require('../../helper/response');
const signup = require('../../models/sign_up');

exports.getProfiledata = async (req, res, next) => {
  try {
    const profile = await Signup.findOne({
      where: { loginId: req.user.id },
      include: [
        {
          model: Login,
        },
      ],
    });

    return res.json(goodResponse({ profile }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};

//view
exports.viewProfile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const SignupInfo = await signup.findByPk(id, {
      include: [
        {
          model: Login,
        },
      ],
    });

    return res.json(goodResponse({ SignupInfo }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};

exports.editProfile = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  try {
    const updatedlogin = await Login.update(
      {
        email: req.body.email,
      },
      { where: { id } }
    );
    const updateSignup = await signup.update(
      {
        name: req.body.name,
        aadharNumber: req.body.aadhar,
        phoneNumber: req.body.phoneNumber,
        dob: req.body.birthdayDate,
        address: req.body.address,
        country: req.body.country,
        state: req.body.state,
        loginId: updatedlogin.id,
        pinCode: req.body.pincode,
      },
      { where: { id } }
    );

    return res.json(goodResponse({ updateSignup }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};
