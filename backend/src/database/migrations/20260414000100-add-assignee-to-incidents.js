'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('incidents', 'assigneeId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addIndex('incidents', ['assigneeId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('incidents', 'assigneeId');
  }
};
