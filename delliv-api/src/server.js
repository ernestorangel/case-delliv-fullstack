const { user, store, deliveryPerson, route } = require('./controller');

module.exports = {
  setEndpoints: (app) => {
    app.post('/user/login', user.login);
    app.post('/user/signup', user.create);

    app.get('/store/get-routes/:storeId', store.getRoutes);
    app.get('/store/get-open-orders/:storeId', store.getOpenOrders);
    app.get('/store/get-items/:storeId', store.getItems);
    app.post('/store/create-order', store.createOrder);
    app.post('/store/create-item', store.createItem);
    app.delete('/store/delete-order', store.deleteOrder);
    //app.delete('/store/delete-item', store.deleteItem);

    app.get('/delivery-person/get-requests/:id', deliveryPerson.getRequests);
    app.get('/delivery-person/get-route/:id', deliveryPerson.getRoute);

    app.get('/route/get-store-socket-id/:routeId', route.getStoreSocket);
    app.get(
      '/route/get-delivery-person-socket-id/:routeId',
      route.getDeliveryPersonSocket
    );
    app.post('/route/create', route.create);
    app.post('/route/set-delivery-person', route.setDeliveryPerson);
    app.post('/route/set-arrival', route.setDeliveryPersonArrival);
    app.post('/route/set-arrival-confirmation', route.setArrivalConfirmation);
    app.post('/route/set-load', route.setLoad);
    app.post('/route/set-load-confirmation', route.setLoadConfirmation);
    app.post('/route/set-orders', route.setOrders);
    app.post('/route/set-start', route.setStart);
    app.post('/route/set-finish', route.setFinish);
    app.post('/route/set-finish-confirmation', route.setFinishConfirmation);

    app.post('/store/socket/set', store.setSocket);
    app.post('/delivery-person/socket/set', deliveryPerson.setSocket);

    return app;
  },
};
