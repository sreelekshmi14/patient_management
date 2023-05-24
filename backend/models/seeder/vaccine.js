const vaccine = require('../vaccine');
const sequelize = require('../../config/sequelize_config');

// Define the data to be inserted
const vaccineDetails = [
  {
    name: 'Sinovac COVID-19 Vaccine',
    disease: 'COVID-19',
    antigen: 'Inactivated SARS-CoV-2 virus',
  },
  {
    name: 'Mumps Vaccine',
    disease: 'Mumps',
    antigen: 'Mumps antigen',
  },
  {
    name: 'Measles-Mumps-Rubella (MMR) Vaccine',
    disease: 'Measles, Mumps, Rubella',
    antigen: 'Measles, Mumps, Rubella antigens',
  },
  {
    name: 'Hepatitis B Vaccine',
    disease: 'Hepatitis B',
    antigen: 'Hepatitis B surface antigen',
  },
  {
    name: 'Polio Vaccine',
    disease: 'Polio',
    antigen: 'Poliovirus antigens',
  },
  {
    name: 'Tetanus Vaccine',
    disease: 'Tetanus',
    antigen: 'Tetanus toxoid',
  },
];

const seed = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');

    await sequelize.sync({ force: false });
    console.log('Database synced');

    // Check if data exists in the database
    for (const eachData of vaccineDetails) {
      const data = await vaccine.findOne({
        where: {
          name: eachData.name,
        },
      });

      if (!data) {
        // Insert data into the database
        const user = await vaccine.bulkCreate(vaccineDetails);

        console.log('Data inserted');
      } else {
        console.log('Data already exists, skipping insertion');
      }
    }
  } catch (error) {
    console.error(error.message);
  }
  sequelize.close();
};

seed();
