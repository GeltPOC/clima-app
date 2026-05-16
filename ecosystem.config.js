module.exports = {
  apps: [{
    name: 'clima-app',
    script: 'npm',
    args: 'start -- -p 3160',
    cwd: '/home/gelt/apps/clima-app',
    env: {
      NODE_ENV: 'production',
      PORT: 3160,
    },
  }],
}
