import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'sgrc_db',
    process.env.DB_USER || 'sa',
    process.env.DB_PASS || 'Sa@12345',
    {
        host: process.env.DB_HOST || 'DESKTOP-MAHDI',
        dialect: 'mssql',
        dialectOptions: {
            options: {
                instanceName: process.env.DB_INSTANCE || 'SQLEXPRESS',
                trustServerCertificate: true,
                encrypt: true,
            },
        },
        logging: false,
    }
);

export default sequelize;
