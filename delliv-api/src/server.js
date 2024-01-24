const controller = require('./controller');
const { route } = require('./controllers/route');
const { deliveryPerson } = require('./controllers/deliveryPerson');
const { store } = require('./controllers/store');

module.exports = {
  setEndpoints: (app) => {
    // geral
    app.post('/login', controller.login);

    // entregador
    app.get('/get-all-delivery-people', controller.getAllDeliveryPeople);
    app.get('/get-delivery-person/:id', controller.getDeliveryPerson);
    app.post('/create-delivery-person', controller.createDeliveryPerson);

    // loja
    app.get('/get-store/:id', controller.getStore);
    app.post('/create-store', controller.createStore);

    // item
    app.get('/get-all-items', controller.getAllItems);
    app.post('/create-item', controller.createItem);

    // pedido
    app.get('/get-all-open-orders/:idStore', controller.getAllOpenOrders);
    app.post('/create-order', controller.createOrder);
    app.delete('/delete-order/:idStore/:uuid', controller.deleteOrder);

    app.get(
      '/delivery-person/get-routes/:idDeliveryPerson',
      deliveryPerson.getRoutes
    );

    // NOVOS CONTROLLERS

    // LOJA
    app.get('/store/get-routes/:idStore', store.getRoutes);

    // entregador
    app.get('/delivery-person/get-requests/', deliveryPerson.getRequests);

    // rota
    app.post('/route/create', route.create);
    app.post('/route/set-delivery-person', route.setDeliveryPerson);
    app.post(
      '/route/set-delivery-person-arrival',
      route.setDeliveryPersonArrival
    );
    app.post('/route/set-arrival-confirmation', route.setArrivalConfirmation);
    app.post('/route/set-load', route.setLoad);
    app.post('/route/set-load-confirmation', route.setLoadConfirmation);
    app.post('/route/set-orders', route.setOrders);
    app.post('/route/set-start', route.setStart);
    app.post('/route/set-finish', route.setFinish);
    app.post('/route/set-finish-confirmation', route.setFinishConfirmation);

    return app;
  },
};
