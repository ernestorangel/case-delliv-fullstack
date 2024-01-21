const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const controller = require('./src/controller');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5137'],
  },
});

app.use(express.json());
app.use(cors());

app.post('/login', controller.login);

app.get('/get-all-delivery-people', controller.getAllDeliveryPeople);
app.get('/get-delivery-person/:id', controller.getDeliveryPerson);
app.post('/create-delivery-person', controller.createDeliveryPerson);

app.get('/get-store/:id', controller.getStore);
app.post('/create-store', controller.createStore);

app.get('/get-all-items', controller.getAllItems);
app.post('/create-item', controller.createItem);

app.get('/get-all-open-orders/:idStore', controller.getAllOpenOrders);
app.post('/create-order', controller.createOrder);
app.delete('/delete-order/:idStore/:uuid', controller.deleteOrder);

io.on('connection', (socket) => {
  console.log(`a user connected at socket ${socket.id}`);

  socket.on('request-delivery-person', (idStore, type) => {
    console.log(`A loja ${idStore} quer um entregador`);

    socket.broadcast.emit('');
  });
});

app.listen(3000, () => {
  console.log(`Endpoints exposed at http://localhost:3000`);
});

server.listen(3030, () => {
  console.log(`Sockets running at http://localhost:3030`);
});
