const login = require('../login');

const hashing = async (password) => {
  const salt = await login.generateSalt();
  let newPassword = await login.hashPassword(password, salt);
  return { salt, newPassword };
};

(async () => {
  try {
    let { salt, newPassword } = await hashing('admin@123');

    const adminData = {
      email: 'admin@gmail.com',
      role: 'admin',
    };

    let existingData = await login.findOne({
      where: { email: adminData.email },
    });

    if (!existingData) {
      const loginDetails = await login.create({
        ...adminData,
        password: newPassword,
        salt,
      });
      console.log('Admin created successfully');
    } else {
      console.log(`Data already exists`);
    }
  } catch (e) {
    console.log('error', e.message);
  }
})();
