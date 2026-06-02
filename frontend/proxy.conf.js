const backendTarget = process.env.API_PROXY_TARGET || process.env.API_URL || 'http://localhost:3000';

module.exports = [
  {
    context: ['/api', '/src/storage'],
    target: backendTarget,
    changeOrigin: true,
    secure: false,
    logLevel: 'warn'
  }
];
