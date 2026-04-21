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

module.exports = {
    async up(queryInterface, Sequelize) {
        if (!(await columnExists(queryInterface, 'audit_missions', 'planActionType'))) {
            await queryInterface.addColumn('audit_missions', 'planActionType', {
                type: Sequelize.STRING(120),
                allowNull: true,
            });
        }
    },

    async down(queryInterface) {
        if (await columnExists(queryInterface, 'audit_missions', 'planActionType')) {
            await queryInterface.removeColumn('audit_missions', 'planActionType');
        }
    },
};
