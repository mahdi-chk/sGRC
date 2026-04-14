import sequelize from '../src/database';

async function inspectData() {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB.');

        const [results] = await sequelize.query(`
            SELECT id, titre, is_deleted, deleted_at
            FROM incidents
        `);

        console.log('Results with delete status:', results);
        
        process.exit(0);
    } catch (e) {
        console.error('Error during data inspection:', e);
        process.exit(1);
    }
}

inspectData();
