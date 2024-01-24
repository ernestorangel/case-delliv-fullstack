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
              storeSocketId: socket.id,
            });
          });
      });

      socket.on(
        'accept-store-request',
        async (deliveryPersonId, routeId, storeSocketId) => {
          await axios
            .post(
              `http://${process.env.API_HOST}:${process.env.API_PORT}/route/set-delivery-person`,
              { routeId: routeId, deliveryPersonId: deliveryPersonId }
            )
            .then((res) => {
              console.log(
                'res.data accept-store-request: ',
                res.data,
                storeSocketId
              );
              socket
                .to(storeSocketId)
                .emit('delivery-person-accepted', routeId);
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
