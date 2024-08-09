'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('review', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      course_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      ratting: {
        type: Sequelize.TINYINT,
        defaultValue: 1,
        allowNull: false
      },
      note: {
        type: Sequelize.TEXT('long'),
        allowNull: true
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
    await queryInterface.addConstraint('review', {
      type: 'foreign key',
      name: 'review_course_id',
      fields: ['course_id'],
      references: {
        table: 'course',
        field: 'id'
      },
      onDelete: 'CASCADE'
    })

    await queryInterface.addConstraint('review', {
      type: 'unique',
      name: 'unique_review_course_user',
      fields: ['course_id', 'user_id']
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('review');
  }
};
