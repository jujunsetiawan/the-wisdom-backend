'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('chapter', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      course_id: {
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
    await queryInterface.addConstraint('chapter', {
      type: 'foreign key',
      name: 'chapter_course_id',
      fields: ['course_id'],
      references: {
        table: 'course',
        field: 'id'
      },
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('chapter')
  }
};
