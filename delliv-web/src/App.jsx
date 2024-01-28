import './styles/App.css';
import Login from './components/Login';
import Toast from './components/Toast';
import AppBar from './components/AppBar';
import AppContent from './components/AppContent';
import axios from 'axios';
import React from 'react';
import { io } from 'socket.io-client';

function App({ serverApiAddress, serverSocketAddress, clientType }) {
  const [toastType, setToastType] = React.useState();
  const [toastMessage, setToastMessage] = React.useState();
  const [store, setStore] = React.useState({});
  const [socket, setSocket] = React.useState({});
  const [openOrders, setOpenOrders] = React.useState([]);
  const [selectedOpenOrders, setSelectedOpenOrders] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState({});
  const [routes, setRoutes] = React.useState([]);
  const [selectedRoute, setSelectedRoute] = React.useState({});

  const showToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
  };

  const clearToast = () => {
    setToastType(undefined);
    setToastMessage(undefined);
  };

  React.useEffect(() => {
    if (Object.keys(store).length)
      axios
        .get(`${serverApiAddress}/store/get-routes/${store.id}`)
        .then((res) => {
          setRoutes([...res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [store]);

  React.useEffect(() => {
    if (Object.keys(store).length)
      axios
        .get(`${serverApiAddress}/store/get-items/${store.id}`)
        .then((res) => {
          setItems([...res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [store]);

  React.useEffect(() => {
    if (Object.keys(store).length)
      axios
        .get(`${serverApiAddress}/store/get-open-orders/${store.id}`)
        .then((res) => {
          setOpenOrders([...res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [store]);

  React.useEffect(() => {
    if (Object.keys(store).length) {
      const socket = io(serverSocketAddress, {
        transports: ['websocket'],
        query: {
          type: clientType,
          id: store.id,
        },
      });

      socket.on('request-accepted', async () => {
        await axios
          .get(`${serverApiAddress}/store/get-routes/${store.id}`)
          .then((res) => {
            setRoutes([...res.data]);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      socket.on('delivery-person-arrived', async () => {
        await axios
          .get(`${serverApiAddress}/store/get-routes/${store.id}`)
          .then((res) => {
            setRoutes([...res.data]);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      socket.on('load-confirmed', async () => {
        await axios
          .get(`${serverApiAddress}/store/get-routes/${store.id}`)
          .then((res) => {
            setRoutes([...res.data]);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      socket.on('route-started', async () => {
        await axios
          .get(`${serverApiAddress}/store/get-routes/${store.id}`)
          .then((res) => {
            setRoutes([...res.data]);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      socket.on('delivery-person-finished', async () => {
        await axios
          .get(`${serverApiAddress}/store/get-routes/${store.id}`)
          .then((res) => {
            setRoutes([...res.data]);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      setSocket(socket);
    }
  }, [store]);

  const onRequestDeliveryPerson = () => {
    socket.emit('request-delivery-person', store.id, async (message) => {
      console.log(message);
      await axios
        .get(`${serverApiAddress}/store/get-routes/${store.id}`)
        .then((res) => {
          setRoutes([...res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const onConfirmArrival = (e, routeId) => {
    socket.emit('confirm-arrival', routeId, async (res) => {
      await axios
        .get(`${serverApiAddress}/store/get-routes/${store.id}`)
        .then((res) => {
          setRoutes([...res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const onLoadOrders = async () => {
    await axios
      .post(`${serverApiAddress}/route/set-orders`, {
        routeId: selectedRoute.routeId,
        storeId: store.id,
        orders: selectedOpenOrders,
      })
      .then((res) => {
        setRoutes(res.data.routes);
        setSelectedRoute(
          res.data.routes.filter(
            (route) => route.routeId == selectedRoute.routeId
          )[0]
        );
        setOpenOrders(res.data.openOrders);
      });
  };

  const onLoaded = (e, routeId) => {
    socket.emit('loaded', routeId, async (res) => {
      await axios
        .get(`${serverApiAddress}/store/get-routes/${store.id}`)
        .then((res) => {
          setRoutes([...res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const onConfirmFinish = (e, routeId) => {
    socket.emit('confirm-finish', routeId, async (res) => {
      await axios
        .get(`${serverApiAddress}/store/get-routes/${store.id}`)
        .then((res) => {
          setRoutes([...res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const onCreateOrder = () => {
    axios
      .post(`${serverApiAddress}/store/create-order`, {
        storeId: store.id,
        items: selectedItems,
      })
      .then((res) => {
        setOpenOrders(res.data);
        setSelectedItems({});
      });
  };

  const onDeleteOrder = (e, uuid) => {
    axios
      .delete(`${serverApiAddress}/delete-order/${store.id}/${uuid}`)
      .then((res) => {
        setOpenOrders(res.data);
      });
  };

  const onSelectOrder = (e, uuid, isChecked) => {
    const found = selectedOpenOrders.find((id) => uuid == id);

    if (isChecked && !found)
      setSelectedOpenOrders([...selectedOpenOrders, uuid]);

    if (!isChecked && found)
      setSelectedOpenOrders([...selectedOpenOrders.filter((id) => id != uuid)]);
  };

  const onAddOrdersToRoute = () => {
    console.log('routes: ', routes);
    console.log('selectedRoute: ', selectedRoute);
    console.log('openOrders: ', openOrders);
    console.log('selectedOpenOrders: ', selectedOpenOrders);

    setOpenOrders([
      ...openOrders.filter(
        (order) => !selectedOpenOrders.find((uuid) => order.uuid == uuid)
      ),
    ]);

    setRoutes([
      ...routes.map((route) => {
        if (route.routeId == selectedRoute.routeId) {
          route.orders.push(
            openOrders.filter((order) =>
              selectedOpenOrders.find((uuid) => order.uuid == uuid)
            )
          );
          return route;
        }
      }),
    ]);
  };

  const onSelectDeliveryPerson = (e, route) => {
    setSelectedRoute(route);
  };

  const onAddItemCount = (id, addBy) => {
    let newSelected = { ...selectedItems };
    if (newSelected[`${id}`]) newSelected[`${id}`] += addBy;
    else newSelected[`${id}`] = addBy;
    if (newSelected[`${id}`] <= 0) delete newSelected[`${id}`];
    setSelectedItems(newSelected);
  };

  if (!Object.keys(store).length) {
    const onLogin = async (e, typedCredentials) => {
      e.preventDefault();
      await axios
        .post(`${serverApiAddress}/user/login`, {
          type: clientType,
          ...typedCredentials,
        })
        .then((res) => {
          setStore(res.data);
        })
        .catch((err) => {
          showToast('error', err.response.data);
        });
    };

    return (
      <>
        <Toast
          type={toastType}
          message={toastMessage}
          clear={clearToast}
        ></Toast>
        <Login onLogin={onLogin}></Login>
      </>
    );
  }

  return (
    <>
      <Toast type={toastType} message={toastMessage}></Toast>
      <AppBar store={store}></AppBar>
      <AppContent
        routes={routes}
        selectedRoute={selectedRoute}
        openOrders={openOrders}
        items={items}
        selectedItems={selectedItems}
        onRequestDeliveryPerson={onRequestDeliveryPerson}
        onSelectDeliveryPerson={onSelectDeliveryPerson}
        onSelectOrder={onSelectOrder}
        onAddOrdersToRoute={onAddOrdersToRoute}
        onLoadOrders={onLoadOrders}
        onDeleteOrder={onDeleteOrder}
        onAddItemCount={onAddItemCount}
        onCreateOrder={onCreateOrder}
      ></AppContent>
    </>
  );
}

export default App;
