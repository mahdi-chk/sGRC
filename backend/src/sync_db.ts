import sequelize from './database';
import { Department } from './modules/departments/department.model';
import { User } from './modules/users/user.model';

async function sync() {
    try {
        await sequelize.authenticate();
        console.log('Connection established.');

        // Force sync with force: true to reset the schema during this refactor
        await Department.sync({ force: true });
        console.log('Department table recreated.');

        await User.sync({ force: true });
        console.log('User table recreated.');

        console.log('Database sync completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error syncing database:', error);
        process.exit(1);
    }
}

sync();
