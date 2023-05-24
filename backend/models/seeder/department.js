const department = require('../department');
const sequelize = require('../../config/sequelize_config');
require('dotenv').config();

// Define the data to be inserted
const departmentDetails = [
  { name: 'Cardiology', departmentId: 1 },
  { name: 'Neurology', departmentId: 2 },
  { name: 'Orthopedics', departmentId: 3 },
  { name: 'Oncology', departmentId: 4 },
  { name: 'Pediatrics', departmentId: 5 },
];

const seed = async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => console.log('Connected to database'));

    await sequelize.sync({ force: false });

    console.log('Database synced');

    for (const eachData of departmentDetails) {
      const exists = await department.findOne({
        where: { name: eachData.name },
      });
      if (!exists) {
        const departments = new department(eachData);

        const data = await departments.save();
      } else console.log(`The ${eachData.name} Exists`);
    }
  } catch (e) {
    console.log(e.message);
  }
  sequelize.close();
};

seed();
