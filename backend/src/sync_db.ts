import sequelize from './database';
// Import all models to register them with Sequelize
import './modules/departments/department.model';
import './modules/users/user.model';
import './modules/risk/risk.model';
import './modules/risk/comment.model';
import './modules/notifications/notification.model';

async function sync() {
    try {
        await sequelize.authenticate();
        console.log('Connection established.');

        // Use sequelize.sync({ force: true }) to recreate all tables.
        // This is necessary because MSSQL sometimes fails with 'alter: true'
        // when dealing with UNIQUE constraints or complex transitions.
        await sequelize.sync({ force: true });
        console.log('Database sync completed successfully with force: true.');

        process.exit(0);
    } catch (error) {
        console.error('Error syncing database:', error);
        process.exit(1);
    }
}

sync();
