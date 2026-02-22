import sequelize from './database';

async function checkTable() {
    try {
        const [results] = await sequelize.query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'");
        console.log('Tables in database:', results.map((r: any) => r.TABLE_NAME));

        const [notifs] = await sequelize.query("SELECT COUNT(*) as count FROM notifications");
        console.log('Notification count:', notifs);

        process.exit(0);
    } catch (error) {
        console.error('Error checking database:', error);
        process.exit(1);
    }
}

checkTable();
