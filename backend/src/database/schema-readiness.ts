import sequelize from '../database';
import { lookupRegistry } from './lookups/lookup-registry';

export interface SchemaReadinessResult {
    ready: boolean;
    missing: string[];
}

const escapeSql = (value: string) => value.replace(/'/g, "''");

const tableExists = async (tableName: string): Promise<boolean> => {
    const [rows] = await sequelize.query(`
        SELECT 1 AS found
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_NAME = N'${escapeSql(tableName)}'
    `);

    return Array.isArray(rows) && rows.length > 0;
};

const columnExists = async (tableName: string, columnName: string): Promise<boolean> => {
    const [rows] = await sequelize.query(`
        SELECT 1 AS found
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = N'${escapeSql(tableName)}'
          AND COLUMN_NAME = N'${escapeSql(columnName)}'
    `);

    return Array.isArray(rows) && rows.length > 0;
};

export const getLookupSchemaReadiness = async (): Promise<SchemaReadinessResult> => {
    const missing: string[] = [];

    for (const definition of lookupRegistry) {
        if (!(await tableExists(definition.lookupTable))) {
            missing.push(`table:${definition.lookupTable}`);
        }

        if (!(await tableExists(definition.entityTable))) {
            missing.push(`table:${definition.entityTable}`);
            continue;
        }

        if (!(await columnExists(definition.entityTable, definition.foreignKeyColumn))) {
            missing.push(`column:${definition.entityTable}.${definition.foreignKeyColumn}`);
        }
    }

    return {
        ready: missing.length === 0,
        missing,
    };
};
