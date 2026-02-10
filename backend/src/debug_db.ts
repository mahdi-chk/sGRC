import { User } from './modules/users/user.model';
import sequelize from './database';

async function debug() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const users = await User.findAll();
        console.log(`Found ${users.length} users:`);
        users.forEach(u => {
            console.log(`- ${u.mail}: ${u.role} (${u.departement})`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Unable to connect to the database or query users:', error);
        process.exit(1);
    }
}

debug();
