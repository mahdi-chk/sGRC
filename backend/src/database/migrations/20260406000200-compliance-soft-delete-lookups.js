'use strict';

const complianceLookups = [
    {
        key: 'complianceFramework.status',
        entityTable: 'compliance_frameworks',
        fieldName: 'status',
        foreignKeyColumn: 'status_id',
        lookupTable: 'compliance_framework_statuses',
        allowNull: false,
        legacyColumn: { name: 'status', defaultLabel: 'Brouillon' },
        values: [
            { id: 1, code: 'draft', label: 'Brouillon', sortOrder: 1 },
            { id: 2, code: 'active', label: 'Actif', sortOrder: 2 },
            { id: 3, code: 'review_required', label: 'Revue requise', sortOrder: 3 },
            { id: 4, code: 'archived', label: 'Archive', sortOrder: 4 },
        ],
    },
    {
        key: 'complianceRequirement.applicability',
        entityTable: 'compliance_requirements',
        fieldName: 'applicability',
        foreignKeyColumn: 'applicability_id',
        lookupTable: 'compliance_requirement_applicabilities',
        allowNull: false,
        legacyColumn: { name: 'applicability', defaultLabel: 'Applicable' },
        values: [
            { id: 1, code: 'applicable', label: 'Applicable', sortOrder: 1 },
            { id: 2, code: 'partially_applicable', label: 'Partiellement applicable', sortOrder: 2 },
            { id: 3, code: 'not_applicable', label: 'Non applicable', sortOrder: 3 },
        ],
    },
    {
        key: 'complianceRequirement.status',
        entityTable: 'compliance_requirements',
        fieldName: 'status',
        foreignKeyColumn: 'status_id',
        lookupTable: 'compliance_requirement_statuses',
        allowNull: false,
        legacyColumn: { name: 'status', defaultLabel: 'Active' },
        values: [
            { id: 1, code: 'draft', label: 'Brouillon', sortOrder: 1 },
            { id: 2, code: 'active', label: 'Active', sortOrder: 2 },
            { id: 3, code: 'retired', label: 'Retiree', sortOrder: 3 },
        ],
    },
    {
        key: 'complianceMapping.sourceType',
        entityTable: 'compliance_mappings',
        fieldName: 'sourceType',
        foreignKeyColumn: 'source_type_id',
        lookupTable: 'compliance_mapping_source_types',
        allowNull: false,
        legacyColumn: { name: 'sourceType', defaultLabel: 'Risque' },
        values: [
            { id: 1, code: 'risk', label: 'Risque', sortOrder: 1 },
            { id: 2, code: 'audit', label: 'Audit', sortOrder: 2 },
            { id: 3, code: 'incident', label: 'Incident', sortOrder: 3 },
            { id: 4, code: 'control', label: 'Controle', sortOrder: 4 },
            { id: 5, code: 'policy', label: 'Politique', sortOrder: 5 },
            { id: 6, code: 'action', label: 'Action', sortOrder: 6 },
            { id: 7, code: 'manual', label: 'Manuel', sortOrder: 7 },
        ],
    },
    {
        key: 'complianceMapping.coverageLevel',
        entityTable: 'compliance_mappings',
        fieldName: 'coverageLevel',
        foreignKeyColumn: 'coverage_level_id',
        lookupTable: 'compliance_mapping_coverage_levels',
        allowNull: false,
        legacyColumn: { name: 'coverageLevel', defaultLabel: 'Partielle' },
        values: [
            { id: 1, code: 'uncovered', label: 'Non couverte', sortOrder: 1 },
            { id: 2, code: 'partial', label: 'Partielle', sortOrder: 2 },
            { id: 3, code: 'covered', label: 'Couverte', sortOrder: 3 },
        ],
    },
    {
        key: 'complianceCampaign.status',
        entityTable: 'compliance_campaigns',
        fieldName: 'status',
        foreignKeyColumn: 'status_id',
        lookupTable: 'compliance_campaign_statuses',
        allowNull: false,
        legacyColumn: { name: 'status', defaultLabel: 'Brouillon' },
        values: [
            { id: 1, code: 'draft', label: 'Brouillon', sortOrder: 1 },
            { id: 2, code: 'in_progress', label: 'En cours', sortOrder: 2 },
            { id: 3, code: 'completed', label: 'Terminee', sortOrder: 3 },
            { id: 4, code: 'cancelled', label: 'Annulee', sortOrder: 4 },
        ],
    },
    {
        key: 'complianceGap.severity',
        entityTable: 'compliance_gaps',
        fieldName: 'severity',
        foreignKeyColumn: 'severity_id',
        lookupTable: 'compliance_gap_severities',
        allowNull: false,
        legacyColumn: { name: 'severity', defaultLabel: 'Moyen' },
        values: [
            { id: 1, code: 'low', label: 'Faible', sortOrder: 1 },
            { id: 2, code: 'medium', label: 'Moyen', sortOrder: 2 },
            { id: 3, code: 'high', label: 'Eleve', sortOrder: 3 },
            { id: 4, code: 'critical', label: 'Critique', sortOrder: 4 },
        ],
    },
    {
        key: 'complianceGap.status',
        entityTable: 'compliance_gaps',
        fieldName: 'status',
        foreignKeyColumn: 'status_id',
        lookupTable: 'compliance_gap_statuses',
        allowNull: false,
        legacyColumn: { name: 'status', defaultLabel: 'Ouvert' },
        values: [
            { id: 1, code: 'open', label: 'Ouvert', sortOrder: 1 },
            { id: 2, code: 'in_progress', label: 'En cours', sortOrder: 2 },
            { id: 3, code: 'mitigated', label: 'Mitige', sortOrder: 3 },
            { id: 4, code: 'closed', label: 'Clos', sortOrder: 4 },
        ],
    },
    {
        key: 'complianceGap.sourceType',
        entityTable: 'compliance_gaps',
        fieldName: 'sourceType',
        foreignKeyColumn: 'source_type_id',
        lookupTable: 'compliance_gap_source_types',
        allowNull: false,
        legacyColumn: { name: 'sourceType', defaultLabel: 'Evaluation' },
        values: [
            { id: 1, code: 'assessment', label: 'Evaluation', sortOrder: 1 },
            { id: 2, code: 'audit', label: 'Audit', sortOrder: 2 },
            { id: 3, code: 'incident', label: 'Incident', sortOrder: 3 },
            { id: 4, code: 'manual', label: 'Manuel', sortOrder: 4 },
        ],
    },
    {
        key: 'complianceEvidence.sourceType',
        entityTable: 'compliance_evidence',
        fieldName: 'sourceType',
        foreignKeyColumn: 'source_type_id',
        lookupTable: 'compliance_evidence_source_types',
        allowNull: false,
        legacyColumn: { name: 'sourceType', defaultLabel: 'Document' },
        values: [
            { id: 1, code: 'document', label: 'Document', sortOrder: 1 },
            { id: 2, code: 'audit', label: 'Audit', sortOrder: 2 },
            { id: 3, code: 'incident', label: 'Incident', sortOrder: 3 },
            { id: 4, code: 'risk', label: 'Risque', sortOrder: 4 },
            { id: 5, code: 'manual', label: 'Manuel', sortOrder: 5 },
            { id: 6, code: 'system_export', label: 'Export systeme', sortOrder: 6 },
        ],
    },
    {
        key: 'complianceAuditTrail.entityType',
        entityTable: 'compliance_audit_trail',
        fieldName: 'entityType',
        foreignKeyColumn: 'entity_type_id',
        lookupTable: 'compliance_audit_entity_types',
        allowNull: false,
        legacyColumn: { name: 'entityType', defaultLabel: 'Framework' },
        values: [
            { id: 1, code: 'framework', label: 'Framework', sortOrder: 1 },
            { id: 2, code: 'requirement', label: 'Requirement', sortOrder: 2 },
            { id: 3, code: 'mapping', label: 'Mapping', sortOrder: 3 },
            { id: 4, code: 'campaign', label: 'Campaign', sortOrder: 4 },
            { id: 5, code: 'gap', label: 'Gap', sortOrder: 5 },
            { id: 6, code: 'evidence', label: 'Evidence', sortOrder: 6 },
        ],
    },
    {
        key: 'complianceAuditTrail.action',
        entityTable: 'compliance_audit_trail',
        fieldName: 'action',
        foreignKeyColumn: 'action_id',
        lookupTable: 'compliance_audit_actions',
        allowNull: false,
        legacyColumn: { name: 'action', defaultLabel: 'Creation' },
        values: [
            { id: 1, code: 'create', label: 'Creation', sortOrder: 1 },
            { id: 2, code: 'update', label: 'Mise a jour', sortOrder: 2 },
            { id: 3, code: 'delete', label: 'Suppression', sortOrder: 3 },
            { id: 4, code: 'restore', label: 'Restauration', sortOrder: 4 },
            { id: 5, code: 'seed_upsert', label: 'Initialisation', sortOrder: 5 },
        ],
    },
];

const softDeleteTables = [
    'compliance_frameworks',
    'compliance_requirements',
    'compliance_mappings',
    'compliance_campaigns',
    'compliance_gaps',
    'compliance_evidence',
    'compliance_audit_trail',
];

const quote = (identifier) => `[${identifier}]`;

const tableExists = async (queryInterface, tableName) => {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = N'${tableName}'
    `);

    return rows.length > 0;
};

const columnExists = async (queryInterface, tableName, columnName) => {
    if (!(await tableExists(queryInterface, tableName))) {
        return false;
    }

    const columns = await queryInterface.describeTable(tableName);
    return Boolean(columns[columnName]);
};

const constraintExists = async (queryInterface, constraintName) => {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM sys.foreign_keys
        WHERE name = N'${constraintName}'
    `);

    return rows.length > 0;
};

const indexFields = (index) =>
    (index.fields || []).map((field) => field.attribute || field.name || field);

const rebuildIndexesForColumn = async (queryInterface, tableName, fromColumn, toColumn) => {
    const indexes = await queryInterface.showIndex(tableName);
    const affected = indexes.filter((index) => indexFields(index).includes(fromColumn));

    for (const index of affected) {
        if (!index.name) {
            continue;
        }

        try {
            await queryInterface.removeIndex(tableName, index.name);
        } catch (_error) {
        }

        const fields = indexFields(index).map((field) => (field === fromColumn ? toColumn : field));

        try {
            await queryInterface.addIndex(tableName, fields, {
                name: index.name,
                unique: Boolean(index.unique),
            });
        } catch (_error) {
        }
    }
};

const addSoftDeleteColumns = async (queryInterface, Sequelize, tableName) => {
    if (!(await tableExists(queryInterface, tableName))) {
        return;
    }

    if (!(await columnExists(queryInterface, tableName, 'is_deleted'))) {
        await queryInterface.addColumn(tableName, 'is_deleted', {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        });
    }

    if (!(await columnExists(queryInterface, tableName, 'deleted_at'))) {
        await queryInterface.addColumn(tableName, 'deleted_at', {
            type: Sequelize.DATE,
            allowNull: true,
        });
    }
};

const addLookupTable = async (queryInterface, Sequelize, definition) => {
    if (await tableExists(queryInterface, definition.lookupTable)) {
        return;
    }

    await queryInterface.createTable(definition.lookupTable, {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        code: { type: Sequelize.STRING(255), allowNull: false, unique: true },
        label: { type: Sequelize.STRING(255), allowNull: false },
        description: { type: Sequelize.TEXT, allowNull: true },
        is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
        sort_order: { type: Sequelize.INTEGER, allowNull: true },
        created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
};

const insertLookupValue = async (queryInterface, definition, value) => {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT TOP 1 id
        FROM ${quote(definition.lookupTable)}
        WHERE code = N'${value.code}'
    `);

    if (rows.length > 0) {
        await queryInterface.sequelize.query(`
            UPDATE ${quote(definition.lookupTable)}
            SET label = N'${value.label}',
                sort_order = ${value.sortOrder || 'NULL'},
                is_active = 1,
                updated_at = GETDATE()
            WHERE id = ${rows[0].id}
        `);
        return;
    }

    await queryInterface.sequelize.query(`
        SET IDENTITY_INSERT ${quote(definition.lookupTable)} ON;
        INSERT INTO ${quote(definition.lookupTable)} (id, code, label, description, is_active, sort_order, created_at, updated_at)
        VALUES (${value.id}, N'${value.code}', N'${value.label}', NULL, 1, ${value.sortOrder || 'NULL'}, GETDATE(), GETDATE());
        SET IDENTITY_INSERT ${quote(definition.lookupTable)} OFF;
    `);
};

const backfillLookupColumn = async (queryInterface, definition) => {
    if (!(await columnExists(queryInterface, definition.entityTable, definition.legacyColumn.name))) {
        return;
    }

    const [rows] = await queryInterface.sequelize.query(`
        SELECT id, ${quote(definition.legacyColumn.name)} AS legacy_value
        FROM ${quote(definition.entityTable)}
    `);

    for (const row of rows) {
        let lookupId = null;
        const raw = row.legacy_value;

        if (raw !== null && raw !== undefined && String(raw).trim() !== '') {
            const normalized = String(raw).trim().toLowerCase();
            const staticValue = definition.values.find((value) =>
                value.code.toLowerCase() === normalized || value.label.toLowerCase() === normalized
            );
            lookupId = staticValue ? staticValue.id : null;
        }

        if (!lookupId && definition.legacyColumn.defaultLabel) {
            const fallback = definition.values.find((value) => value.label === definition.legacyColumn.defaultLabel);
            lookupId = fallback ? fallback.id : null;
        }

        await queryInterface.bulkUpdate(
            definition.entityTable,
            { [definition.foreignKeyColumn]: lookupId },
            { id: row.id }
        );
    }
};

const finalizeForeignKeyColumn = async (queryInterface, Sequelize, definition) => {
    await queryInterface.changeColumn(definition.entityTable, definition.foreignKeyColumn, {
        type: Sequelize.INTEGER,
        allowNull: definition.allowNull,
    });
};

const ensureForeignKeyConstraint = async (queryInterface, definition) => {
    const constraintName = `fk_${definition.entityTable}_${definition.foreignKeyColumn}`;
    if (await constraintExists(queryInterface, constraintName)) {
        return;
    }

    await queryInterface.addConstraint(definition.entityTable, {
        fields: [definition.foreignKeyColumn],
        type: 'foreign key',
        name: constraintName,
        references: {
            table: definition.lookupTable,
            field: 'id',
        },
        onDelete: definition.allowNull ? 'SET NULL' : 'NO ACTION',
        onUpdate: 'CASCADE',
    });
};

const migrateLookup = async (queryInterface, Sequelize, definition) => {
    if (!(await tableExists(queryInterface, definition.entityTable))) {
        return;
    }

    await addLookupTable(queryInterface, Sequelize, definition);
    for (const value of definition.values) {
        await insertLookupValue(queryInterface, definition, value);
    }

    if (!(await columnExists(queryInterface, definition.entityTable, definition.foreignKeyColumn))) {
        await queryInterface.addColumn(definition.entityTable, definition.foreignKeyColumn, {
            type: Sequelize.INTEGER,
            allowNull: true,
        });
    }

    await backfillLookupColumn(queryInterface, definition);
    await finalizeForeignKeyColumn(queryInterface, Sequelize, definition);
    await ensureForeignKeyConstraint(queryInterface, definition);

    if (await columnExists(queryInterface, definition.entityTable, definition.legacyColumn.name)) {
        await rebuildIndexesForColumn(queryInterface, definition.entityTable, definition.legacyColumn.name, definition.foreignKeyColumn);
        await queryInterface.removeColumn(definition.entityTable, definition.legacyColumn.name);
    }
};

module.exports = {
    async up(queryInterface, Sequelize) {
        for (const tableName of softDeleteTables) {
            await addSoftDeleteColumns(queryInterface, Sequelize, tableName);
        }

        for (const definition of complianceLookups) {
            await migrateLookup(queryInterface, Sequelize, definition);
        }
    },

    async down(queryInterface) {
        for (const definition of [...complianceLookups].reverse()) {
            if (await columnExists(queryInterface, definition.entityTable, definition.foreignKeyColumn)) {
                await queryInterface.removeColumn(definition.entityTable, definition.foreignKeyColumn);
            }
            if (await tableExists(queryInterface, definition.lookupTable)) {
                await queryInterface.dropTable(definition.lookupTable);
            }
        }

        for (const tableName of softDeleteTables) {
            if (await columnExists(queryInterface, tableName, 'deleted_at')) {
                await queryInterface.removeColumn(tableName, 'deleted_at');
            }
            if (await columnExists(queryInterface, tableName, 'is_deleted')) {
                await queryInterface.removeColumn(tableName, 'is_deleted');
            }
        }
    }
};
