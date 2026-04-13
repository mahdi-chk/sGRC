import sequelize from './database';

async function inspectSchema() {
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        const [results] = await sequelize.query(`
            SELECT COLUMN_NAME, IS_NULLABLE, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = 'audit_missions'
        `);

        console.table(results);

        process.exit(0);
    } catch (e) {
        console.error('Failed to inspect schema:', e);
        process.exit(1);
    }
}

inspectSchema();
