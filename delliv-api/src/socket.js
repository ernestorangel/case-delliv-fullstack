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

      socket.on('request-delivery-person', async (store, cb) => {
        await axios
          .post(
            `http://${process.env.API_HOST}:${process.env.API_PORT}/route/create`,
            { storeId: store.id }
          )
          .then((res) => {
            console.log(
              `A loja ${store.name} quer um entregador ${JSON.stringify(
                res.data
              )}`
            );

            socket.to('delivery-people').emit('delivery-request', {
              routeId: res.data.insertId || res.data[0].id,
              storeSocketId: socket.id,
            });

            cb(`requested ${socket.id}`);
          });
      });

      socket.on(
        'accept-store-request',
        async (deliveryPersonId, routeId, storeSocketId, cb) => {
          await axios
            .post(
              `http://${process.env.API_HOST}:${process.env.API_PORT}/route/set-delivery-person`,
              { routeId: routeId, deliveryPersonId: deliveryPersonId }
            )
            .then((res) => {
              console.log('aceitou', socket.id, storeSocketId);
              socket
                .to(storeSocketId)
                .emit('delivery-person-accepted', routeId);

              cb('sentadão');
            });
        }
      );

      socket.on('join-room', (deliveryPerson) => {
        socket.join(deliveryPerson.socket);
      });
    });

    return server;
  },
};
