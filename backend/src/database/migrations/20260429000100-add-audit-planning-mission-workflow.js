'use strict';

async function tableExists(queryInterface, tableName) {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = ${queryInterface.sequelize.escape(tableName)}
    `);

    return rows.length > 0;
}

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
        if (!(await columnExists(queryInterface, 'audit_missions', 'missionOrderReference'))) {
            await queryInterface.addColumn('audit_missions', 'missionOrderReference', {
                type: Sequelize.STRING(120),
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'missionOrderSentAt'))) {
            await queryInterface.addColumn('audit_missions', 'missionOrderSentAt', {
                type: Sequelize.DATE,
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'missionOrderSentById'))) {
            await queryInterface.addColumn('audit_missions', 'missionOrderSentById', {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'workProgramStatus'))) {
            await queryInterface.addColumn('audit_missions', 'workProgramStatus', {
                type: Sequelize.STRING(40),
                allowNull: false,
                defaultValue: 'draft',
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'workProgramSubmittedAt'))) {
            await queryInterface.addColumn('audit_missions', 'workProgramSubmittedAt', {
                type: Sequelize.DATE,
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'workProgramValidatedAt'))) {
            await queryInterface.addColumn('audit_missions', 'workProgramValidatedAt', {
                type: Sequelize.DATE,
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'workProgramApprovedAt'))) {
            await queryInterface.addColumn('audit_missions', 'workProgramApprovedAt', {
                type: Sequelize.DATE,
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'workProgramLastComment'))) {
            await queryInterface.addColumn('audit_missions', 'workProgramLastComment', {
                type: Sequelize.TEXT,
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'workProgramPreparedById'))) {
            await queryInterface.addColumn('audit_missions', 'workProgramPreparedById', {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'workProgramValidatedById'))) {
            await queryInterface.addColumn('audit_missions', 'workProgramValidatedById', {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'workProgramApprovedById'))) {
            await queryInterface.addColumn('audit_missions', 'workProgramApprovedById', {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'reportStatus'))) {
            await queryInterface.addColumn('audit_missions', 'reportStatus', {
                type: Sequelize.STRING(40),
                allowNull: false,
                defaultValue: 'draft',
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'reportSubmittedAt'))) {
            await queryInterface.addColumn('audit_missions', 'reportSubmittedAt', {
                type: Sequelize.DATE,
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'reportValidatedAt'))) {
            await queryInterface.addColumn('audit_missions', 'reportValidatedAt', {
                type: Sequelize.DATE,
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'reportApprovedAt'))) {
            await queryInterface.addColumn('audit_missions', 'reportApprovedAt', {
                type: Sequelize.DATE,
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'reportLastComment'))) {
            await queryInterface.addColumn('audit_missions', 'reportLastComment', {
                type: Sequelize.TEXT,
                allowNull: true,
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'reportPreparedById'))) {
            await queryInterface.addColumn('audit_missions', 'reportPreparedById', {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'reportValidatedById'))) {
            await queryInterface.addColumn('audit_missions', 'reportValidatedById', {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
            });
        }

        if (!(await columnExists(queryInterface, 'audit_missions', 'reportApprovedById'))) {
            await queryInterface.addColumn('audit_missions', 'reportApprovedById', {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
            });
        }

        if (!(await tableExists(queryInterface, 'audit_mission_workflow_events'))) {
            await queryInterface.createTable('audit_mission_workflow_events', {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                missionId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'audit_missions',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                },
                workflowType: {
                    type: Sequelize.STRING(40),
                    allowNull: false,
                },
                transitionCode: {
                    type: Sequelize.STRING(60),
                    allowNull: false,
                },
                fromStatus: {
                    type: Sequelize.STRING(40),
                    allowNull: true,
                },
                toStatus: {
                    type: Sequelize.STRING(40),
                    allowNull: true,
                },
                actorUserId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                },
                comment: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                is_deleted: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                deleted_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('GETDATE()'),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('GETDATE()'),
                },
            });
        }

        if (!(await indexExists(queryInterface, 'audit_missions', 'audit_missions_work_program_status'))) {
            await queryInterface.addIndex('audit_missions', ['workProgramStatus'], {
                name: 'audit_missions_work_program_status',
            });
        }

        if (!(await indexExists(queryInterface, 'audit_missions', 'audit_missions_report_status'))) {
            await queryInterface.addIndex('audit_missions', ['reportStatus'], {
                name: 'audit_missions_report_status',
            });
        }

        if (!(await indexExists(queryInterface, 'audit_mission_workflow_events', 'audit_mission_workflow_events_mission_id'))) {
            await queryInterface.addIndex('audit_mission_workflow_events', ['missionId'], {
                name: 'audit_mission_workflow_events_mission_id',
            });
        }
    },

    async down(queryInterface) {
        if (await tableExists(queryInterface, 'audit_mission_workflow_events')) {
            await queryInterface.dropTable('audit_mission_workflow_events');
        }

        const missionColumns = [
            'reportApprovedById',
            'reportValidatedById',
            'reportPreparedById',
            'reportLastComment',
            'reportApprovedAt',
            'reportValidatedAt',
            'reportSubmittedAt',
            'reportStatus',
            'workProgramApprovedById',
            'workProgramValidatedById',
            'workProgramPreparedById',
            'workProgramLastComment',
            'workProgramApprovedAt',
            'workProgramValidatedAt',
            'workProgramSubmittedAt',
            'workProgramStatus',
            'missionOrderSentById',
            'missionOrderSentAt',
            'missionOrderReference',
        ];

        for (const columnName of missionColumns) {
            if (await columnExists(queryInterface, 'audit_missions', columnName)) {
                await queryInterface.removeColumn('audit_missions', columnName);
            }
        }
    },
};
