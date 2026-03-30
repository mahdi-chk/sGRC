/**
 * @file index.ts
 * @description Point d'entrée principal du backend. Configure le serveur Express, 
 * les middlewares et définit les routes de l'API.
 */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import sequelize from './database';
import { authenticateToken } from './middleware/auth.middleware';

// Configuration des variables d'environnement
dotenv.config();

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

/**
 * --- CONFIGURATION DES MIDDLEWARES ---
 */

// Injection des recommandations OWASP pour la sécurisation des requêtes (HSTS, NoSniff, etc.)
// Désactive crossOriginResourcePolicy pour permettre au frontend d'importer les pièces jointes
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// Throttling adaptatif pour bloquer les attaques de force brute sur l'authentification
const authLimiter = rateLimit({
  windowMs: isProduction ? 15 * 60 * 1000 : 60 * 1000, // Fenêtre plus courte en local pour éviter de bloquer le développement
  max: isProduction ? 10 : 100, // Seuil strict en production, plus tolérant en local
  skipSuccessfulRequests: true, // Ne compter que les tentatives de connexion en échec
  message: {
    message: "Système de protection activé : trop de tentatives de connexion. Veuillez réessayer plus tard."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Activation de CORS (Cross-Origin Resource Sharing) - Restreint au frontend !
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:4200'].filter(Boolean) as string[];
app.use(cors({
  origin: (origin, callback) => {
    // Permettre les requêtes sans origine (comme les outils de test API) ou les origines autorisées
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}));

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Service des fichiers statiques pour le stockage des pièces justificatives (Protégé par JWT)
app.use('/src/storage', authenticateToken, express.static('src/storage'));

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

// Module Notifications
try {
  const notifications = require('./modules/notifications').router;
  app.use('/api/notifications', notifications);
} catch (e) {
  console.error('Failed to load notifications module:', e);
}

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
app.use('/api/auth/login', authLimiter); // Appliquer le limiteur spécifiquement sur le login
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
app.use('/api/assistant', aiRoutes);

// Organigramme
import organigrammeRoutes from './modules/organigramme/organigramme.routes';
app.use('/api/organigramme', organigrammeRoutes);

/**
 * --- INITIALISATION DE LA BASE DE DONNÉES ET DÉMARRAGE ---
 */

// Synchronisation avec la base de données SQL
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQL Database connection established.');

    // --- PRE-SYNC CLEANUP pour MSSQL (Résolution du conflit de FK sur responsableTraitementId) ---
    try {
      // 1. S'assurer que la table organigramme existe
      await sequelize.query(`
        IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'organigramme')
        CREATE TABLE [organigramme] (id INT PRIMARY KEY IDENTITY(1,1), nom NVARCHAR(255) NOT NULL UNIQUE);
      `);

      // 2. Créer une entrée par défaut si vide
      await sequelize.query(`
        IF NOT EXISTS (SELECT TOP 1 * FROM [organigramme])
        INSERT INTO [organigramme] (nom) VALUES ('Direction Générale');
      `);

      // 3. Mettre à jour les risques orphelins (qui pointent vers des ID inexistants dans organigramme)
      // On récupère le premier ID valide
      await sequelize.query(`
        UPDATE [risks]
        SET [responsableTraitementId] = (SELECT TOP 1 id FROM [organigramme])
        WHERE [responsableTraitementId] NOT IN (SELECT id FROM [organigramme])
        OR [responsableTraitementId] IS NULL;
      `);
      
      console.log('Pre-sync cleanup: Organigramme seeded and risks orphaned references fixed.');
    } catch (e: any) {
      console.log('Pre-sync cleanup skipped or failed (likely tables do not exist yet):', e.message);
    }

    await sequelize.sync();
    console.log('SQL Database synced');

  // Ajout manuel des colonnes pour MSSQL (car alter:true échoue sur les contraintes UNIQUE)
  try {
    const addColumn = async (colName: string, type: string) => {
      await sequelize.query(`
        IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('[risks]') AND name = '${colName}')
        ALTER TABLE [risks] ADD ${colName} ${type};
      `);
    };

    const updateColumnType = async (colName: string, newType: string) => {
      try {
        await sequelize.query(`ALTER TABLE [risks] ALTER COLUMN [${colName}] ${newType};`);
      } catch (e) {
        // Ignorer si la colonne n'existe pas ou erreur d'alter
      }
    };

    const addDefaultConstraint = async (tableName: string, colName: string, defaultValue: string) => {
      try {
        // Supprimer l'ancienne contrainte si elle existe (MSSQL nécessite un nom de contrainte spécifique)
        await sequelize.query(`
          DECLARE @ConstraintName nvarchar(200)
          SELECT @ConstraintName = Name FROM sys.default_constraints
          WHERE PARENT_OBJECT_ID = OBJECT_ID('[${tableName}]')
          AND PARENT_COLUMN_ID = (SELECT column_id FROM sys.columns WHERE NAME = '${colName}' AND object_id = OBJECT_ID('[${tableName}]'))
          
          IF @ConstraintName IS NOT NULL
          EXEC('ALTER TABLE [${tableName}] DROP CONSTRAINT ' + @ConstraintName)
          
          ALTER TABLE [${tableName}] ADD CONSTRAINT DF_${tableName}_${colName} DEFAULT '${defaultValue}' FOR [${colName}]
        `);
      } catch (e) {
        console.error(`Failed to add default constraint for ${tableName}.${colName}:`, e);
      }
    };

    const ensureSoftDeleteColumns = async (tableName: string) => {
      try {
        await sequelize.query(`
          IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('[${tableName}]') AND name = 'is_deleted')
          ALTER TABLE [${tableName}] ADD [is_deleted] BIT NULL;

          IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('[${tableName}]') AND name = 'deleted_at')
          ALTER TABLE [${tableName}] ADD [deleted_at] DATETIMEOFFSET NULL;

          IF EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('[${tableName}]') AND name = 'is_deleted')
          BEGIN
            EXEC('UPDATE [${tableName}] SET [is_deleted] = 0 WHERE [is_deleted] IS NULL');
            EXEC('ALTER TABLE [${tableName}] ALTER COLUMN [is_deleted] BIT NOT NULL');
          END
        `);

        await addDefaultConstraint(tableName, 'is_deleted', '0');
      } catch (e) {
        console.error(`Failed to add soft delete columns to ${tableName}:`, e);
      }
    };

    await addColumn('aiAnalysisScore', 'INT NULL');
    await addColumn('aiAnalysisImpact', 'NVARCHAR(MAX) NULL');
    await addColumn('aiAnalysisTendance', 'NVARCHAR(255) NULL');
    await addColumn('aiAnalysisSuggestion', 'NVARCHAR(MAX) NULL');
    await addColumn('aiAnalysisDate', 'DATETIMEOFFSET NULL');

    // Ajout manuel des nouvelles colonnes pour la cotation granulaire des risques
    await addColumn('macroProcessus', 'NVARCHAR(255) NULL');
    await addColumn('processus', 'NVARCHAR(255) NULL');
    await addColumn('probabilite', 'NVARCHAR(50) NULL');
    await addColumn('cotationProbabilite', 'INT NULL');
    await addColumn('impact', 'NVARCHAR(50) NULL');
    await addColumn('cotationImpact', 'INT NULL');
    await addColumn('cotationRisqueBrut', 'NVARCHAR(50) NULL');
    await addColumn('niveauCotationRisqueBrut', 'INT NULL');
    await addColumn('dmrExistant', 'NVARCHAR(MAX) NULL');
    await addColumn('niveauMaitrise', 'NVARCHAR(50) NULL');
    await addColumn('cotationDmr', 'INT NULL');
    await addColumn('cotationRisqueNet', 'NVARCHAR(50) NULL');
    await addColumn('niveauCotationRisqueNet', 'INT NULL');
    await addColumn('planActionTraitement', 'NVARCHAR(MAX) NULL');
    await addColumn('incidentId', 'INT NULL');

    const softDeleteTables = [
      'users',
      'departments',
      'organigramme',
      'system_settings',
      'risks',
      'risk_comments',
      'notifications',
      'incidents',
      'audit_missions',
      'audit_checklist_templates',
      'audit_checklist_template_items',
      'audit_mission_checklist_items',
      'audit_evidences',
    ];

    for (const tableName of softDeleteTables) {
      await ensureSoftDeleteColumns(tableName);
    }

    // Mise à jour de la table incidents pour inclure les nouveaux attributs
    try {
      const addIncidentColumn = async (colName: string, type: string) => {
        await sequelize.query(`
          IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('[incidents]') AND name = '${colName}')
          ALTER TABLE [incidents] ADD ${colName} ${type};
        `);
      };

      await addIncidentColumn('departementId', 'INT NULL');
      await addIncidentColumn('domaine', 'NVARCHAR(255) NULL');
      await addIncidentColumn('macroProcessus', 'NVARCHAR(255) NULL');
      await addIncidentColumn('processus', 'NVARCHAR(255) NULL');
      await addIncidentColumn('planActionTraitement', 'NVARCHAR(MAX) NULL');
      await addIncidentColumn('dateEcheance', 'DATETIMEOFFSET NULL');
      await addIncidentColumn('niveauRisque', 'NVARCHAR(50) NULL');
    } catch (e) {
      console.error('Failed to add new columns to incidents:', e);
    }

    // Mise à jour de la table notifications pour inclure auditMissionId
    try {
      await sequelize.query(`
            IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('[notifications]') AND name = 'auditMissionId')
            ALTER TABLE [notifications] ADD auditMissionId INT NULL;
        `);
    } catch (e) {
      console.error('Failed to add auditMissionId to notifications:', e);
    }

    // Mise à jour de la table audit_missions pour inclure checklistTemplateId
    try {
      await sequelize.query(`
            IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('[audit_missions]') AND name = 'checklistTemplateId')
            ALTER TABLE [audit_missions] ADD checklistTemplateId INT NULL;
        `);
    } catch (e) {
      console.error('Failed to add checklistTemplateId to audit_missions:', e);
    }

    // Convertir les colonnes existantes pour supporter les fuseaux horaires (offsets)
    await updateColumnType('aiAnalysisDate', 'DATETIMEOFFSET NULL');
    await updateColumnType('dateEcheance', 'DATETIMEOFFSET NOT NULL');
    await updateColumnType('prochaineEcheance', 'DATETIMEOFFSET NULL');
    await updateColumnType('dernierTraitement', 'DATETIMEOFFSET NULL');
    await updateColumnType('createdAt', 'DATETIMEOFFSET NOT NULL');
    await updateColumnType('updatedAt', 'DATETIMEOFFSET NOT NULL');

    // Ajout manuel des contraintes par défaut (car Sequelize génère un ALTER COLUMN ... DEFAULT invalide sur MSSQL)
    await addDefaultConstraint('users', 'role', 'Auditeur');
    await addDefaultConstraint('incidents', 'statut', 'Nouveau');
    await addDefaultConstraint('risks', 'niveauRisque', 'Faible');
    await addDefaultConstraint('risks', 'statut', 'Ouvert');
    await addDefaultConstraint('risks', 'frequenceTraitement', 'Aucun');
    await addDefaultConstraint('notifications', 'isRead', '0'); // Bit 0 pour false
    await addDefaultConstraint('audit_missions', 'statut', 'À venir');
    await addDefaultConstraint('audit_mission_checklist_items', 'estFait', '0'); // Bit 0 pour false

    console.log('AI Analysis columns checked/added and date types updated to DATETIMEOFFSET');
  } catch (err) {
    console.error('Failed to update database schema manually:', err);
  }

  // Port d'écoute du serveur
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, async () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on port ${PORT}`);

    // Démarrage du planificateur de rappels périodiques
    try {
      const { PeriodicReminderService } = require('./modules/notifications');
      if (PeriodicReminderService) {
        // Exécution immédiate au démarrage
        await PeriodicReminderService.checkPeriodicRisks();
        // Puis toutes les 24 heures
        setInterval(() => {
          PeriodicReminderService.checkPeriodicRisks();
        }, 24 * 60 * 60 * 1000);
        console.log('Periodic reminder service started');
      }
    } catch (e) {
      console.error('Failed to start periodic reminder service:', e);
    }
  });
  } catch (err) {
    console.error('Failed to sync database:', err);
  }
};

startServer();
