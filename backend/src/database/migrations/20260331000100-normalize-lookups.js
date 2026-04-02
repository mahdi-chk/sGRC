'use strict';

const registry = require('../lookups/generated.lookup-registry.json');

const quote = (identifier) => `[${identifier}]`;

const tableExists = async (queryInterface, tableName) => {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = N'${tableName}'
    `);

    return rows.length > 0;
};

const getColumns = async (queryInterface, tableName) => {
    if (!(await tableExists(queryInterface, tableName))) {
        return {};
    }

    return queryInterface.describeTable(tableName);
};

const columnExists = async (queryInterface, tableName, columnName) => {
    const columns = await getColumns(queryInterface, tableName);
    return Boolean(columns[columnName]);
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
        } catch (err) {
            console.warn(`[WARNING] Could not remove index ${index.name} from ${tableName}. It might already be gone.`);
        }

        const fields = indexFields(index).map((field) => (field === fromColumn ? toColumn : field));

        try {
            await queryInterface.addIndex(tableName, fields, {
                name: index.name,
                unique: Boolean(index.unique),
            });
        } catch (err) {
            console.warn(`[WARNING] Could not add index ${index.name} to ${tableName}. It might already exist or have a conflict.`);
        }
    }

};

const dropDefaultConstraint = async (queryInterface, tableName, columnName) => {
    await queryInterface.sequelize.query(`
        DECLARE @ConstraintName nvarchar(200);
        SELECT @ConstraintName = dc.name
        FROM sys.default_constraints dc
        INNER JOIN sys.columns c
            ON dc.parent_object_id = c.object_id
            AND dc.parent_column_id = c.column_id
        WHERE dc.parent_object_id = OBJECT_ID(N'${tableName}')
          AND c.name = N'${columnName}';

        IF @ConstraintName IS NOT NULL
            EXEC(N'ALTER TABLE ${quote(tableName)} DROP CONSTRAINT [' + @ConstraintName + ']');
    `);
};

const constraintExists = async (queryInterface, constraintName) => {
    const [rows] = await queryInterface.sequelize.query(`
        SELECT 1 AS found
        FROM sys.foreign_keys
        WHERE name = N'${constraintName}'
    `);

    return rows.length > 0;
};

const columnIsNullable = async (queryInterface, tableName, columnName) => {
    const [results] = await queryInterface.sequelize.query(`
        SELECT IS_NULLABLE
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = ${queryInterface.sequelize.escape(tableName)}
          AND COLUMN_NAME = ${queryInterface.sequelize.escape(columnName)}
    `);
    return results.length > 0 && results[0].IS_NULLABLE === 'YES';
};

const addLookupTable = async (queryInterface, Sequelize, definition) => {

    if (await tableExists(queryInterface, definition.lookupTable)) {
        return;
    }

    await queryInterface.createTable(definition.lookupTable, {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    });

    await queryInterface.addIndex(definition.lookupTable, ['code'], {
        name: `ux_${definition.lookupTable}_code`,
        unique: true,
    });
};

const insertLookupValue = async (queryInterface, definition, value) => {
    const [existingRows] = await queryInterface.sequelize.query(`
        SELECT TOP 1 id
        FROM ${quote(definition.lookupTable)}
        WHERE code = N'${value.code.replace(/'/g, "''")}'
    `);

    const descriptionValue = value.description ? `N'${value.description.replace(/'/g, "''")}'` : 'NULL';
    const sortOrderValue = value.sortOrder !== undefined && value.sortOrder !== null ? value.sortOrder : 'NULL';
    const labelValue = `N'${value.label.replace(/'/g, "''")}'`;

    if (existingRows.length > 0) {
        await queryInterface.sequelize.query(`
            UPDATE ${quote(definition.lookupTable)}
            SET label = ${labelValue},
                description = ${descriptionValue},
                sort_order = ${sortOrderValue},
                is_active = 1,
                updated_at = GETDATE()
            WHERE id = ${existingRows[0].id}
        `);
        return existingRows[0].id;
    }

    const codeValue = `N'${value.code.replace(/'/g, "''")}'`;


    // We must execute SET IDENTITY_INSERT ON, the INSERT, and SET IDENTITY_INSERT OFF
    // in the same query call to ensure they run on the same database session/connection.
    await queryInterface.sequelize.query(`
        SET IDENTITY_INSERT ${quote(definition.lookupTable)} ON;
        INSERT INTO ${quote(definition.lookupTable)} (id, code, label, description, is_active, sort_order, created_at, updated_at)
        VALUES (${value.id}, ${codeValue}, ${labelValue}, ${descriptionValue}, 1, ${sortOrderValue}, GETDATE(), GETDATE());
        SET IDENTITY_INSERT ${quote(definition.lookupTable)} OFF;
    `);

    return value.id;
};


const slugifyCode = (value) =>
    String(value)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .substring(0, 120) || 'value';

const findOrInsertDynamicLookupValue = async (queryInterface, definition, label) => {
    const escapedLabel = String(label).replace(/'/g, "''");
    const [rows] = await queryInterface.sequelize.query(`
        SELECT TOP 1 id, code
        FROM ${quote(definition.lookupTable)}
        WHERE label = N'${escapedLabel}'
    `);

    if (rows.length > 0) {
        return rows[0].id;
    }

    let code = slugifyCode(label);
    let suffix = 1;
    while (true) {
        const [existingCode] = await queryInterface.sequelize.query(`
            SELECT TOP 1 id
            FROM ${quote(definition.lookupTable)}
            WHERE code = N'${code}'
        `);

        if (existingCode.length === 0) {
            break;
        }

        suffix += 1;
        code = `${slugifyCode(label)}_${suffix}`;
    }

    await queryInterface.bulkInsert(definition.lookupTable, [{
        code,
        label: String(label),
        description: null,
        is_active: true,
        sort_order: null,
        created_at: new Date(),
        updated_at: new Date(),
    }]);

    const [createdRows] = await queryInterface.sequelize.query(`
        SELECT TOP 1 id
        FROM ${quote(definition.lookupTable)}
        WHERE code = N'${code}'
    `);

    return createdRows[0].id;
};

const ensureLookupSeed = async (queryInterface, definition) => {
    for (const value of definition.values) {
        await insertLookupValue(queryInterface, definition, value);
    }
};

const addForeignKeyColumn = async (queryInterface, Sequelize, definition) => {
    if (await columnExists(queryInterface, definition.entityTable, definition.foreignKeyColumn)) {
        return;
    }

    await queryInterface.addColumn(definition.entityTable, definition.foreignKeyColumn, {
        type: Sequelize.INTEGER,
        allowNull: true,
    });
};

const finalizeForeignKeyColumn = async (queryInterface, Sequelize, definition) => {
    if (definition.allowNull) {
        return;
    }

    if (!(await columnIsNullable(queryInterface, definition.entityTable, definition.foreignKeyColumn))) {
        return;
    }

    try {
        await queryInterface.changeColumn(definition.entityTable, definition.foreignKeyColumn, {
            type: Sequelize.INTEGER,
            allowNull: false,
        });
    } catch (err) {
        console.warn(`[WARNING] Could not set column ${definition.foreignKeyColumn} to NOT NULL in ${definition.entityTable}. It might be used in an index or constraint.`);
        // We log and continue to avoid blocking the whole migration if the state is mostly correct
    }
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

        if (row.legacy_value !== null && row.legacy_value !== undefined && String(row.legacy_value).trim() !== '') {
            const predefined = definition.values.find((value) => value.label === row.legacy_value || value.code === row.legacy_value);
            lookupId = predefined
                ? await insertLookupValue(queryInterface, definition, predefined)
                : await findOrInsertDynamicLookupValue(queryInterface, definition, row.legacy_value);
        } else if (!definition.allowNull && definition.legacyColumn.defaultLabel) {
            const fallback = definition.values.find((value) => value.label === definition.legacyColumn.defaultLabel);
            if (fallback) {
                lookupId = fallback.id;
            }
        }

        await queryInterface.bulkUpdate(
            definition.entityTable,
            { [definition.foreignKeyColumn]: lookupId },
            { id: row.id }
        );
    }
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

const dropForeignKeyConstraint = async (queryInterface, definition) => {
    const constraintName = `fk_${definition.entityTable}_${definition.foreignKeyColumn}`;
    if (!(await constraintExists(queryInterface, constraintName))) {
        return;
    }

    await queryInterface.removeConstraint(definition.entityTable, constraintName);
};

const migrateUpDefinition = async (queryInterface, Sequelize, definition) => {
    if (!(await tableExists(queryInterface, definition.entityTable))) {
        return;
    }

    await addLookupTable(queryInterface, Sequelize, definition);
    await ensureLookupSeed(queryInterface, definition);
    await addForeignKeyColumn(queryInterface, Sequelize, definition);

    if (definition.legacyColumn && await columnExists(queryInterface, definition.entityTable, definition.legacyColumn.name)) {
        await backfillLookupColumn(queryInterface, definition);
        await finalizeForeignKeyColumn(queryInterface, Sequelize, definition);
        await rebuildIndexesForColumn(queryInterface, definition.entityTable, definition.legacyColumn.name, definition.foreignKeyColumn);
        await dropDefaultConstraint(queryInterface, definition.entityTable, definition.legacyColumn.name);
        await queryInterface.removeColumn(definition.entityTable, definition.legacyColumn.name);
    } else {
        await finalizeForeignKeyColumn(queryInterface, Sequelize, definition);
    }

    await ensureForeignKeyConstraint(queryInterface, definition);
};


const addLegacyColumn = async (queryInterface, Sequelize, definition) => {
    if (!definition.legacyColumn) {
        return;
    }

    if (await columnExists(queryInterface, definition.entityTable, definition.legacyColumn.name)) {
        return;
    }

    await queryInterface.addColumn(definition.entityTable, definition.legacyColumn.name, {
        type: Sequelize.STRING(definition.legacyColumn.length || 255),
        allowNull: definition.allowNull,
    });
};

const restoreLegacyValues = async (queryInterface, definition) => {
    if (!definition.legacyColumn || !(await columnExists(queryInterface, definition.entityTable, definition.foreignKeyColumn))) {
        return;
    }

    const [rows] = await queryInterface.sequelize.query(`
        SELECT source.id, lookup_table.label
        FROM ${quote(definition.entityTable)} AS source
        LEFT JOIN ${quote(definition.lookupTable)} AS lookup_table
            ON lookup_table.id = source.${quote(definition.foreignKeyColumn)}
    `);

    for (const row of rows) {
        await queryInterface.bulkUpdate(
            definition.entityTable,
            { [definition.legacyColumn.name]: row.label || null },
            { id: row.id }
        );
    }
};

const addLegacyDefaultConstraint = async (queryInterface, definition) => {
    if (!definition.legacyColumn || !definition.legacyColumn.defaultLabel) {
        return;
    }

    await queryInterface.sequelize.query(`
        ALTER TABLE ${quote(definition.entityTable)}
        ADD CONSTRAINT ${quote(`df_${definition.entityTable}_${definition.legacyColumn.name}`)}
        DEFAULT N'${definition.legacyColumn.defaultLabel.replace(/'/g, "''")}'
        FOR ${quote(definition.legacyColumn.name)};
    `).catch(() => {});
};

const migrateDownDefinition = async (queryInterface, Sequelize, definition) => {
    if (!(await tableExists(queryInterface, definition.entityTable))) {
        return;
    }

    if (await columnExists(queryInterface, definition.entityTable, definition.foreignKeyColumn)) {
        await addLegacyColumn(queryInterface, Sequelize, definition);
        await rebuildIndexesForColumn(queryInterface, definition.entityTable, definition.foreignKeyColumn, definition.legacyColumn.name);
        await restoreLegacyValues(queryInterface, definition);
        await addLegacyDefaultConstraint(queryInterface, definition);
        await dropForeignKeyConstraint(queryInterface, definition);
        await queryInterface.removeColumn(definition.entityTable, definition.foreignKeyColumn);
    }

    if (await tableExists(queryInterface, definition.lookupTable)) {
        await queryInterface.dropTable(definition.lookupTable);
    }
};

module.exports = {
    async up(queryInterface, Sequelize) {
        for (const definition of registry.definitions) {
            await migrateUpDefinition(queryInterface, Sequelize, definition);
        }
    },

    async down(queryInterface, Sequelize) {
        for (const definition of [...registry.definitions].reverse()) {
            await migrateDownDefinition(queryInterface, Sequelize, definition);
        }
    }
};
