import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './database';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/src/storage', express.static('src/storage'));

// Import module routers (will exist after module creation)
try {
  const governance = require('./modules/governance').router;
  app.use('/api/governance', governance);
} catch (e) { }
try {
  const risk = require('./modules/risk').router;
  app.use('/api/risk', risk);
} catch (e) {
  console.error('Failed to load risk module:', e);
}
try {
  const controls = require('./modules/controls').router;
  app.use('/api/controls', controls);
} catch (e) { }
try {
  const compliance = require('./modules/compliance').router;
  app.use('/api/compliance', compliance);
} catch (e) { }
try {
  const auditing = require('./modules/auditing').router;
  app.use('/api/auditing', auditing);
} catch (e) { }
try {
  const incidents = require('./modules/incidents').router;
  app.use('/api/incidents', incidents);
} catch (e) { }
try {
  const actions = require('./modules/actions').router;
  app.use('/api/actions', actions);
} catch (e) { }
try {
  const reporting = require('./modules/reporting').router;
  app.use('/api/reporting', reporting);
} catch (e) { }
try {
  const supervision = require('./modules/supervision').router;
  app.use('/api/supervision', supervision);
} catch (e) { }

// Auth routes
import { router as authRoutes } from './modules/auth/auth.routes';
app.use('/api/auth', authRoutes);

// User routes
import { router as userRoutes } from './modules/users/user.routes';
app.use('/api/users', userRoutes);

// Department routes
import { router as departmentRoutes } from './modules/departments/department.routes';
app.use('/api/departments', departmentRoutes);

// Settings routes
import { router as settingRoutes } from './modules/settings/setting.routes';
app.use('/api/settings', settingRoutes);

// AI routes
import aiRoutes from './modules/ai/ai.routes';
app.use('/api/ai', aiRoutes);

// Notifications routes
import { router as notificationRoutes } from './modules/notifications/routes';
app.use('/api/notifications', notificationRoutes);

// Sync Database
sequelize.sync().then(() => {
  console.log('SQL Database synced');
}).catch((err: Error) => {
  console.error('Failed to sync database:', err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${PORT}`);
});
