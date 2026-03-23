import sequelize from './database';

async function inspect() {
    try {
        await sequelize.authenticate();
        console.log('Connected.');

        const [results] = await sequelize.query(`
            SELECT DISTINCT responsableTraitementId 
            FROM [risks] 
            WHERE responsableTraitementId NOT IN (SELECT id FROM [organigramme])
        `);

        console.log('Orphaned responsableTraitementId values:', results);

        const [orgCount] = await sequelize.query('SELECT COUNT(*) as count FROM [organigramme]');
        console.log('Organigramme count:', orgCount);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

inspect();
