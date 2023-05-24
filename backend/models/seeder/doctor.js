const doctor = require('../doctor');
const sequelize = require('../../config/sequelize_config');
require('dotenv').config();

// Define the data to be inserted
const doctorDetails = [
  {
    name: 'Dr. Michael Brown',
    departmentId: 1,
    hospitalId: 1,
  },
  {
    name: 'Dr. Emily Davis',
    departmentId: 2,
    hospitalId: 1,
  },
  {
    name: 'Dr. Robert Wilson',
    departmentId: 3,
    hospitalId: 1,
  },
  {
    name: 'Dr. Mia Anderson',
    departmentId: 4,
    hospitalId: 1,
  },
  {
    name: 'Dr. Noah Thompson',
    departmentId: 5,
    hospitalId: 1,
  },
  {
    name: 'Dr. Jennifer Martinez',
    departmentId: 1,
    hospitalId: 2,
  },
  {
    name: 'Dr. Andrew Thompson',
    departmentId: 2,
    hospitalId: 2,
  },
  {
    name: 'Dr. Jessica Lee',
    departmentId: 3,
    hospitalId: 2,
  },
  {
    name: 'Dr. Isabella Harris',
    departmentId: 4,
    hospitalId: 2,
  },
  {
    name: 'Dr. William Johnson',
    departmentId: 5,
    hospitalId: 2,
  },
  {
    name: 'Dr. David Wilson',
    departmentId: 1,
    hospitalId: 3,
  },
  {
    name: 'Dr. Samantha Miller',
    departmentId: 2,
    hospitalId: 3,
  },
  {
    name: 'Dr. Christopher Anderson',
    departmentId: 3,
    hospitalId: 3,
  },
  {
    name: 'Dr. Amelia Davis',
    departmentId: 4,
    hospitalId: 3,
  },
  {
    name: 'Dr. James Johnson',
    departmentId: 5,
    hospitalId: 3,
  },
  {
    name: 'Dr. Olivia Thompson',
    departmentId: 1,
    hospitalId: 4,
  },
  {
    name: 'Dr. Benjamin Davis',
    departmentId: 2,
    hospitalId: 4,
  },

  {
    name: 'Dr. Liam Wilson',
    departmentId: 2,
    hospitalId: 4,
  },
  {
    name: 'Dr. Ava Johnson',
    departmentId: 3,
    hospitalId: 4,
  },
  {
    name: 'Dr. Ethan Martinez',
    departmentId: 4,
    hospitalId: 4,
  },

  {
    name: 'Dr. Ethan Wilson',
    departmentId: 1,
    hospitalId: 5,
  },
  {
    name: 'Dr. Olivia Davis',
    departmentId: 2,
    hospitalId: 5,
  },
  {
    name: 'Dr. Ema Thompson',
    departmentId: 3,
    hospitalId: 5,
  },
  {
    name: 'Dr. Ava Thomas',
    departmentId: 4,
    hospitalId: 5,
  },
  {
    name: 'Dr. Liam Martinez',
    departmentId: 5,
    hospitalId: 5,
  },
];

const seed = async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => console.log('Connected to database'));

    await sequelize.sync({ force: false });

    console.log('Database synced');

    for (const eachData of doctorDetails) {
      const exists = await doctor.findOne({
        where: { name: eachData.name },
      });
      if (!exists) {
        const doctors = new doctor(eachData);

        const data = await doctors.save();
      } else console.log(`The ${eachData.name} Exists`);
    }
  } catch (e) {
    console.log(e.message);
  }
  sequelize.close();
};

seed();
