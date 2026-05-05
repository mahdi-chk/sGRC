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
        const columns = [
            ['recommendationWorkflowStatus', { type: Sequelize.STRING(60), allowNull: false, defaultValue: 'cree' }],
            ['recommendationLastComment', { type: Sequelize.TEXT, allowNull: true }],
            ['recommendationPlanAction', { type: Sequelize.TEXT, allowNull: true }],
            ['recommendationEvaluationAvancement', { type: Sequelize.STRING(40), allowNull: true }],
            ['recommendationSentAt', { type: Sequelize.DATE, allowNull: true }],
            ['recommendationPlanSubmittedAt', { type: Sequelize.DATE, allowNull: true }],
            ['recommendationPlanValidatedAt', { type: Sequelize.DATE, allowNull: true }],
            ['recommendationProgressSubmittedAt', { type: Sequelize.DATE, allowNull: true }],
            ['recommendationProgressValidatedAt', { type: Sequelize.DATE, allowNull: true }],
            ['recommendationClosedAt', { type: Sequelize.DATE, allowNull: true }],
            ['recommendationFinalClosedAt', { type: Sequelize.DATE, allowNull: true }],
        ];

        for (const [name, definition] of columns) {
            if (!(await columnExists(queryInterface, 'audit_missions', name))) {
                await queryInterface.addColumn('audit_missions', name, definition);
            }
        }

        if (!(await indexExists(queryInterface, 'audit_missions', 'idx_audit_missions_recommendation_workflow_status'))) {
            await queryInterface.addIndex('audit_missions', ['recommendationWorkflowStatus'], {
                name: 'idx_audit_missions_recommendation_workflow_status',
            });
        }
    },

    async down(queryInterface) {
        if (await indexExists(queryInterface, 'audit_missions', 'idx_audit_missions_recommendation_workflow_status')) {
            await queryInterface.removeIndex('audit_missions', 'idx_audit_missions_recommendation_workflow_status');
        }

        const columns = [
            'recommendationFinalClosedAt',
            'recommendationClosedAt',
            'recommendationProgressValidatedAt',
            'recommendationProgressSubmittedAt',
            'recommendationPlanValidatedAt',
            'recommendationPlanSubmittedAt',
            'recommendationSentAt',
            'recommendationEvaluationAvancement',
            'recommendationPlanAction',
            'recommendationLastComment',
            'recommendationWorkflowStatus',
        ];

        for (const name of columns) {
            if (await columnExists(queryInterface, 'audit_missions', name)) {
                await queryInterface.removeColumn('audit_missions', name);
            }
        }
    },
};
