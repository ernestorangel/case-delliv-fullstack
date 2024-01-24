const express = require('express');
const { createServer } = require('http');
const { configApp } = require('./src/config');
const { setSocket } = require('./src/socket');

const dotenv = require('dotenv');
dotenv.config();

const app = configApp(express());
const server = setSocket(createServer(app));

app.listen(process.env.API_PORT, () => {
  console.log(`Endpoints exposed at http://localhost:${process.env.API_PORT}`);
});

server.listen(process.env.SOCKETS_PORT, () => {
  console.log(
    `Sockets running at http://localhost:${process.env.SOCKETS_PORT}`
  );
});
