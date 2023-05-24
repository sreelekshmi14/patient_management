const disease = require('../diseaseNames');
const sequelize = require('../../config/sequelize_config');
require('dotenv').config();

// Define the data to be inserted
const diseaseDetails = [
  { name: 'Chickenpox' },
  { name: 'Viral Fever' },
  { name: 'Diabetes' },
  { name: 'Hypertension' },
  { name: 'Kidney disease' },
  { name: 'Stroke' },
  { name: 'Allergies' },
  { name: 'Heart disease' },
  { name: 'Migraine' },
  { name: 'Cancer' },
  { name: 'Depression' },
  { name: 'Tuberculosis' },
  { name: 'Thyroid disorder' },
  { name: 'Alzheimer' },
  { name: 'HIV/AIDS' },
];

const seed = async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => console.log('Connected to database'));

    await sequelize.sync({ force: false });

    console.log('Database synced');

    for (const eachData of diseaseDetails) {
      const exists = await disease.findOne({
        where: { name: eachData.name },
      });
      if (!exists) {
        const diseases = new disease(eachData);

        const data = await diseases.save();
      } else console.log(`The ${eachData.name} Exists`);
    }
  } catch (e) {
    console.log(e.message);
  }
  sequelize.close();
};

seed();
