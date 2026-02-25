/**
 * @file database.ts
 * @description Configuration et initialisation de la connexion à la base de données via Sequelize.
 * Supporte Microsoft SQL Server (MSSQL).
 */

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Chargement des variables d'environnement
dotenv.config();

/**
 * Instance Sequelize configurée pour se connecter à SQL Server.
 */
const sequelize = new Sequelize(
    process.env.DB_NAME || 'sgrc_db', // Nom de la base de données
    process.env.DB_USER || 'sa',      // Utilisateur
    process.env.DB_PASS || 'Sa@12345', // Mot de passe
    {
        host: process.env.DB_HOST || 'DESKTOP-MAHDI',
        dialect: 'mssql', // Utilisation du dialecte Microsoft SQL Server
        dialectOptions: {
            options: {
                instanceName: process.env.DB_INSTANCE || 'SQLEXPRESS',
                trustServerCertificate: true, // Nécessaire pour les environnements de dev local
                encrypt: true,               // Recommandé pour la sécurité
            },
        },
        logging: false, // Désactive les logs SQL dans la console pour plus de clarté
    }
);

export default sequelize;
