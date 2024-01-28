const { Server } = require('socket.io');
const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();

const setSocketResponses = {
  store: (socket, storeId) => {
    axios
      .post(
        `http://${process.env.API_HOST}:${process.env.API_PORT}/store/socket/set`,
        { storeId, socketId: socket.id }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    socket.on('request-delivery-person', async (storeId, clientFeedback) => {
      await axios
        .post(
          `http://${process.env.API_HOST}:${process.env.API_PORT}/route/create`,
          { storeId }
        )
        .then((res) => {
          socket.to('delivery-people').emit('delivery-request', res);
          clientFeedback(res);
        })
        .catch((err) => {
          clientFeedback(err);
        });
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
              socket.to(res.data).emit('arrival-confirmed');
              clientFeedback(res);
            });
        })
        .catch((err) => {
          clientFeedback(err);
        });
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
              socket.to(res.data).emit('store-loaded');
              clientFeedback(res);
            });
        })
        .catch((err) => {
          clientFeedback(err);
        });
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
              socket.to(res.data).emit('finish-confirmed');
              clientFeedback(res);
            });
        })
        .catch((err) => {
          clientFeedback(err);
        });
    });

    return socket;
  },
  'delivery-person': (socket, deliveryPersonId) => {
    axios
      .post(
        `http://${process.env.API_HOST}:${process.env.API_PORT}/delivery-person/socket/set`,
        { deliveryPersonId, socketId: socket.id }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    socket.join('delivery-people');

    socket.on(
      'accept-store-request',
      async (deliveryPersonId, routeId, clientFeedback) => {
        await axios
          .post(
            `http://${process.env.API_HOST}:${process.env.API_PORT}/route/set-delivery-person`,
            { routeId: routeId, deliveryPersonId: deliveryPersonId }
          )
          .then(async (res) => {
            if (!res.data) return;
            await axios
              .get(
                `http://${process.env.API_HOST}:${process.env.API_PORT}/route/get-store-socket-id/${routeId}`
              )
              .then((res) => {
                socket.to(res.data).emit('request-accepted');
                clientFeedback(res);
              });
          })
          .catch((err) => {
            clientFeedback(err);
          });
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
              socket.to(res.data).emit('delivery-person-arrived');
              clientFeedback(res);
            });
        })
        .catch((err) => {
          clientFeedback(err);
        });
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
              socket.to(res.data).emit('load-confirmed');
              clientFeedback(res);
            });
        })
        .catch((err) => {
          clientFeedback(err);
        });
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
              socket.to(res.data).emit('route-started');
              clientFeedback(res);
            });
        })
        .catch((err) => {
          clientFeedback(err);
        });
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
              socket.to(res.data).emit('delivery-person-finished');
              clientFeedback(res);
            });
        })
        .catch((err) => {
          clientFeedback(err);
        });
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
