const { Server } = require('socket.io');
const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();

const setSocketResponses = {
  store: (socket, storeId) => {
    console.log(`store ${storeId} connected at ${socket.id}`);
    axios
      .post(
        `http://${process.env.API_HOST}:${process.env.API_PORT}/store/socket/set`,
        { storeId, socketId: socket.id }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    socket.on('request-delivery-person', async (storeId, clientFeedback) => {
      await axios
        .post(
          `http://${process.env.API_HOST}:${process.env.API_PORT}/route/create`,
          { storeId }
        )
        .then((res) => {
          socket.to('delivery-people').emit('delivery-request');
        })
        .catch((err) => {
          console.log(err);
        });
      clientFeedback();
    });

    socket.on('confirm-arrival', async (routeId, clientFeedback) => {
      await axios
        .post(
          `http://${process.env.API_HOST}:${process.env.API_PORT}/route/set-arrival-confirmation`,
          { routeId }
        )
        .then(async (res) => {
          if (!res.data) return;
          await axios
            .get(
              `http://${process.env.API_HOST}:${process.env.API_PORT}/route/get-delivery-person-socket-id/${routeId}`
            )
            .then((res) => {
              socket.to(res.data[0].idSocket).emit('arrival-confirmation');
            });
        })
        .catch((err) => {
          console.log(err);
        });
      clientFeedback();
    });

    socket.on('loaded', async (routeId, clientFeedback) => {
      await axios
        .post(
          `http://${process.env.API_HOST}:${process.env.API_PORT}/route/set-load`,
          { routeId }
        )
        .then(async (res) => {
          if (!res.data) return;
          await axios
            .get(
              `http://${process.env.API_HOST}:${process.env.API_PORT}/route/get-delivery-person-socket-id/${routeId}`
            )
            .then((res) => {
              socket.to(res.data[0].idSocket).emit('store-loaded');
            });
        })
        .catch((err) => {
          console.log(err);
        });
      clientFeedback();
    });

    socket.on('confirm-finish', async (routeId, clientFeedback) => {
      await axios
        .post(
          `http://${process.env.API_HOST}:${process.env.API_PORT}/route/set-finish-confirmation`,
          { routeId }
        )
        .then(async (res) => {
          if (!res.data) return;
          await axios
            .get(
              `http://${process.env.API_HOST}:${process.env.API_PORT}/route/get-delivery-person-socket-id/${routeId}`
            )
            .then((res) => {
              socket.to(res.data[0].idSocket).emit('finish-confirmation');
            });
        })
        .catch((err) => {
          console.log(err);
        });
      clientFeedback();
    });

    return socket;
  },
  'delivery-person': (socket, deliveryPersonId) => {
    socket.join('delivery-people');

    axios
      .post(
        `http://${process.env.API_HOST}:${process.env.API_PORT}/delivery-person/socket/set`,
        { deliveryPersonId, socketId: socket.id }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    socket.on(
      'accept-store-request',
      async (deliveryPersonId, routeId, clientFeedback) => {
        await axios
          .post(
            `http://${process.env.API_HOST}:${process.env.API_PORT}/route/set-delivery-person`,
            { routeId: routeId, deliveryPersonId: deliveryPersonId }
          )
          .then(async (res) => {
            console.log('accept res.data out: ', res.data);
            if (!res.data) return;
            await axios
              .get(
                `http://${process.env.API_HOST}:${process.env.API_PORT}/route/get-store-socket-id/${routeId}`
              )
              .then((res) => {
                console.log('accept res.data in: ', res.data);
                socket.to(res.data[0].idSocket).emit('request-accepted');
              });
          })
          .catch((err) => {
            console.log(err);
          });
        clientFeedback();
      }
    );

    socket.on('signal-arrival', async (routeId, clientFeedback) => {
      await axios
        .post(
          `http://${process.env.API_HOST}:${process.env.API_PORT}/route/set-arrival`,
          { routeId }
        )
        .then(async (res) => {
          if (!res.data) return;
          await axios
            .get(
              `http://${process.env.API_HOST}:${process.env.API_PORT}/route/get-store-socket-id/${routeId}`
            )
            .then((res) => {
              console.log('res.data: ', res.data);
              socket.to(res.data[0].idSocket).emit('delivery-person-arrived');
            });
        })
        .catch((err) => {
          console.log(err);
        });
      clientFeedback();
    });

    socket.on('confirm-load', async (routeId, clientFeedback) => {
      await axios
        .post(
          `http://${process.env.API_HOST}:${process.env.API_PORT}/route/set-load-confirmation`,
          { routeId }
        )
        .then(async (res) => {
          if (!res.data) return;
          await axios
            .get(
              `http://${process.env.API_HOST}:${process.env.API_PORT}/route/get-store-socket-id/${routeId}`
            )
            .then((res) => {
              socket.to(res.data[0].idSocket).emit('load-confirmed');
            });
        })
        .catch((err) => {
          console.log(err);
        });
      clientFeedback();
    });

    socket.on('start-route', async (routeId, clientFeedback) => {
      await axios
        .post(
          `http://${process.env.API_HOST}:${process.env.API_PORT}/route/set-start`,
          { routeId }
        )
        .then(async (res) => {
          if (!res.data) return;
          await axios
            .get(
              `http://${process.env.API_HOST}:${process.env.API_PORT}/route/get-store-socket-id/${routeId}`
            )
            .then((res) => {
              socket.to(res.data[0].idSocket).emit('route-started');
            });
        })
        .catch((err) => {
          console.log(err);
        });
      clientFeedback();
    });

    socket.on('signal-finish', async (routeId, clientFeedback) => {
      await axios
        .post(
          `http://${process.env.API_HOST}:${process.env.API_PORT}/route/set-finish`,
          { routeId }
        )
        .then(async (res) => {
          if (!res.data) return;
          await axios
            .get(
              `http://${process.env.API_HOST}:${process.env.API_PORT}/route/get-store-socket-id/${routeId}`
            )
            .then((res) => {
              socket.to(res.data[0].idSocket).emit('delivery-person-finished');
            });
        })
        .catch((err) => {
          console.log(err);
        });
      clientFeedback();
    });

    return socket;
  },
};

module.exports = {
  setSocket: (server) => {
    const io = new Server(server, {
      cors: {
        origin: [`http://${process.env.WEB_HOST}:${process.env.WEB_PORT}`],
      },
    });

    io.on('connection', (socket) => {
      setSocketResponses[`${socket.handshake.query.type}`](
        socket,
        socket.handshake.query.id
      );
    });

    return server;
  },
};
