'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('compliance_frameworks', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            code: { allowNull: false, type: Sequelize.STRING(50) },
            name: { allowNull: false, type: Sequelize.STRING(120) },
            version: { allowNull: false, type: Sequelize.STRING(50) },
            jurisdiction: { allowNull: true, type: Sequelize.STRING(120) },
            description: { allowNull: true, type: Sequelize.TEXT },
            ownerUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            departmentId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'departments', key: 'id' }, onDelete: 'SET NULL' },
            entityKey: { allowNull: true, type: Sequelize.STRING(100) },
            status: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'draft' },
            effectiveDate: { allowNull: true, type: Sequelize.DATE },
            reviewDate: { allowNull: true, type: Sequelize.DATE },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });

        await queryInterface.createTable('compliance_requirements', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            frameworkId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'compliance_frameworks', key: 'id' }, onDelete: 'CASCADE' },
            code: { allowNull: false, type: Sequelize.STRING(80) },
            title: { allowNull: false, type: Sequelize.STRING(255) },
            description: { allowNull: true, type: Sequelize.TEXT },
            chapter: { allowNull: true, type: Sequelize.STRING(120) },
            orderIndex: { allowNull: false, type: Sequelize.INTEGER, defaultValue: 0 },
            applicability: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'applicable' },
            status: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'active' },
            weight: { allowNull: false, type: Sequelize.FLOAT, defaultValue: 1 },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });

        await queryInterface.createTable('compliance_mappings', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            requirementId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'compliance_requirements', key: 'id' }, onDelete: 'CASCADE' },
            sourceType: { allowNull: false, type: Sequelize.STRING(40) },
            sourceId: { allowNull: true, type: Sequelize.INTEGER },
            relatedEntityKey: { allowNull: true, type: Sequelize.STRING(100) },
            coverageLevel: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'partial' },
            rationale: { allowNull: true, type: Sequelize.TEXT },
            ownerUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            departmentId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'departments', key: 'id' }, onDelete: 'SET NULL' },
            entityKey: { allowNull: true, type: Sequelize.STRING(100) },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });

        await queryInterface.createTable('compliance_campaigns', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            frameworkId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'compliance_frameworks', key: 'id' }, onDelete: 'CASCADE' },
            title: { allowNull: false, type: Sequelize.STRING(255) },
            status: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'draft' },
            ownerUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            assignedUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            departmentId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'departments', key: 'id' }, onDelete: 'SET NULL' },
            entityKey: { allowNull: true, type: Sequelize.STRING(100) },
            dueDate: { allowNull: true, type: Sequelize.DATE },
            startedAt: { allowNull: true, type: Sequelize.DATE },
            completedAt: { allowNull: true, type: Sequelize.DATE },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });

        await queryInterface.createTable('compliance_gaps', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            requirementId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'compliance_requirements', key: 'id' }, onDelete: 'SET NULL' },
            title: { allowNull: false, type: Sequelize.STRING(255) },
            description: { allowNull: true, type: Sequelize.TEXT },
            severity: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'medium' },
            status: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'open' },
            sourceType: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'assessment' },
            sourceId: { allowNull: true, type: Sequelize.INTEGER },
            ownerUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            departmentId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'departments', key: 'id' }, onDelete: 'SET NULL' },
            entityKey: { allowNull: true, type: Sequelize.STRING(100) },
            dueDate: { allowNull: true, type: Sequelize.DATE },
            remediationActionId: { allowNull: true, type: Sequelize.STRING(100) },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });

        await queryInterface.createTable('compliance_evidence', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            requirementId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'compliance_requirements', key: 'id' }, onDelete: 'SET NULL' },
            title: { allowNull: false, type: Sequelize.STRING(255) },
            sourceType: { allowNull: false, type: Sequelize.STRING(40) },
            sourceId: { allowNull: true, type: Sequelize.INTEGER },
            filename: { allowNull: true, type: Sequelize.STRING(255) },
            filePath: { allowNull: true, type: Sequelize.STRING(500) },
            mimeType: { allowNull: true, type: Sequelize.STRING(120) },
            ownerUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            departmentId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'departments', key: 'id' }, onDelete: 'SET NULL' },
            entityKey: { allowNull: true, type: Sequelize.STRING(100) },
            capturedAt: { allowNull: true, type: Sequelize.DATE },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });

        await queryInterface.createTable('compliance_audit_trail', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            entityType: { allowNull: false, type: Sequelize.STRING(60) },
            entityId: { allowNull: false, type: Sequelize.INTEGER },
            action: { allowNull: false, type: Sequelize.STRING(60) },
            actorUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            departmentId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'departments', key: 'id' }, onDelete: 'SET NULL' },
            entityKey: { allowNull: true, type: Sequelize.STRING(100) },
            payload: { allowNull: true, type: Sequelize.TEXT },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('compliance_audit_trail');
        await queryInterface.dropTable('compliance_evidence');
        await queryInterface.dropTable('compliance_gaps');
        await queryInterface.dropTable('compliance_campaigns');
        await queryInterface.dropTable('compliance_mappings');
        await queryInterface.dropTable('compliance_requirements');
        await queryInterface.dropTable('compliance_frameworks');
    },
};
