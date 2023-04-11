module.exports = {
  ci: {
    collect: {
      url: ['http://127.0.0.1:4000'],
      startServerCommand: 'npm start',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
