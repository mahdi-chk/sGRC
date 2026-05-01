'use strict';

const quote = (identifier) => `[${identifier}]`;

const lookupDefinitions = [
    {
        table: 'audit_plan_statuses',
        values: [
            { id: 1, code: 'cree', label: 'Cree', sortOrder: 1 },
            { id: 2, code: 'a_valider', label: 'A valider', sortOrder: 2 },
            { id: 3, code: 'valide_direction', label: 'Valide par Direction', sortOrder: 3 },
            { id: 4, code: 'valide_conseil', label: 'Valide par Conseil', sortOrder: 4 },
            { id: 5, code: 'valide_comite', label: 'Valide par Comite', sortOrder: 5 },
            { id: 6, code: 'ferme', label: 'Ferme', sortOrder: 6 },
            { id: 7, code: 'ferme_definitivement', label: 'Ferme definitivement', sortOrder: 7 },
        ],
    },
    {
        table: 'audit_plan_natures',
        values: [
            { id: 1, code: 'annuel', label: 'Annuel', sortOrder: 1 },
            { id: 2, code: 'trimestriel', label: 'Trimestriel', sortOrder: 2 },
            { id: 3, code: 'specifique', label: 'Specifique', sortOrder: 3 },
        ],
    },
    {
        table: 'audit_plan_transitions',
        values: [
            { id: 1, code: 'demander_validation', label: 'Demander validation', sortOrder: 1 },
            { id: 2, code: 'valider_direction', label: 'Valider Direction', sortOrder: 2 },
            { id: 3, code: 'demander_revue', label: 'Demander revue', sortOrder: 3 },
            { id: 4, code: 'valider_conseil', label: 'Valider Conseil', sortOrder: 4 },
            { id: 5, code: 'valider_comite', label: 'Valider Comite', sortOrder: 5 },
            { id: 6, code: 'fermer', label: 'Fermer', sortOrder: 6 },
            { id: 7, code: 'reouvrir', label: 'Reouvrir', sortOrder: 7 },
            { id: 8, code: 'fermer_definitivement', label: 'Fermer definitivement', sortOrder: 8 },
            { id: 9, code: 'definir_modele', label: 'Definir comme modele', sortOrder: 9 },
        ],
    },
    {
        table: 'audit_mission_categories',
        values: [
            { id: 1, code: 'operationnel', label: 'Operationnel', sortOrder: 1 },
            { id: 2, code: 'conformite', label: 'Conformite', sortOrder: 2 },
            { id: 3, code: 'financier', label: 'Financier', sortOrder: 3 },
            { id: 4, code: 'thematique', label: 'Thematique', sortOrder: 4 },
        ],
    },
    {
        table: 'audit_mission_quarters',
        values: [
            { id: 1, code: 't1', label: 'T1', sortOrder: 1 },
            { id: 2, code: 't2', label: 'T2', sortOrder: 2 },
            { id: 3, code: 't3', label: 'T3', sortOrder: 3 },
            { id: 4, code: 't4', label: 'T4', sortOrder: 4 },
        ],
    },
    {
        table: 'audit_mission_resource_assignment_roles',
        values: [
            { id: 1, code: 'chef_mission', label: 'Chef de Mission', sortOrder: 1 },
            { id: 2, code: 'auditeur', label: 'Auditeur', sortOrder: 2 },
            { id: 3, code: 'support', label: 'Support', sortOrder: 3 },
        ],
    },
];

const tableExists = async (queryInterface, tableName) => {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = ${queryInterface.sequelize.escape(tableName)}
    `);

    return rows.length > 0;
};

const columnExists = async (queryInterface, tableName, columnName) => {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = ${queryInterface.sequelize.escape(tableName)}
          AND COLUMN_NAME = ${queryInterface.sequelize.escape(columnName)}
    `);

    return rows.length > 0;
};

const indexExists = async (queryInterface, tableName, indexName) => {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM sys.indexes i
        INNER JOIN sys.tables t ON t.object_id = i.object_id
        WHERE t.name = ${queryInterface.sequelize.escape(tableName)}
          AND i.name = ${queryInterface.sequelize.escape(indexName)}
    `);

    return rows.length > 0;
};

const createLookupTable = async (queryInterface, Sequelize, tableName) => {
    if (await tableExists(queryInterface, tableName)) {
        return;
    }

    await queryInterface.createTable(tableName, {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        code: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
        },
        label: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        sort_order: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('GETDATE'),
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('GETDATE'),
        },
    });
};

const upsertLookupValues = async (queryInterface, definition) => {
    for (const value of definition.values) {
        await queryInterface.sequelize.query(`
            IF EXISTS (SELECT 1 FROM ${quote(definition.table)} WHERE id = ${value.id})
            BEGIN
                UPDATE ${quote(definition.table)}
                SET code = N'${value.code}',
                    label = N'${value.label}',
                    sort_order = ${value.sortOrder},
                    is_active = 1,
                    updated_at = GETDATE()
                WHERE id = ${value.id}
            END
            ELSE
            BEGIN
                SET IDENTITY_INSERT ${quote(definition.table)} ON;
                INSERT INTO ${quote(definition.table)} (id, code, label, description, is_active, sort_order, created_at, updated_at)
                VALUES (${value.id}, N'${value.code}', N'${value.label}', NULL, 1, ${value.sortOrder}, GETDATE(), GETDATE());
                SET IDENTITY_INSERT ${quote(definition.table)} OFF;
            END
        `);
    }
};

const addMissionColumn = async (queryInterface, tableName, columnName, definition) => {
    if (await columnExists(queryInterface, tableName, columnName)) {
        return;
    }

    await queryInterface.addColumn(tableName, columnName, definition);
};

module.exports = {
    async up(queryInterface, Sequelize) {
        for (const definition of lookupDefinitions) {
            await createLookupTable(queryInterface, Sequelize, definition.table);
            await upsertLookupValues(queryInterface, definition);
        }

        await queryInterface.sequelize.query(`
            IF EXISTS (SELECT 1 FROM notification_types WHERE id = 7)
            BEGIN
                UPDATE notification_types
                SET code = N'audit_plan_validation_requested',
                    label = N'AUDIT_PLAN_VALIDATION_REQUESTED',
                    sort_order = 7,
                    is_active = 1,
                    updated_at = GETDATE()
                WHERE id = 7
            END
            ELSE
            BEGIN
                SET IDENTITY_INSERT notification_types ON;
                INSERT INTO notification_types (id, code, label, description, is_active, sort_order, created_at, updated_at)
                VALUES (7, N'audit_plan_validation_requested', N'AUDIT_PLAN_VALIDATION_REQUESTED', NULL, 1, 7, GETDATE(), GETDATE());
                SET IDENTITY_INSERT notification_types OFF;
            END
        `);

        await queryInterface.sequelize.query(`
            IF EXISTS (SELECT 1 FROM notification_types WHERE id = 8)
            BEGIN
                UPDATE notification_types
                SET code = N'audit_plan_status_changed',
                    label = N'AUDIT_PLAN_STATUS_CHANGED',
                    sort_order = 8,
                    is_active = 1,
                    updated_at = GETDATE()
                WHERE id = 8
            END
            ELSE
            BEGIN
                SET IDENTITY_INSERT notification_types ON;
                INSERT INTO notification_types (id, code, label, description, is_active, sort_order, created_at, updated_at)
                VALUES (8, N'audit_plan_status_changed', N'AUDIT_PLAN_STATUS_CHANGED', NULL, 1, 8, GETDATE(), GETDATE());
                SET IDENTITY_INSERT notification_types OFF;
            END
        `);

        if (!(await tableExists(queryInterface, 'audit_plans'))) {
            await queryInterface.createTable('audit_plans', {
                id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
                nom: { type: Sequelize.STRING(150), allowNull: false },
                calendrier: { type: Sequelize.STRING(255), allowNull: true },
                description: { type: Sequelize.TEXT, allowNull: true },
                status_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'audit_plan_statuses', key: 'id' } },
                nature_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'audit_plan_natures', key: 'id' } },
                isTemplate: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
                dateDebut: { type: Sequelize.DATE, allowNull: true },
                dateFin: { type: Sequelize.DATE, allowNull: true },
                createdById: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
                submittedAt: { type: Sequelize.DATE, allowNull: true },
                validatedDirectionAt: { type: Sequelize.DATE, allowNull: true },
                validatedCouncilAt: { type: Sequelize.DATE, allowNull: true },
                validatedCommitteeAt: { type: Sequelize.DATE, allowNull: true },
                closedAt: { type: Sequelize.DATE, allowNull: true },
                closedDefinitivelyAt: { type: Sequelize.DATE, allowNull: true },
                is_deleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
                deleted_at: { type: Sequelize.DATE, allowNull: true },
                createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('GETDATE') },
                updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('GETDATE') },
            });
        }

        if (!(await tableExists(queryInterface, 'audit_plan_workflow_events'))) {
            await queryInterface.createTable('audit_plan_workflow_events', {
                id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
                planId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'audit_plans', key: 'id' }, onDelete: 'CASCADE' },
                transition_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'audit_plan_transitions', key: 'id' } },
                from_status_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'audit_plan_statuses', key: 'id' } },
                to_status_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'audit_plan_statuses', key: 'id' } },
                actorUserId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
                comment: { type: Sequelize.TEXT, allowNull: true },
                is_deleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
                deleted_at: { type: Sequelize.DATE, allowNull: true },
                createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('GETDATE') },
                updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('GETDATE') },
            });
        }

        if (!(await tableExists(queryInterface, 'audit_skills'))) {
            await queryInterface.createTable('audit_skills', {
                id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
                code: { type: Sequelize.STRING(120), allowNull: false, unique: true },
                label: { type: Sequelize.STRING(150), allowNull: false },
                description: { type: Sequelize.TEXT, allowNull: true },
                is_deleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
                deleted_at: { type: Sequelize.DATE, allowNull: true },
                createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('GETDATE') },
                updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('GETDATE') },
            });
        }

        if (!(await tableExists(queryInterface, 'audit_mission_resources'))) {
            await queryInterface.createTable('audit_mission_resources', {
                id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
                missionId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'audit_missions', key: 'id' }, onDelete: 'CASCADE' },
                userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
                assignment_role_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'audit_mission_resource_assignment_roles', key: 'id' } },
                allocationPercent: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 100 },
                is_deleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
                deleted_at: { type: Sequelize.DATE, allowNull: true },
                createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('GETDATE') },
                updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('GETDATE') },
            });
        }

        if (!(await tableExists(queryInterface, 'user_audit_skills'))) {
            await queryInterface.createTable('user_audit_skills', {
                id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
                userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
                skillId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'audit_skills', key: 'id' }, onDelete: 'CASCADE' },
                is_deleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
                deleted_at: { type: Sequelize.DATE, allowNull: true },
                createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('GETDATE') },
                updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('GETDATE') },
            });
        }

        if (!(await tableExists(queryInterface, 'audit_mission_required_skills'))) {
            await queryInterface.createTable('audit_mission_required_skills', {
                id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
                missionId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'audit_missions', key: 'id' }, onDelete: 'CASCADE' },
                skillId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'audit_skills', key: 'id' }, onDelete: 'CASCADE' },
                is_deleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
                deleted_at: { type: Sequelize.DATE, allowNull: true },
                createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('GETDATE') },
                updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('GETDATE') },
            });
        }

        await addMissionColumn(queryInterface, 'audit_missions', 'auditPlanId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'audit_plans', key: 'id' },
        });
        await addMissionColumn(queryInterface, 'audit_missions', 'chefMissionId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'users', key: 'id' },
        });
        await addMissionColumn(queryInterface, 'audit_missions', 'auditedPrincipalId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'users', key: 'id' },
        });
        await addMissionColumn(queryInterface, 'audit_missions', 'categorie_id', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'audit_mission_categories', key: 'id' },
        });
        await addMissionColumn(queryInterface, 'audit_missions', 'axe', {
            type: Sequelize.STRING(150),
            allowNull: true,
        });
        await addMissionColumn(queryInterface, 'audit_missions', 'evaluation', {
            type: Sequelize.TEXT,
            allowNull: true,
        });
        await addMissionColumn(queryInterface, 'audit_missions', 'quarter_id', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: { model: 'audit_mission_quarters', key: 'id' },
        });
        await addMissionColumn(queryInterface, 'audit_missions', 'datePrevueDebut', {
            type: Sequelize.DATE,
            allowNull: true,
        });
        await addMissionColumn(queryInterface, 'audit_missions', 'datePrevueFin', {
            type: Sequelize.DATE,
            allowNull: true,
        });
        await addMissionColumn(queryInterface, 'audit_missions', 'dateReelleDebut', {
            type: Sequelize.DATE,
            allowNull: true,
        });
        await addMissionColumn(queryInterface, 'audit_missions', 'dateReelleFin', {
            type: Sequelize.DATE,
            allowNull: true,
        });
        await addMissionColumn(queryInterface, 'audit_missions', 'progressPercent', {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
        });

        const indexes = [
            ['audit_plans', 'audit_plans_status_id', ['status_id']],
            ['audit_plans', 'audit_plans_nature_id', ['nature_id']],
            ['audit_plans', 'audit_plans_created_by_id', ['createdById']],
            ['audit_plan_workflow_events', 'audit_plan_workflow_events_plan_id', ['planId']],
            ['audit_mission_resources', 'audit_mission_resources_mission_id', ['missionId']],
            ['audit_mission_resources', 'audit_mission_resources_user_id', ['userId']],
            ['audit_mission_resources', 'audit_mission_resources_assignment_role_id', ['assignment_role_id']],
            ['user_audit_skills', 'user_audit_skills_user_id', ['userId']],
            ['user_audit_skills', 'user_audit_skills_skill_id', ['skillId']],
            ['audit_mission_required_skills', 'audit_mission_required_skills_mission_id', ['missionId']],
            ['audit_mission_required_skills', 'audit_mission_required_skills_skill_id', ['skillId']],
            ['audit_missions', 'audit_missions_audit_plan_id', ['auditPlanId']],
            ['audit_missions', 'audit_missions_chef_mission_id', ['chefMissionId']],
            ['audit_missions', 'audit_missions_audited_principal_id', ['auditedPrincipalId']],
            ['audit_missions', 'audit_missions_categorie_id', ['categorie_id']],
            ['audit_missions', 'audit_missions_quarter_id', ['quarter_id']],
        ];

        for (const [tableName, indexName, fields] of indexes) {
            if (!(await indexExists(queryInterface, tableName, indexName))) {
                await queryInterface.addIndex(tableName, fields, { name: indexName });
            }
        }
    },

    async down(queryInterface) {
        const indexes = [
            ['audit_missions', 'audit_missions_quarter_id'],
            ['audit_missions', 'audit_missions_categorie_id'],
            ['audit_missions', 'audit_missions_audited_principal_id'],
            ['audit_missions', 'audit_missions_chef_mission_id'],
            ['audit_missions', 'audit_missions_audit_plan_id'],
            ['audit_mission_required_skills', 'audit_mission_required_skills_skill_id'],
            ['audit_mission_required_skills', 'audit_mission_required_skills_mission_id'],
            ['user_audit_skills', 'user_audit_skills_skill_id'],
            ['user_audit_skills', 'user_audit_skills_user_id'],
            ['audit_mission_resources', 'audit_mission_resources_assignment_role_id'],
            ['audit_mission_resources', 'audit_mission_resources_user_id'],
            ['audit_mission_resources', 'audit_mission_resources_mission_id'],
            ['audit_plan_workflow_events', 'audit_plan_workflow_events_plan_id'],
            ['audit_plans', 'audit_plans_created_by_id'],
            ['audit_plans', 'audit_plans_nature_id'],
            ['audit_plans', 'audit_plans_status_id'],
        ];

        for (const [tableName, indexName] of indexes) {
            if (await indexExists(queryInterface, tableName, indexName)) {
                await queryInterface.removeIndex(tableName, indexName);
            }
        }

        const missionColumns = [
            'progressPercent',
            'dateReelleFin',
            'dateReelleDebut',
            'datePrevueFin',
            'datePrevueDebut',
            'quarter_id',
            'evaluation',
            'axe',
            'categorie_id',
            'auditedPrincipalId',
            'chefMissionId',
            'auditPlanId',
        ];

        for (const columnName of missionColumns) {
            if (await columnExists(queryInterface, 'audit_missions', columnName)) {
                await queryInterface.removeColumn('audit_missions', columnName);
            }
        }

        if (await tableExists(queryInterface, 'audit_mission_required_skills')) {
            await queryInterface.dropTable('audit_mission_required_skills');
        }
        if (await tableExists(queryInterface, 'user_audit_skills')) {
            await queryInterface.dropTable('user_audit_skills');
        }
        if (await tableExists(queryInterface, 'audit_mission_resources')) {
            await queryInterface.dropTable('audit_mission_resources');
        }
        if (await tableExists(queryInterface, 'audit_skills')) {
            await queryInterface.dropTable('audit_skills');
        }
        if (await tableExists(queryInterface, 'audit_plan_workflow_events')) {
            await queryInterface.dropTable('audit_plan_workflow_events');
        }
        if (await tableExists(queryInterface, 'audit_plans')) {
            await queryInterface.dropTable('audit_plans');
        }

        const lookupTables = [
            'audit_mission_resource_assignment_roles',
            'audit_mission_quarters',
            'audit_mission_categories',
            'audit_plan_transitions',
            'audit_plan_natures',
            'audit_plan_statuses',
        ];

        for (const tableName of lookupTables) {
            if (await tableExists(queryInterface, tableName)) {
                await queryInterface.dropTable(tableName);
            }
        }
    },
};
