const consultation = require('../../models/consultation');
const signup = require('../../models/sign_up');
const department = require('../../models/department');
const doctor = require('../../models/doctor');
const hospital = require('../../models/hospital');
const Web3 = require('web3');
const transaction = require('../../models/transaction');
const consultationCertificate = require('../../models/certificate');
const vaccineCertificate = require('../../models/vaccinecertificate');

const { goodResponse, failedResponse } = require('../../helper/response');
const { initiateTask, startTask, stopTask } = require('../../modules/cron');
const { Op, where } = require('sequelize');

exports.consultationCertificates = async (req, res, next) => {
  try {
    const web3 = new Web3(
      'https://polygon-mumbai.g.alchemy.com/v2/VaqVlq1twdiBZ8T8FbvJNwziipAHupP2'
    );

    const response = await web3.eth.getTransactionReceipt(
      req.body.transactionHash
    );
    const transactionRecord = await transaction.create({
      transactionHash: req.body.transactionHash,
      amount: 0,
      signupId: req.body.patientRegId,
      appointmentType: 'consultationCertificate',
    });

    const consultationCertRecord = await consultationCertificate.create({
      certificateNumber: req.body.certificateNumber,
      patientUUID: req.body.patientUUID,
      patientRegId: req.body.patientRegId,
      patientName: req.body.patientName,
      doctorName: req.body.doctorName,
      hospitalName: req.body.hospitalName,
      consultationTime: req.body.consultationTime,
      departmentName: req.body.departmentName,
      issuerName: req.body.issuerName,
      issuerId: req.body.issuerId,
      issuedDateTime: req.body.issuedDateTime,
      transactionId: transactionRecord.id,
    });

    const transactionOnSuccess = initiateTask('*/5 * * * * *', async () => {
      try {
        console.log(transactionRecord, response.status);
        if (response.status === true) {
          const data = await transaction.update(
            { status: true },
            { where: { id: transactionRecord.id }, returning: true }
          );
          stopTask(transactionOnSuccess, 'transactionOnSuccess');
        }
      } catch (err) {
        console.log(err);
      }
    });
    // generatePDF();
    startTask(transactionOnSuccess, 'transactionOnSuccess');

    res.json({ status: true, message: 'Cron job started' });
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};

exports.vaccineCertificates = async (req, res, next) => {
  try {
    const web3 = new Web3(
      'https://polygon-mumbai.g.alchemy.com/v2/VaqVlq1twdiBZ8T8FbvJNwziipAHupP2'
    );

    const response = await web3.eth.getTransactionReceipt(
      req.body.transactionHash
    );
    const transactionRecord = await transaction.create({
      transactionHash: req.body.transactionHash,
      amount: 0,
      signupId: req.body.patientRegId,
      appointmentType: 'vaccinationCertificate',
    });

    const vaccinationCertRecord = await vaccineCertificate.create({
      certificateNumber: req.body.certificateNumber,
      patientName: req.body.patientName,
      patientUUID: req.body.patientUUID,
      patientRegId: req.body.patientRegId,
      vaccineName: req.body.vaccineName,
      antigen: req.body.antigen,
      disease: req.body.disease,
      vaccineTakenDatetime: req.body.vaccineTakenDatetime,

      issuerName: req.body.issuerName,
      issuerId: req.body.issuerId,
      issuedDateTime: req.body.issuedDateTime,
      transactionId: transactionRecord.id,
    });

    const transactionOnSuccess = initiateTask('*/5 * * * * *', async () => {
      try {
        console.log(transactionRecord, response.status);
        if (response.status === true) {
          const data = await transaction.update(
            { status: true },
            { where: { id: transactionRecord.id }, returning: true }
          );
          stopTask(transactionOnSuccess, 'transactionOnSuccess');
        }
      } catch (err) {
        console.log(err);
      }
    });
    // generatePDF();
    startTask(transactionOnSuccess, 'transactionOnSuccess');

    res.json({ status: true, message: 'Cron job started' });
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};
