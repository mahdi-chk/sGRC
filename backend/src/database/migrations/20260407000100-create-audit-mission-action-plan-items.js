'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('audit_mission_action_plan_items', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
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
            ordre: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            regleDnssi: {
                type: Sequelize.STRING(120),
                allowNull: false,
            },
            recommandations: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            horizon: {
                type: Sequelize.STRING(40),
                allowNull: true,
            },
            priorite: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            responsableId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },
            responsableNom: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            echeance: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            etatAvancement: {
                type: Sequelize.STRING(40),
                allowNull: false,
                defaultValue: 'nok',
            },
            sourceExcelFile: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            sourceExcelSheet: {
                type: Sequelize.STRING(120),
                allowNull: true,
            },
            sourceExcelRow: {
                type: Sequelize.INTEGER,
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
                defaultValue: Sequelize.fn('GETDATE'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('GETDATE'),
            },
        });

        await queryInterface.addIndex('audit_mission_action_plan_items', ['missionId']);
        await queryInterface.addIndex('audit_mission_action_plan_items', ['responsableId']);
        await queryInterface.addIndex('audit_mission_action_plan_items', ['etatAvancement']);
        await queryInterface.addIndex('audit_mission_action_plan_items', ['echeance']);
    },

    async down(queryInterface) {
        await queryInterface.dropTable('audit_mission_action_plan_items');
    },
};
