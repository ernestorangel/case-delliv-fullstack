const express = require('express');
const cors = require('cors');
//const { createServer } = require('node:http');
//const { Server } = require('socket.io');

const controller = require('./src/controller');

const app = express();
//const server = createServer(app);
//const io = new Server(server);

const port = 3000;

app.use(express.json());
app.use(cors());

//delivery-person
//item
//order
//store
//route

app.get('/get-all-delivery-people', controller.getAllDeliveryPeople);
app.get('/get-delivery-person/:id', controller.getDeliveryPerson);
app.post('/create-delivery-person', controller.createDeliveryPerson);

app.get('/get-store/:id', controller.getStore);
app.post('/create-store', controller.createStore);

app.get('/get-all-items', controller.getAllItems);
// app.get('/get-item/:id', controller.getItem);
app.post('/create-item', controller.createItem);

app.get('/get-all-open-orders/:idStore', controller.getAllOpenOrders);
// app.get('/get-order/:id', controller.getOrder);
app.post('/create-order', controller.createOrder);

// app.get('/get-route/:id', controller.getOrder);

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
