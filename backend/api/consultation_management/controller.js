const consultation = require('../../models/consultation');
const signup = require('../../models/sign_up');
const department = require('../../models/department');
const doctor = require('../../models/doctor');
const hospital = require('../../models/hospital');
const Web3 = require('web3');
const transaction = require('../../models/transaction');

const { goodResponse, failedResponse } = require('../../helper/response');
const { initiateTask, startTask, stopTask } = require('../../modules/cron');
const { Op, where } = require('sequelize');

exports.addConsultationInfo = async (req, res, next) => {
  try {
    const web3 = new Web3(
      'https://polygon-mumbai.g.alchemy.com/v2/VaqVlq1twdiBZ8T8FbvJNwziipAHupP2'
    );

    const response = await web3.eth.getTransactionReceipt(
      req.body.result.transactionHash
    );

    const currentUserId = await signup.findOne({ loginId: req.user.id });
    console.log(currentUserId);

    const transactionData = await transaction.create({
      from: response.from,
      to: response.to,
      transactionHash: response.transactionHash,
      amount: 0.01,
      signupId: currentUserId.id,
    });

    const consultationData = await consultation.create({
      ...req.body,
      doctorId: req.body.doctor,
      hospitalId: req.body.hospital,
      departmentId: req.body.department,
      transactionId: transactionData.id,
      signupId: currentUserId.id,
    });

    const transactionOnSuccess = initiateTask('*/5 * * * * *', async () => {
      try {
        if (response.status === true) {
          const [onUpdate, [updateData]] = await transaction.update(
            { status: true },
            { where: { id: transactionData.id }, returning: true }
          );
          stopTask(transactionOnSuccess, 'transactionOnSuccess');
        }
      } catch (err) {
        console.log(err);
      }
    });

    startTask(transactionOnSuccess, 'transactionOnSuccess');
    res.json({ status: true, message: 'Cron job started' });
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};

exports.getConsultation = async (req, res, next) => {
  try {
   
    const isRole = req.userData.role;
    if (isRole === 'admin') {
      const consult = await consultation.findAll({
        include: [
          {
            model: department,
          },
          {
            model: doctor,
          },
          {
            model: hospital,
          },
        ],
      });
      return res.json(goodResponse({ consult }, 'Data is'));
    } else {
      const isUser = await signup.findOne({ where: { loginId: req.user.id } });
      const consult = await consultation.findAll({
        where: { signupId: isUser.id },
        include: [
          {
            model: department,
          },
          {
            model: doctor,
          },
          {
            model: hospital,
          },
          {
            model: signup,
          },
        ],
      });
      return res.json(goodResponse({ consult }, 'Data is'));
    }
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};

//List Times
exports.getTimeSlots = async (req, res, next) => {
  try {
    const { doctorId } = req.query;
    const times = await consultation.findAll({ where: { doctorId: doctorId } });

    return res.json(goodResponse({ times }, 'Data is'));
  } catch (err) {
    console.error(err);
    return res.json(failedResponse(err.message));
  }
};

// cancellation
exports.cancellation = async (req, res, next) => {
  try {
    console.log('req.body', req.body);
    const id = req.params.id;
    console.log('id', id);

    const updateconsult = await consultation.update(
      { status: 'cancel' },
      { where: { id: id } }
    );

    return res.json(goodResponse({ updateconsult }, 'data'));
  } catch (err) {
    return res.json(failedResponse(err.message));
  }
};
