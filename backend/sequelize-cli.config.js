require('dotenv').config();

const baseConfig = {
    username: process.env.DB_USER || 'sa',
    password: process.env.DB_PASS || 'Sa@12345',
    database: process.env.DB_NAME || 'sgrc_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mssql',
    logging: false,

    dialectOptions: {
        options: {
            instanceName: process.env.DB_INSTANCE || 'SQLEXPRESS',
            trustServerCertificate: true,
            encrypt: true,
        },
    },
};

module.exports = {
    development: baseConfig,
    test: baseConfig,
    production: baseConfig,
};
