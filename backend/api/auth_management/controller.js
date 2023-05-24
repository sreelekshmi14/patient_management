const login = require('../../models/login');
const signup = require('../../models/sign_up');
const transporter = require('../../modules/mailer');
const { goodResponse, failedResponse } = require('../../helper/response');
const jwt = require('jsonwebtoken');
const { jwts } = require('../../config');

//Add
exports.addPatient = async (req, res, next) => {
  try {
    const isExist = await login.findOne({ where: { email: req.body.email } });
    if (isExist) {
      return res.json(failedResponse('Email must be unique'));
    }
    const isAadhar = await signup.findOne({
      where: { aadharNumber: req.body.aadhar },
    });
    if (isAadhar) {
      return res.json(failedResponse('Aadhar Number must be unique'));
    }
    const salt = await login.generateSalt();
    password = await login.hashPassword(req.body.password, salt);
    req.body.salt = salt;
    await login.create({
      email: req.body.email,
      password: password,
      salt: req.body.salt,
    });

    const logDetails = await login.findOne({
      where: { email: req.body.email },
    });

    const newPatient = await signup.create({
      name: req.body.name,
      aadharNumber: req.body.aadhar,
      phoneNumber: req.body.phoneNumber,
      dob: req.body.birthdayDate,
      address: req.body.address,
      country: req.body.country,
      state: req.body.state,
      loginId: logDetails.id,
      pinCode: req.body.pincode,
    });
    let mailOptions = {
      to: req.body.email,
      subject: 'Successfully Registered',
      text: `Your username is ${req.body.name} and password is ${req.body.password}`,
    };

    const info = transporter.sendMail(mailOptions);
    return res.json(goodResponse({ newPatient }, 'Added Successfully'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await login.findOne({ where: { email: email } });

    if (!admin) {
      return res.json(failedResponse('Invalid Email'));
    }
    if (!(await login.verifyPassword(password, admin.password, admin.salt))) {
      return res.json(failedResponse('Invalid Email or Password'));
    }
    const accessToken = login.generateAuthToken(admin);
    const refreshToken = login.generateAuthToken(admin);
    const role = admin.role;

    return res.send({
      success: true,
      message: 'Logged in',
      data: {
        accessToken,
        refreshToken,
        role: role,
      },
    });
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};
// exports.getProfile = async (req, res) => {
//   try {
    
//     console.log(req.userData);

//     if (req.userData.role === 'patient') {
//       let profile = await signup.findOne({
//         where: { loginId: req.userData.id },
//         include: [{ model: login }],
//       });
//       return res.json(goodResponse({ profile }, 'success'));
//     } else {
//       let profile = await login.findByPk(req.userData.id);
//       console.log(profile);
//       return res.json(goodResponse({ profile }, 'success'));
//     }
//   } catch (e) {
//     return res.json(failedResponse(e.message));
//   }
// };
