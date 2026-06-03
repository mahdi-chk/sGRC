'use strict';

const quote = (identifier) => `[${identifier}]`;

const tableExists = async (queryInterface, tableName) => {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = N'${tableName.replace(/'/g, "''")}'
    `);

    return rows.length > 0;
};

const indexExists = async (queryInterface, indexName) => {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM sys.indexes
        WHERE name = N'${indexName.replace(/'/g, "''")}'
    `);

    return rows.length > 0;
};

const timestampColumns = (Sequelize) => ({
    createdAt: { allowNull: false, type: Sequelize.DATE },
    updatedAt: { allowNull: false, type: Sequelize.DATE },
});

const softDeleteColumns = (Sequelize) => ({
    is_deleted: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: false },
    deleted_at: { allowNull: true, type: Sequelize.DATE },
});

const lookupDefinition = (Sequelize) => ({
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
    code: { allowNull: false, unique: true, type: Sequelize.STRING(80) },
    label: { allowNull: false, type: Sequelize.STRING(180) },
    description: { allowNull: true, type: Sequelize.TEXT },
    is_active: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: true },
    sort_order: { allowNull: true, type: Sequelize.INTEGER },
    created_at: { allowNull: false, type: Sequelize.DATE },
    updated_at: { allowNull: false, type: Sequelize.DATE },
});

const createTableIfMissing = async (queryInterface, tableName, definition) => {
    if (!(await tableExists(queryInterface, tableName))) {
        await queryInterface.createTable(tableName, definition);
    }
};

const addIndexIfMissing = async (queryInterface, tableName, fields, name, options = {}) => {
    if (!(await indexExists(queryInterface, name))) {
        await queryInterface.addIndex(tableName, fields, { name, ...options });
    }
};

const createLookup = async (queryInterface, Sequelize, tableName, values) => {
    await createTableIfMissing(queryInterface, tableName, lookupDefinition(Sequelize));
    await addIndexIfMissing(queryInterface, tableName, ['code'], `ux_${tableName}_code`, { unique: true });

    for (const value of values) {
        const code = `N'${value.code.replace(/'/g, "''")}'`;
        const label = `N'${value.label.replace(/'/g, "''")}'`;
        const description = value.description ? `N'${value.description.replace(/'/g, "''")}'` : 'NULL';
        const sortOrder = value.sortOrder || value.id;
        await queryInterface.sequelize.query(`
            IF EXISTS (SELECT 1 FROM ${quote(tableName)} WHERE id = ${value.id} OR code = ${code})
            BEGIN
                UPDATE ${quote(tableName)}
                SET code = ${code},
                    label = ${label},
                    description = ${description},
                    is_active = 1,
                    sort_order = ${sortOrder},
                    updated_at = GETDATE()
                WHERE id = ${value.id} OR code = ${code};
            END
            ELSE
            BEGIN
                SET IDENTITY_INSERT ${quote(tableName)} ON;
                INSERT INTO ${quote(tableName)} (id, code, label, description, is_active, sort_order, created_at, updated_at)
                VALUES (${value.id}, ${code}, ${label}, ${description}, 1, ${sortOrder}, GETDATE(), GETDATE());
                SET IDENTITY_INSERT ${quote(tableName)} OFF;
            END
        `);
    }
};

module.exports = {
    async up(queryInterface, Sequelize) {
        await createLookup(queryInterface, Sequelize, 'internal_control_types', [
            { id: 1, code: 'preventive', label: 'Préventif' },
            { id: 2, code: 'detective', label: 'Détectif' },
            { id: 3, code: 'corrective', label: 'Correctif' },
            { id: 4, code: 'directive', label: 'Directif' },
        ]);

        await createLookup(queryInterface, Sequelize, 'internal_control_frequencies', [
            { id: 1, code: 'none', label: 'Non récurrent' },
            { id: 2, code: 'monthly', label: 'Mensuel' },
            { id: 3, code: 'quarterly', label: 'Trimestriel' },
            { id: 4, code: 'semi_annual', label: 'Semestriel' },
            { id: 5, code: 'annual', label: 'Annuel' },
            { id: 6, code: 'continuous', label: 'Continu' },
        ]);

        await createLookup(queryInterface, Sequelize, 'internal_control_statuses', [
            { id: 1, code: 'draft', label: 'Brouillon' },
            { id: 2, code: 'active', label: 'Actif' },
            { id: 3, code: 'review_required', label: 'Revue requise' },
            { id: 4, code: 'ineffective', label: 'Inefficace' },
            { id: 5, code: 'retired', label: 'Retiré' },
        ]);

        await createLookup(queryInterface, Sequelize, 'internal_control_test_methods', [
            { id: 1, code: 'manual_review', label: 'Revue manuelle' },
            { id: 2, code: 'walkthrough', label: 'Test de cheminement' },
            { id: 3, code: 'sampling', label: 'Échantillonnage' },
            { id: 4, code: 'automated_script', label: 'Script automatisé' },
            { id: 5, code: 'continuous_monitoring', label: 'Surveillance continue' },
        ]);

        await createLookup(queryInterface, Sequelize, 'internal_control_test_results', [
            { id: 1, code: 'planned', label: 'Planifié' },
            { id: 2, code: 'effective', label: 'Efficace' },
            { id: 3, code: 'partially_effective', label: 'Partiellement efficace' },
            { id: 4, code: 'ineffective', label: 'Inefficace' },
            { id: 5, code: 'not_applicable', label: 'Non applicable' },
        ]);

        await createTableIfMissing(queryInterface, 'internal_controls', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            code: { allowNull: false, unique: true, type: Sequelize.STRING(40) },
            title: { allowNull: false, type: Sequelize.STRING(255) },
            description: { allowNull: true, type: Sequelize.TEXT },
            controlType: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'preventive' },
            executionType: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'periodic' },
            frequency: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'quarterly' },
            status: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'active' },
            maturity: { allowNull: false, type: Sequelize.INTEGER, defaultValue: 3 },
            departmentId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'departments', key: 'id' }, onDelete: 'SET NULL' },
            ownerUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            nextReview: { allowNull: true, type: Sequelize.DATE },
            lastTestedAt: { allowNull: true, type: Sequelize.DATE },
            effectivenessScore: { allowNull: false, type: Sequelize.INTEGER, defaultValue: 0 },
            ...softDeleteColumns(Sequelize),
            ...timestampColumns(Sequelize),
        });

        await createTableIfMissing(queryInterface, 'internal_control_risks', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            controlId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'internal_controls', key: 'id' }, onDelete: 'CASCADE' },
            riskId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'risks', key: 'id' }, onDelete: 'CASCADE' },
            ...timestampColumns(Sequelize),
        });

        await createTableIfMissing(queryInterface, 'internal_control_test_executions', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            controlId: { allowNull: false, type: Sequelize.INTEGER, references: { model: 'internal_controls', key: 'id' }, onDelete: 'CASCADE' },
            title: { allowNull: false, type: Sequelize.STRING(255) },
            testMethod: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'manual_review' },
            result: { allowNull: false, type: Sequelize.STRING(40), defaultValue: 'planned' },
            plannedDate: { allowNull: true, type: Sequelize.DATE },
            executedAt: { allowNull: true, type: Sequelize.DATE },
            testerUserId: { allowNull: true, type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'SET NULL' },
            score: { allowNull: false, type: Sequelize.INTEGER, defaultValue: 0 },
            notes: { allowNull: true, type: Sequelize.TEXT },
            evidenceSummary: { allowNull: true, type: Sequelize.TEXT },
            ...softDeleteColumns(Sequelize),
            ...timestampColumns(Sequelize),
        });

        await addIndexIfMissing(queryInterface, 'internal_controls', ['status', 'nextReview'], 'ix_internal_controls_status_next_review');
        await addIndexIfMissing(queryInterface, 'internal_controls', ['departmentId'], 'ix_internal_controls_department');
        await addIndexIfMissing(queryInterface, 'internal_control_risks', ['controlId', 'riskId'], 'ux_internal_control_risks_control_risk', { unique: true });
        await addIndexIfMissing(queryInterface, 'internal_control_test_executions', ['controlId', 'plannedDate'], 'ix_internal_control_tests_control_planned');
    },

    async down(queryInterface) {
        await queryInterface.dropTable('internal_control_test_executions');
        await queryInterface.dropTable('internal_control_risks');
        await queryInterface.dropTable('internal_controls');
        await queryInterface.dropTable('internal_control_test_results');
        await queryInterface.dropTable('internal_control_test_methods');
        await queryInterface.dropTable('internal_control_statuses');
        await queryInterface.dropTable('internal_control_frequencies');
        await queryInterface.dropTable('internal_control_types');
    },
};
