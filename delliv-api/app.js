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

app.get('/get-all-delivery-people', controller.getAllDeliveryPeople);
app.get('/get-delivery-person/:id', controller.getDeliveryPerson);
app.post('/create-delivery-person', controller.createDeliveryPerson);

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
