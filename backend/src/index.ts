import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import sequelize from './database';
import { authenticateToken } from './middleware/auth.middleware';
import { AIContextService } from './modules/ai/ai-context.service';
import { appLogger } from './utils/app-logger';
import { PortConfig } from './port-config';
import { getLookupSchemaReadiness } from './database/schema-readiness';

dotenv.config();

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const isDevServerRun = process.env.npm_lifecycle_event === 'dev';
const allowLocalOrigins = !isProduction || isDevServerRun;

const parseCsv = (value?: string): string[] =>
    (value || '')
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean);

const wildcardToRegExp = (pattern: string): RegExp => {
    const escapedPattern = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`^${escapedPattern.replace(/\\\*/g, '.*')}$`, 'i');
};

const exactAllowedOrigins = Array.from(
    new Set([
        ...parseCsv(process.env.CORS_ALLOWED_ORIGINS),
        ...parseCsv(process.env.FRONTEND_URL),
        ...parseCsv(process.env.PUBLIC_URL),
    ])
);

const allowedOriginPatternValues = parseCsv(process.env.CORS_ALLOWED_ORIGIN_PATTERNS);
const allowedOriginPatterns = allowedOriginPatternValues.map(wildcardToRegExp);

const isPrivateNetworkHost = (hostname: string): boolean =>
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    /^10(?:\.\d{1,3}){3}$/.test(hostname) ||
    /^172\.(1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2}$/.test(hostname) ||
    /^192\.168(?:\.\d{1,3}){2}$/.test(hostname);

const isLocalOrigin = (origin: string): boolean => {
    try {
        const { protocol, hostname } = new URL(origin);
        return /^https?:$/.test(protocol) && isPrivateNetworkHost(hostname);
    } catch (_error) {
        return false;
    }
};

const isOriginAllowed = (origin: string): boolean => {
    if (exactAllowedOrigins.includes(origin)) {
        return true;
    }

    if (allowedOriginPatterns.some((pattern) => pattern.test(origin))) {
        return true;
    }

    if (allowLocalOrigins && isLocalOrigin(origin)) {
        return true;
    }

    return false;
};

app.use(helmet({
    crossOriginResourcePolicy: false,
}));

const authLimiter = rateLimit({
    windowMs: isProduction ? 15 * 60 * 1000 : 60 * 1000,
    max: isProduction ? 10 : 100,
    skipSuccessfulRequests: true,
    message: {
        message: 'Système de protection activé : trop de tentatives de connexion. Veuillez réessayer plus tard.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || isOriginAllowed(origin)) {
            callback(null, true);
            return;
        }

        appLogger.warn('Boot', 'Rejected CORS origin', {
            origin,
            allowedOrigins: exactAllowedOrigins,
            allowedOriginPatterns: allowedOriginPatternValues,
            allowLocalOrigins,
        });
        callback(new Error('Not allowed by CORS'));
    },
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use('/src/storage', authenticateToken, express.static('src/storage'));

try {
    const governance = require('./modules/governance').router;
    app.use('/api/governance', governance);
} catch (_error) {}

try {
    const risk = require('./modules/risk').router;
    app.use('/api/risk', risk);
} catch (error) {
    appLogger.error('Boot', 'Failed to load risk module', error);
}

try {
    const controls = require('./modules/controls').router;
    app.use('/api/controls', controls);
} catch (_error) {}

try {
    const controlEvaluations = require('./modules/control-evaluations').router;
    app.use('/api/control-evaluations', controlEvaluations);
} catch (_error) {}

try {
    const compliance = require('./modules/compliance').router;
    app.use('/api/compliance', compliance);
} catch (_error) {}

try {
    const auditPlanning = require('./modules/audit-planning').router;
    app.use('/api/audit-planning', auditPlanning);
} catch (_error) {}

try {
    const incidents = require('./modules/incidents').router;
    app.use('/api/incidents', incidents);
} catch (_error) {}

try {
    const actions = require('./modules/actions').router;
    app.use('/api/actions', actions);
} catch (_error) {}

try {
    const reporting = require('./modules/reporting').router;
    app.use('/api/reporting', reporting);
} catch (_error) {}

try {
    const notifications = require('./modules/notifications').router;
    app.use('/api/notifications', notifications);
} catch (error) {
    appLogger.error('Boot', 'Failed to load notifications module', error);
}

try {
    const supervision = require('./modules/supervision').router;
    app.use('/api/supervision', supervision);
} catch (_error) {}

import { router as authRoutes } from './modules/auth/auth.routes';
app.use('/api/auth/login', authLimiter);
app.use('/api/auth', authRoutes);

import { router as userRoutes } from './modules/users/user.routes';
app.use('/api/users', userRoutes);

import { router as departmentRoutes } from './modules/departments/department.routes';
app.use('/api/departments', departmentRoutes);

import { router as settingRoutes } from './modules/settings/setting.routes';
app.use('/api/settings', settingRoutes);

import aiRoutes from './modules/ai/ai.routes';
app.use('/api/assistant', aiRoutes);

import aiContextRoutes from './modules/ai/ai-contexts.routes';
app.use('/api/ai-contexts', aiContextRoutes);

import organigrammeRoutes from './modules/organigramme/organigramme.routes';
app.use('/api/organigramme', organigrammeRoutes);

const startReminderService = async () => {
    try {
        const { PeriodicReminderService } = require('./modules/notifications');
        if (!PeriodicReminderService) {
            return;
        }

        await PeriodicReminderService.checkPeriodicRisks();
        setInterval(() => {
            PeriodicReminderService.checkPeriodicRisks();
        }, 24 * 60 * 60 * 1000);
        appLogger.info('Boot', 'Periodic reminder service started');
    } catch (error) {
        appLogger.error('Boot', 'Failed to start periodic reminder service', error);
    }
};

const startServer = async () => {
    try {
        await sequelize.authenticate();
        appLogger.info('Boot', 'SQL database connection established');

        const schemaReadiness = await getLookupSchemaReadiness();
        if (!schemaReadiness.ready) {
            appLogger.warn(
                'Boot',
                'Lookup schema is not ready. Run "npm run db:migrate" before using lookup-backed services.',
                {
                    missingCount: schemaReadiness.missing.length,
                    missingPreview: schemaReadiness.missing.slice(0, 10),
                }
            );
        }

        if (schemaReadiness.ready) {
            try {
                const syncResult = await AIContextService.ensureDefaultContexts();
                if (syncResult.createdCount > 0 || syncResult.updatedCount > 0) {
                    appLogger.info('Boot', 'AI contexts synchronized', {
                        createdCount: syncResult.createdCount,
                        updatedCount: syncResult.updatedCount,
                        touchedNames: syncResult.touchedNames,
                    });
                } else {
                    appLogger.debug('Boot', 'AI contexts already up to date');
                }
            } catch (error: any) {
                appLogger.error('Boot', 'Failed to synchronize AI contexts', error.message || error);
            }
        } else {
            appLogger.warn('Boot', 'Skipping AI context synchronization until the lookup migrations are applied.');
        }

        const PORT = PortConfig.BACKEND_PORT;
        appLogger.info('Boot', 'Port configuration', PortConfig.logSummary());
        app.listen(PORT, async () => {
            appLogger.info('Boot', 'Backend listening', { port: PORT });
            if (schemaReadiness.ready) {
                await startReminderService();
            } else {
                appLogger.warn('Boot', 'Skipping periodic reminder service until the lookup migrations are applied.');
            }
        });
    } catch (error) {
        appLogger.error('Boot', 'Database startup failed. Run the Sequelize migrations before starting the API.', error);
    }
};

startServer();
