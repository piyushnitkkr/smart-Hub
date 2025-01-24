// vercel.config.js

module.exports = {
  // Specify the root directory for your project (if it's not the root of the repo)
  root: './',

  // Define the build settings for Node.js
  build: {
    env: {
      // Set environment variables (optional)
      NODE_ENV: 'production',
    },
  },

  // Specify the routes for your project (optional)
  routes: [
    {
      // Custom route handling (example: API routes)
      src: '/api/(.*)',
      dest: '/api/$1',
    },
  ],

  // Specify the output directory (optional)
  outputDirectory: './out',

  // Define the deployment settings for different environments (optional)
  deployments: {
    preview: {
      regions: ['sfo1', 'cdg1'],
    },
    production: {
      regions: ['iad1'],
    },
  },

  // Enable or disable serverless functions (optional)
  functions: {
    api: {
      maxDuration: 10, // Timeout in seconds
      memory: 1024, // Memory in MB
    },
  },
};
