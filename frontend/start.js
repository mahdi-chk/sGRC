const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Simple helper to load .env manually without dependencies
const envs = {};
const loadEnv = (filePath) => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    content.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const index = trimmed.indexOf('=');
      if (index === -1) return;
      const key = trimmed.substring(0, index).trim();
      const val = trimmed.substring(index + 1).trim().replace(/^['"]|['"]$/g, '');
      envs[key] = val;
    });
  }
};

// Load env files
loadEnv(path.join(__dirname, '../.env'));
loadEnv(path.join(__dirname, '../backend/.env'));
loadEnv(path.join(__dirname, '.env'));

// Merge with process.env
const basePort = parseInt(process.env.BASE_PORT || envs.BASE_PORT || '6000', 10);
const frontendPort = process.env.FRONTEND_PORT || envs.FRONTEND_PORT || String(basePort + 1);

console.log(`Starting Angular Dev Server on port ${frontendPort}...`);
try {
  execSync(`npx ng serve --proxy-config proxy.conf.js --port ${frontendPort}`, { stdio: 'inherit' });
} catch (e) {
  process.exit(1);
}
