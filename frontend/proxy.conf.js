const backendTarget = process.env.API_PROXY_TARGET || process.env.API_URL || 'http://127.0.0.1:3000';

module.exports = [
  {
    context: ['/api', '/src/storage'],
    target: backendTarget,
    changeOrigin: true,
    secure: false,
    logLevel: 'warn'
  }
];
