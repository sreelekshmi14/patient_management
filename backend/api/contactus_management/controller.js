const { goodResponse, failedResponse } = require('../../helper/response');
const contact = require('../../models/contact');
const transporter = require('../../modules/mailer');

//Add
const addContact = async (req, res, next) => {
  try {
    const data = await contact.create({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      message: req.body.message,
    });
    let mailOptions = {
      to: req.body.email,
      subject: 'your review',
      text: `Hi ${req.body.name} our representative will contact you shortly`,
    };

    const info = transporter.sendMail(mailOptions);
    let mailOptions2 = {
      to: 'admin@gmail.com',
      subject: 'New Message Submission',
      text: `Hi a message has been submitted by ${req.body.name} with message ${req.body.message} and phone number ${req.body.phoneNumber} `,
    };
    const info2 = transporter.sendMail(mailOptions2);
    return res.json(goodResponse({ data }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};
//List
const listContact = async (req, res, next) => {
  try {
    const contactlist = await contact.findAll({});
    return res.json(goodResponse({ contactlist }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};

//view
const viewContact = async (req, res, next) => {
  try {
    const id = req.params.id;
    const feedback = await contact.findByPk(id);
    // if (feedback.status === 'unread') {

    return res.json(goodResponse({ feedback }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};

//delete
const deleteContact = async (req, res) => {
  const id = req.params.id;
  try {
    const contacts = await contact.findByPk(id);

    await contacts.destroy();
    return res.json(goodResponse({ contacts }, 'Data is'));
  } catch (e) {
    return res.json(failedResponse(e.message));
  }
};

module.exports = { addContact, listContact, viewContact, deleteContact };
