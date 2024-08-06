'use strict';
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [
      {
        name: 'Jun',
        profession: 'admin micro',
        role: 'admin',
        email: 'jun@gmail.com',
        password: await bcrypt.hash('rahasia123@', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Juntakeda',
        profession: 'software enginer',
        role: 'student',
        email: 'juntakeda@gmail.com',
        password: await bcrypt.hash('rahasia123@', 10),
        created_at: new Date(),
        updated_at: new Date()
      },  
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
