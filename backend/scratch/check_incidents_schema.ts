import sequelize from '../src/database';

async function checkSchema() {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB.');

        const [results] = await sequelize.query(`
            SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = 'incidents'
        `);

        const columns = results.map((r: any) => r.COLUMN_NAME);
        console.log('Columns in incidents table:', columns);
        
        if (columns.includes('assigneeId')) {
            console.log('SUCCESS: assigneeId column exists.');
        } else {
            console.log('FAILURE: assigneeId column is MISSING.');
        }
        
        process.exit(0);
    } catch (e) {
        console.error('Error during schema check:', e);
        process.exit(1);
    }
}

checkSchema();
