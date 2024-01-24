const { Server } = require('socket.io');
const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  setSocket: (server) => {
    const io = new Server(server, {
      cors: {
        origin: [`http://${process.env.WEB_HOST}:${process.env.WEB_PORT}`],
      },
    });

    io.on('connection', (socket) => {
      const type = socket.handshake.query.type;

      console.log(`a ${type} connected at socket ${socket.id}`);

      if (type == 'delivery-person') socket.join('delivery-people');

      socket.on('request-delivery-person', async (store) => {
        await axios
          .post(
            `http://${process.env.API_HOST}:${process.env.API_PORT}/route/create`,
            { storeId: store.id }
          )
          .then((res) => {
            console.log(`A loja ${store.name} quer um entregador`);

            socket.to('delivery-people').emit('delivery-request', {
              routeId: res.data.insertId,
            });
          });
      });

      socket.on('accept-store-request', async (deliveryPerson, store) => {
        await axios
          .post(
            `http://${process.env.API_HOST}:${process.env.API_PORT}/route/setDeliveryPerson`,
            { routeId: route.id, deliveryPersonId: deliveryPerson.id }
          )
          .then((res) => {
            console.log(
              `${deliveryPerson.name} aceita o pedido de ${store.name}`
            );
            socket.to(store.socket).emit('delivery-person-accepted', {
              ...deliveryPerson,
              socket: socket.id,
            });
          });
      });

      socket.on('join-room', (deliveryPerson) => {
        socket.join(deliveryPerson.socket);
      });
    });

    return server;
  },
};
