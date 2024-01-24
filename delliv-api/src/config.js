const express = require('express');
const cors = require('cors');

const { setEndpoints } = require('./server');

module.exports = {
  configApp: (app) => {
    app.use(express.json());
    app.use(cors());

    return setEndpoints(app);
  },
};
