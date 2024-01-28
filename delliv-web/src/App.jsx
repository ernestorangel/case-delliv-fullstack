// Import CSS
import './styles/App.css';

// Import Custom Components
import Login from './components/Login';
import Toast from './components/Toast';
import AppBar from './components/AppBar';
import AppContent from './components/AppContent';

// Import libraries
import axios from 'axios';
import React from 'react';
import { io } from 'socket.io-client';

function App({ serverApiAddress, serverSocketAddress, clientType }) {
  // Toast State
  const [toastType, setToastType] = React.useState();
  const [toastMessage, setToastMessage] = React.useState();

  // Store State
  const [store, setStore] = React.useState({});

  // Socket State
  const [socket, setSocket] = React.useState({});

  // Orders State
  const [openOrders, setOpenOrders] = React.useState([]);
  const [specificOrders, setSpecificOrders] = React.useState([]);
  const [selectedOpenOrders, setSelectedOpenOrders] = React.useState([]);
  const [selectedOpenOrder, setSelectedOpenOrder] = React.useState({});

  // Items State
  const [items, setItems] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState({});

  // Delivery People State
  // const [deliveryPeople, setDeliveryPeople] = React.useState([]);
  // const [selectedDeliveryPerson, setSelectedDeliveryPerson] = React.useState(
  //   {}
  // );

  // Routes State
  const [routes, setRoutes] = React.useState([]);
  const [selectedRoute, setSelectedRoute] = React.useState({});

  // Toast methods
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

      socket.on('delivery-person-accepted', async (routeId) => {
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

  // Emit
  const onRequestDeliveryPerson = () => {
    socket.emit('request-delivery-person', store.id, async (message) => {
      console.log(message);
      await axios
        .get(`${serverApiAddress}/store/get-routes/${store.id}`)
        .then((res) => {
          console.log('routes res.data: ', res.data);
          setRoutes(res.data);
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

  const onAddOrdersToDeliveryPerson = () => {};

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

  const onAddOrdersToRoute = async () => {
    await axios
      .post(`${serverApiAddress}/route/set-orders`, {
        routeId: selectedRoute.routeId,
        storeId: store.id,
        orders: selectedOpenOrders,
      })
      .then((res) => {
        console.log('onAddOrdersToRoute res.data: ', res.data);
        setRoutes(res.data.routes);
        setSelectedRoute(
          res.data.routes.filter(
            (route) => route.routeId == selectedRoute.routeId
          )[0]
        );
        setOpenOrders(res.data.openOrders);
      });
  };

  const onDeleteOpenOrder = (e, uuid) => {};

  const onSelectDeliveryPerson = (e, route) => {
    //setSelectedDeliveryPerson(deliveryPerson);
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
        deliveryPeople={deliveryPeople}
        routes={routes}
        selectedRoute={selectedRoute}
        selectedDeliveryPerson={selectedDeliveryPerson}
        specificOrders={specificOrders}
        openOrders={openOrders}
        selectedOpenOrder={selectedOpenOrder}
        items={items}
        selectedItems={selectedItems}
        onRequestDeliveryPerson={onRequestDeliveryPerson}
        onSelectDeliveryPerson={onSelectDeliveryPerson}
        onAddOrdersToRoute={onAddOrdersToRoute}
        onDeleteOpenOrder={onDeleteOpenOrder}
        onSelectOrder={onSelectOrder}
        onAddOrdersToDeliveryPerson={onAddOrdersToDeliveryPerson}
        onAddItemCount={onAddItemCount}
        onCreateOrder={onCreateOrder}
        onDeleteOrder={onDeleteOrder}
      ></AppContent>
    </>
  );
}

export default App;
