'use strict';

async function columnExists(queryInterface, tableName, columnName) {
  const [rows] = await queryInterface.sequelize.query(`
    SELECT 1 AS found
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = ${queryInterface.sequelize.escape(tableName)}
      AND COLUMN_NAME = ${queryInterface.sequelize.escape(columnName)}
  `);

  return rows.length > 0;
}

async function indexExists(queryInterface, tableName, indexName) {
  const [rows] = await queryInterface.sequelize.query(`
    SELECT 1 AS found
    FROM sys.indexes i
    INNER JOIN sys.tables t ON t.object_id = i.object_id
    WHERE t.name = ${queryInterface.sequelize.escape(tableName)}
      AND i.name = ${queryInterface.sequelize.escape(indexName)}
  `);

  return rows.length > 0;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    if (!(await columnExists(queryInterface, 'incidents', 'assigneeId'))) {
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
    }

    if (!(await indexExists(queryInterface, 'incidents', 'incidents_assignee_id'))) {
      await queryInterface.addIndex('incidents', ['assigneeId'], {
        name: 'incidents_assignee_id',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    if (await indexExists(queryInterface, 'incidents', 'incidents_assignee_id')) {
      await queryInterface.removeIndex('incidents', 'incidents_assignee_id');
    }

    if (await columnExists(queryInterface, 'incidents', 'assigneeId')) {
      await queryInterface.removeColumn('incidents', 'assigneeId');
    }
  }
};
