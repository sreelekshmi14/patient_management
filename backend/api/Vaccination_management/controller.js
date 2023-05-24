const Web3 = require('web3');
const {
  initiateTask,
  startTask,
  stopTask,
} = require('../../modules/cron/index');
const transaction = require('../../models/transaction');
const department = require('../../models/department');
const hospital = require('../../models/hospital');
const doctor = require('../../models/doctor');
const user = require('../../models/sign_up');
const login = require('../../models/login');
const { failedResponse, goodResponse } = require('../../helper/response');
// const { sendMail } = require('../../modules/nodemailer/node_mailer');
const vaccination = require('../../models/vaccination');
const vaccine = require('../../models/vaccine');

// create vaccination details
exports.vaccinationcreate = async (req, res, next) => {
  console.log('req.body', req.body);
  try {
    const currentUserId = await user.findOne({
      where: { loginId: req.user.id },
    });

    const web3 = new Web3(
      'https://polygon-mumbai.g.alchemy.com/v2/VaqVlq1twdiBZ8T8FbvJNwziipAHupP2'
    );

    const response = await web3.eth.getTransactionReceipt(
      req.body.transactionHash
    );

    const transactionData = await transaction.create({
      transactionHash: response.transactionHash,
      amount: 0.01,
      appointmentType: 'vaccination',
      signupId: currentUserId.id,
    });

    const vaccinationData = await vaccination.create({
      ...req.body,
      vaccineId: req.body.vaccine,
      transactionId: transactionData.id,
      hospitalId: req.body.hospital,
      signupId: currentUserId.id,
    });

    const transactionOnSuccess = initiateTask('*/10 * * * * *', async () => {
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
    return res.json(
      goodResponse({ vaccinationData }, 'your vaccination added successfully')
    );
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

// filter by time
exports.checkdate = async (req, res, next) => {
  try {
    const { doctorId, date } = req.query;

    const times = await vaccination.findAll({
      where: { date: req.query.date },
    });
    console.log('times', times);
    return res.json(goodResponse({ times }, 'Time slots'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};

exports.getVaccination = async (req, res, next) => {
  try {
    const isRole = req.userData.role;
    if (isRole === 'admin') {
      const vaccinations = await vaccination.findAll({
        include: [
          {
            model: vaccine,
          },
          {
            model: hospital,
          },
          {
            model: user,
          },
          {
            model: transaction,
          },
        ],
      });
      return res.json(goodResponse({ vaccinations }, 'Data is'));
    } else {
      const isUser = await user.findOne({ where: { loginId: req.user.id } });
      const vaccinations = await vaccination.findAll({
        where: { signupId: isUser.id },
        include: [
          {
            model: transaction,
          },
          {
            model: vaccine,
          },
          {
            model: hospital,
          },
          {
            model: user,
          },
        ],
      });

      return res.json(goodResponse({ vaccinations }, 'Data is'));
    }
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};
//list
exports.listvaccine = async (req, res, next) => {
  try {
    const vaccines = await vaccine.findAll({});

    return res.json(goodResponse({ vaccines }, ' listed Successfully'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};
//cancellation

exports.cancellation = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log('req.params.id', req.params.id);
    const datas = await vaccination.findByPk(id, {
      include: [
        {
          model: user,
        },
        {
          model: vaccine,
        },
        {
          model: transaction,
        },
      ],
    });
    console.log('data', datas);

    const updatevaccine = await vaccination.update(
      {
        status: 'cancel',
      },
      { where: { id: id } }
    );

    //mail confirmation

    // let filters = {
    //   to: datas.user.login.email,
    //   cc: 'viji@spericorn.com',
    //   subject: 'Cancellation of vaccination',
    //   content: `Cancelled Successfully.You can now get ur registration fee with in 10 working Days`,
    // };

    // let send = await sendMail(filters, res);
    return res.json(goodResponse({ updatevaccine }, 'Cancelled successfully'));
  } catch (error) {
    return res.json(failedResponse(error.message));
  }
};
