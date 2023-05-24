const { failedResponse, goodResponse } = require('../../helper/response');

const login = require('../../models/login');

exports.changePassword = async (req, res, next) => {
  try {
    console.log(req.body);
    const { currentPassword, newPassword } = req.body;
    const { id } = req.userData;
    const user = await login.findOne({ where: { id } });
    if (
      !(await login.verifyPassword(currentPassword, user.password, user.salt))
    )
      return errorMessage('Incorrect Password.');
    const password = await login.hashPassword(newPassword, user.salt);
    await login.update({ password }, { where: { id } });
    return res.json(goodResponse({}, 'Data is'));
  } catch (err) {
    return res.json(failedResponse(err.message));
  }
};
