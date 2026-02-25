/**
 * @file index.ts
 * @description Point d'entrée principal du backend. Configure le serveur Express, 
 * les middlewares et définit les routes de l'API.
 */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './database';

// Configuration des variables d'environnement
dotenv.config();

const app = express();

/**
 * --- CONFIGURATION DES MIDDLEWARES ---
 */

// Activation de CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Service des fichiers statiques pour le stockage des pièces justificatives
app.use('/src/storage', express.static('src/storage'));

/**
 * --- ENREGISTREMENT DES MODULES GRC ---
 * Chaque module est chargé dynamiquement si disponible pour assurer la modularité.
 */

// Module Gouvernance
try {
  const governance = require('./modules/governance').router;
  app.use('/api/governance', governance);
} catch (e) { }

// Module Gestion des Risques
try {
  const risk = require('./modules/risk').router;
  app.use('/api/risk', risk);
} catch (e) {
  console.error('Failed to load risk module:', e);
}

// Module Contrôles
try {
  const controls = require('./modules/controls').router;
  app.use('/api/controls', controls);
} catch (e) { }

// Module Conformité
try {
  const compliance = require('./modules/compliance').router;
  app.use('/api/compliance', compliance);
} catch (e) { }

// Module Audit
try {
  const auditing = require('./modules/auditing').router;
  app.use('/api/auditing', auditing);
} catch (e) { }

// Module Incidents
try {
  const incidents = require('./modules/incidents').router;
  app.use('/api/incidents', incidents);
} catch (e) { }

// Module Actions
try {
  const actions = require('./modules/actions').router;
  app.use('/api/actions', actions);
} catch (e) { }

// Module Reporting
try {
  const reporting = require('./modules/reporting').router;
  app.use('/api/reporting', reporting);
} catch (e) { }

// Module Supervision
try {
  const supervision = require('./modules/supervision').router;
  app.use('/api/supervision', supervision);
} catch (e) { }

/**
 * --- ROUTES CORE ---
 */

// Authentification
import { router as authRoutes } from './modules/auth/auth.routes';
app.use('/api/auth', authRoutes);

// Utilisateurs
import { router as userRoutes } from './modules/users/user.routes';
app.use('/api/users', userRoutes);

// Départements
import { router as departmentRoutes } from './modules/departments/department.routes';
app.use('/api/departments', departmentRoutes);

// Paramètres
import { router as settingRoutes } from './modules/settings/setting.routes';
app.use('/api/settings', settingRoutes);

// Intelligence Artificielle (Assistant GRC)
import aiRoutes from './modules/ai/ai.routes';
app.use('/api/ai', aiRoutes);

// Notifications
import { router as notificationRoutes } from './modules/notifications/routes';
app.use('/api/notifications', notificationRoutes);

/**
 * --- INITIALISATION DE LA BASE DE DONNÉES ET DÉMARRAGE ---
 */

// Synchronisation avec la base de données SQL
sequelize.sync().then(() => {
  console.log('SQL Database synced');
}).catch((err: Error) => {
  console.error('Failed to sync database:', err);
});

// Port d'écoute du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${PORT}`);
});
