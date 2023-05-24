const hospital = require('../hospital');
const sequelize = require('../../config/sequelize_config');
require('dotenv').config();

// Define the data to be inserted
const hospitalDetails = [
  { name: 'Greenwood Hospital', hospitalId: 1 },
  { name: 'Westfield Hospital', hospitalId: 2 },
  { name: 'Lakeside Hospital', hospitalId: 3 },
  { name: 'Sunrise Hospital ', hospitalId: 4 },
  { name: 'Maplewood Hospital', hospitalId: 5 },
];

const seed = async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => console.log('Connected to database'));

    await sequelize.sync({ force: false });

    console.log('Database synced');

    for (const eachData of hospitalDetails) {
      const exists = await hospital.findOne({
        where: { name: eachData.name },
      });
      if (!exists) {
        const hospitals = new hospital(eachData);

        const data = await hospitals.save();
      } else console.log(`The ${eachData.name} Exists`);
    }
  } catch (e) {
    console.log(e.message);
  }
  sequelize.close();
};

seed();
