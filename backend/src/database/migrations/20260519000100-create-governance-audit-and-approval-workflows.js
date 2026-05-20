'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('governance_audit_events', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            method: { allowNull: false, type: Sequelize.STRING(12) },
            action: { allowNull: false, type: Sequelize.STRING(80) },
            module: { allowNull: false, type: Sequelize.STRING(120) },
            target: { allowNull: false, type: Sequelize.STRING(500) },
            actorUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            actorEmail: { allowNull: false, type: Sequelize.STRING(180) },
            actorRole: { allowNull: false, type: Sequelize.STRING(80) },
            departmentId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'departments', key: 'id' }, onDelete: 'SET NULL' },
            statusCode: { allowNull: false, type: Sequelize.INTEGER },
            status: { allowNull: false, type: Sequelize.STRING(40) },
            statusClass: { allowNull: false, type: Sequelize.STRING(40) },
            details: { allowNull: false, type: Sequelize.STRING(1000) },
            path: { allowNull: false, type: Sequelize.STRING(700) },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });

        await queryInterface.addIndex('governance_audit_events', ['createdAt']);
        await queryInterface.addIndex('governance_audit_events', ['actorUserId']);
        await queryInterface.addIndex('governance_audit_events', ['departmentId']);
        await queryInterface.addIndex('governance_audit_events', ['module']);
        await queryInterface.addIndex('governance_audit_events', ['statusClass']);

        await queryInterface.createTable('governance_approval_workflows', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            title: { allowNull: false, type: Sequelize.STRING(255) },
            scope: { allowNull: false, type: Sequelize.STRING(500) },
            folderKey: { allowNull: false, type: Sequelize.STRING(100) },
            folderLabel: { allowNull: false, type: Sequelize.STRING(180) },
            documentName: { allowNull: true, type: Sequelize.STRING(500) },
            documentPath: { allowNull: true, type: Sequelize.STRING(700) },
            targetType: { allowNull: false, type: Sequelize.STRING(60), defaultValue: 'document' },
            targetId: { allowNull: true, type: Sequelize.STRING(180) },
            status: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'submitted' },
            priority: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'Normale' },
            requestedById: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            departmentId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'departments', key: 'id' }, onDelete: 'SET NULL' },
            dueDate: { allowNull: true, type: Sequelize.DATE },
            submittedAt: { allowNull: true, type: Sequelize.DATE },
            completedAt: { allowNull: true, type: Sequelize.DATE },
            currentStageIndex: { allowNull: false, type: Sequelize.INTEGER, defaultValue: 0 },
            description: { allowNull: true, type: Sequelize.TEXT },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });

        await queryInterface.addIndex('governance_approval_workflows', ['folderKey']);
        await queryInterface.addIndex('governance_approval_workflows', ['status']);
        await queryInterface.addIndex('governance_approval_workflows', ['priority']);
        await queryInterface.addIndex('governance_approval_workflows', ['departmentId']);
        await queryInterface.addIndex('governance_approval_workflows', ['dueDate']);
        await queryInterface.addIndex('governance_approval_workflows', ['folderKey', 'documentName'], { unique: true });

        await queryInterface.createTable('governance_approval_stages', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            workflowId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'governance_approval_workflows', key: 'id' }, onDelete: 'CASCADE' },
            stageIndex: { allowNull: false, type: Sequelize.INTEGER },
            role: { allowNull: false, type: Sequelize.STRING(160) },
            owner: { allowNull: true, type: Sequelize.STRING(180) },
            rule: { allowNull: false, type: Sequelize.STRING(1000) },
            status: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'todo' },
            decision: { allowNull: true, type: Sequelize.STRING(40) },
            actorUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            comment: { allowNull: true, type: Sequelize.TEXT },
            decidedAt: { allowNull: true, type: Sequelize.DATE },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });

        await queryInterface.addIndex('governance_approval_stages', ['workflowId']);
        await queryInterface.addIndex('governance_approval_stages', ['status']);
        await queryInterface.addIndex('governance_approval_stages', ['actorUserId']);
        await queryInterface.addIndex('governance_approval_stages', ['workflowId', 'stageIndex'], { unique: true });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('governance_approval_stages');
        await queryInterface.dropTable('governance_approval_workflows');
        await queryInterface.dropTable('governance_audit_events');
    },
};
