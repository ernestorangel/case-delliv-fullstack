const express = require('express');
//const { createServer } = require('node:http');
//const { Server } = require('socket.io');

const controller = require('./src/controller');

const app = express();
//const server = createServer(app);
//const io = new Server(server);

const port = 3000;

app.get('/', controller.hello);

app.get('/get-delivery-person/:id', controller.getDeliveryPerson);

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
