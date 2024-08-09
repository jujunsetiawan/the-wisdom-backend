'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('my_course', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      course_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
    await queryInterface.addConstraint('my_course', {
      type: 'foreign key',
      name: 'my_course_id',
      fields: ['course_id'],
      references: {
        table: 'course',
        field: 'id'
      },
      onDelete: 'CASCADE'
    })

    await queryInterface.addConstraint('my_course', {
      type: 'unique',
      name: 'unique_my_course_user',
      fields: ['course_id', 'user_id']
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('my_course');
  }
};
