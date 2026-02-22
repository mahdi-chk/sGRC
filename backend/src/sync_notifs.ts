import sequelize from './database';
import Notification from './modules/notifications/notification.model';

async function syncNotifications() {
    try {
        await sequelize.authenticate();
        console.log('Connection established.');

        // Sync ONLY the Notification model
        await Notification.sync();
        console.log('Notifications table created or already exists.');

        process.exit(0);
    } catch (error) {
        console.error('Error syncing notifications table:', error);
        process.exit(1);
    }
}

syncNotifications();
