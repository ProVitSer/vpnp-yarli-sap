module.exports = {
    apps : [{
      name: 'VPNP-Yarli-Sap',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
    }],
  }