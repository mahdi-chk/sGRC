'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('governance_workflow_templates', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            module: { allowNull: false, type: Sequelize.STRING(40) },
            process: { allowNull: true, type: Sequelize.STRING(180) },
            title: { allowNull: false, type: Sequelize.STRING(255) },
            description: { allowNull: true, type: Sequelize.TEXT },
            isActive: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: true },
            version: { allowNull: false, type: Sequelize.INTEGER, defaultValue: 1 },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });

        await queryInterface.addIndex('governance_workflow_templates', ['module']);
        await queryInterface.addIndex('governance_workflow_templates', ['process']);
        await queryInterface.addIndex('governance_workflow_templates', ['isActive']);

        await queryInterface.createTable('governance_workflow_template_stages', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            templateId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'governance_workflow_templates', key: 'id' }, onDelete: 'CASCADE' },
            stageIndex: { allowNull: false, type: Sequelize.INTEGER },
            role: { allowNull: false, type: Sequelize.STRING(160) },
            owner: { allowNull: true, type: Sequelize.STRING(180) },
            rule: { allowNull: false, type: Sequelize.STRING(1000) },
            slaDays: { allowNull: true, type: Sequelize.INTEGER },
            escalationTo: { allowNull: true, type: Sequelize.STRING(180) },
            escalationRule: { allowNull: true, type: Sequelize.STRING(1000) },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });

        await queryInterface.addIndex('governance_workflow_template_stages', ['templateId']);
        await queryInterface.addIndex('governance_workflow_template_stages', ['templateId', 'stageIndex'], { unique: true });

        await queryInterface.createTable('governance_workflow_instance_overrides', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            workflowKey: { allowNull: false, unique: true, type: Sequelize.STRING(120) },
            sourceType: { allowNull: false, type: Sequelize.STRING(40) },
            sourceId: { allowNull: false, type: Sequelize.STRING(120) },
            module: { allowNull: false, type: Sequelize.STRING(40) },
            process: { allowNull: true, type: Sequelize.STRING(180) },
            title: { allowNull: true, type: Sequelize.STRING(255) },
            description: { allowNull: true, type: Sequelize.TEXT },
            stagesJson: { allowNull: false, type: Sequelize.TEXT },
            updatedById: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });

        await queryInterface.addIndex('governance_workflow_instance_overrides', ['workflowKey']);
        await queryInterface.addIndex('governance_workflow_instance_overrides', ['sourceType', 'sourceId']);
        await queryInterface.addIndex('governance_workflow_instance_overrides', ['module', 'process']);

        await queryInterface.createTable('governance_workflow_access_rules', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            module: { allowNull: false, type: Sequelize.STRING(40) },
            process: { allowNull: true, type: Sequelize.STRING(180) },
            principalType: { allowNull: false, type: Sequelize.STRING(20) },
            principalRole: { allowNull: true, type: Sequelize.STRING(80) },
            principalUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
            canView: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: true },
            canEdit: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: false },
            canApprove: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: false },
            canAdmin: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: false },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });

        await queryInterface.addIndex('governance_workflow_access_rules', ['module', 'process']);
        await queryInterface.addIndex('governance_workflow_access_rules', ['principalType']);
        await queryInterface.addIndex('governance_workflow_access_rules', ['principalRole']);
        await queryInterface.addIndex('governance_workflow_access_rules', ['principalUserId']);
    },

    async down(queryInterface) {
        await queryInterface.dropTable('governance_workflow_access_rules');
        await queryInterface.dropTable('governance_workflow_instance_overrides');
        await queryInterface.dropTable('governance_workflow_template_stages');
        await queryInterface.dropTable('governance_workflow_templates');
    },
};
