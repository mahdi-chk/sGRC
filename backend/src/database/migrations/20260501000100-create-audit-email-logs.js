'use strict';

async function tableExists(queryInterface, tableName) {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = ${queryInterface.sequelize.escape(tableName)}
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
        if (!(await tableExists(queryInterface, 'audit_email_logs'))) {
            await queryInterface.createTable('audit_email_logs', {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                planId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'audit_plans',
                        key: 'id',
                    },
                },
                missionId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'audit_missions',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                },
                scope: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                templateCode: {
                    type: Sequelize.STRING(80),
                    allowNull: false,
                },
                subject: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                recipientEmail: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                recipientName: {
                    type: Sequelize.STRING(255),
                    allowNull: true,
                },
                recipientUserId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                },
                actorName: {
                    type: Sequelize.STRING(255),
                    allowNull: true,
                },
                deliveryStatus: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                errorMessage: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                messageId: {
                    type: Sequelize.STRING(255),
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
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
            });
        }

        if (!(await indexExists(queryInterface, 'audit_email_logs', 'audit_email_logs_plan_id'))) {
            await queryInterface.addIndex('audit_email_logs', ['planId'], {
                name: 'audit_email_logs_plan_id',
            });
        }

        if (!(await indexExists(queryInterface, 'audit_email_logs', 'audit_email_logs_mission_id'))) {
            await queryInterface.addIndex('audit_email_logs', ['missionId'], {
                name: 'audit_email_logs_mission_id',
            });
        }

        if (!(await indexExists(queryInterface, 'audit_email_logs', 'audit_email_logs_delivery_status'))) {
            await queryInterface.addIndex('audit_email_logs', ['deliveryStatus'], {
                name: 'audit_email_logs_delivery_status',
            });
        }

        if (!(await indexExists(queryInterface, 'audit_email_logs', 'audit_email_logs_template_code'))) {
            await queryInterface.addIndex('audit_email_logs', ['templateCode'], {
                name: 'audit_email_logs_template_code',
            });
        }
    },

    async down(queryInterface) {
        if (await tableExists(queryInterface, 'audit_email_logs')) {
            await queryInterface.dropTable('audit_email_logs');
        }
    },
};
