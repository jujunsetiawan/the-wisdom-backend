'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('course', {
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
      certificate: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      thumbnail: {
        type: Sequelize.STRING,
        allowNull: true
      },
      type: {
        type: Sequelize.ENUM('free', 'premium'),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('draft', 'published'),
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      level: {
        type: Sequelize.ENUM('all-level', 'beginner', 'intermediate', 'advance'),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      mentor_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
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
    await queryInterface.addConstraint('course', {
      type: 'foreign key',
      name: 'course_mentor_id',
      fields: ['mentor_id'],
      references: {
        table: 'mentor',
        field: 'id'
      },
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('course');
  }
};
