const transaction = require('../../models/transaction');
const { failedResponse, goodResponse } = require('../../helper/response');
const user = require('../../models/sign_up');
//List

exports.listTransaction = async (req, res, next) => {
  try {
    const isRole = req.userData.role;
    if (isRole === 'admin') {
      const translist = await transaction.findAll({
        include: [
          {
            model: user,
          },
        ],
      });
      return res.json(goodResponse({ translist }, 'Data is'));
    } else {
      const isUser = await user.findOne({
        where: { loginId: req.userData.id },
      });
      const translist = await transaction.findAll({
        where: { signupId: isUser.id },
        include: [
          {
            model: user,
          },
        ],
      });

      return res.json(goodResponse({ translist }, 'Data is'));
    }
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};
