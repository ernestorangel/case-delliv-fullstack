const db = require('./db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { sql } = require('./queries');
const { data } = require('./helper');

module.exports = {
  user: {
    login: async (req, res) => {
      const { type, username, password } = req.body;

      const query = sql.user.getByUsername(type, username);
      const rows = await db.runQuery(query);
      const store = rows[0];

      if (!store) return res.status(404).send('Usuário não encontrado');

      bcrypt.compare(password, store.password, (err, result) => {
        if (!err) {
          if (result) res.status(200).send({ id: store.id, name: store.name });
          else res.status(403).send('Senha incorreta');
        } else {
          res.status(500).send('Erro no servidor. Tente novamente mais tarde.');
        }
      });
    },
    create: (req, res) => {
      // CREATE DELIVERY PERSON
      // const params = req.body;
      // bcrypt.hash(params.password, 10, async function (err, hash) {
      //   const sql_query = sql.createDeliveryPerson({
      //     name: params.name,
      //     login: params.login,
      //     encryptedPassword: hash,
      //   });
      //   const result = await db.runQuery(sql_query);
      //   res.send(result);
      // });
      // CREATE STORE
      // const params = req.body;
      // bcrypt.hash(params.password, 10, async function (err, hash) {
      //   const sql_query = sql.createStore({
      //     name: params.name,
      //     username: params.username,
      //     encryptedPassword: hash,
      //   });
      //   const result = await db.runQuery(sql_query);
      //   res.send(result);
      // });
    },
  },
  store: {
    setSocket: async (req, res) => {
      const { storeId, socketId } = req.body;

      const query = sql.store.setSocket(storeId, socketId);
      const result = await db.runQuery(query);

      res.send(result);
    },
    getRoutes: async (req, res) => {
      const { storeId } = req.params;

      const query = sql.store.getRoutes(storeId);
      const routes = data.groupOrdersByRoute(await db.runQuery(query));

      console.log(routes);

      res.send(routes);
    },
    getOpenOrders: async (req, res) => {
      const { storeId } = req.params;

      const query = sql.store.getOpenOrders(storeId);
      const openOrders = data.groupOrders(await db.runQuery(query));

      res.send(openOrders);
    },
    getItems: async (req, res) => {
      const { storeId } = req.params;

      const query = sql.store.getItems(storeId);
      const items = await db.runQuery(query);

      res.send(items);
    },
    createOrder: async (req, res) => {
      const { storeId, items } = req.body;

      const uuid = uuidv4();

      let itemsArray = [];
      for (const idItem in items) {
        itemsArray.push({
          id: idItem,
          quantity: items[idItem],
        });
      }

      const sqlCreateOrder = sql.store.createOrder(uuid, storeId, itemsArray);
      const createOrderInfo = await db.runQuery(sqlCreateOrder);

      const sqlGetOpenOrders = sql.store.getOpenOrders(storeId);
      const openOrders = data.groupOrders(await db.runQuery(sqlGetOpenOrders));

      res.send(openOrders);
    },
    createItem: async (req, res) => {
      const params = req.body;

      const sql = sql.createItem({
        sku: params.sku,
        name: params.name,
        price: params.price,
        description: params.description,
        idStore: params.idStore,
      });
      const result = await db.runQuery(sql);

      res.send(result);
    },
    deleteOrder: async (req, res) => {
      const sql_query = sql.deleteOrder(req.params);
      const result = await db.runQuery(sql_query);

      const sql_query_2 = sql.getAllOpenOrders(req.params.idStore);
      const result_2 = helper.groupOrders(await db.runQuery(sql_query_2));

      res.send(result_2);
    },
    //deleteItem: async (req, res) => {},
  },
  deliveryPerson: {
    setSocket: async (req, res) => {
      const { deliveryPersonId, socketId } = req.body;

      const query = sql.deliveryPerson.setSocket(deliveryPersonId, socketId);
      const result = await db.runQuery(query);

      res.send(result);
    },
    getRequests: async (req, res) => {
      const { deliveryPersonId } = req.params;

      const query = sql.deliveryPerson.getRequests(deliveryPersonId);
      const result = await db.runQuery(query);

      res.send(result);
    },
    getRoute: async (req, res) => {
      const { id } = req.params;

      const query = sql.deliveryPerson.getRoute(id);
      const result = await db.runQuery(query);

      res.send(result);
    },
  },
  route: {
    getStoreSocket: async (req, res) => {
      const { routeId } = req.params;

      const query = sql.route.getStoreSocket(routeId);
      const storeSocketId = await db.runQuery(query);

      res.send(storeSocketId);
    },
    getDeliveryPersonSocket: async (req, res) => {
      const { routeId } = req.params;

      const query = sql.route.getDeliveryPersonSocket(routeId);
      const deliveryPersonSocketId = await db.runQuery(query);

      res.send(deliveryPersonSocketId);
    },
    create: async (req, res) => {
      try {
        const { storeId } = req.body;

        const storeSql = sql.store.getOpenRequests(storeId);
        const openRequests = await db.runQuery(storeSql);

        if (openRequests.length > 1) return res.status(500).send();
        if (openRequests.length == 1)
          return res.status(200).send(`${openRequests[0].id}`);

        const query = sql.route.create(storeId);
        const result = await db.runQuery(query);
        res.status(200).send(`${result.insertId}`);
      } catch (err) {
        res.status(500).send();
      }
    },
    setDeliveryPerson: async (req, res) => {
      const { routeId, deliveryPersonId } = req.body;

      const storesQuery = sql.route.getActiveStore(deliveryPersonId);
      const activeStores = await db.runQuery(storesQuery);

      if (activeStores.length)
        return res.status(200).send('Ja engajado com uma loja.');

      const query = sql.route.setDeliveryPerson(routeId, deliveryPersonId);
      const result = await db.runQuery(query);

      res.send(result);
    },
    setDeliveryPersonArrival: async (req, res) => {
      const { routeId } = req.body;

      const query = sql.route.setDeliveryPersonArrival(routeId);
      const result = await db.runQuery(query);

      res.send(result);
    },
    setArrivalConfirmation: async (req, res) => {
      const { routeId } = req.body;

      const query = sql.route.setArrivalConfirmation(routeId);
      const result = await db.runQuery(query);

      res.send(result);
    },
    setLoad: async (req, res) => {
      const { routeId } = req.body;

      const query = sql.route.setLoad(routeId);
      const result = await db.runQuery(query);

      res.send(result);
    },
    setLoadConfirmation: async (req, res) => {
      const { routeId } = req.body;

      const query = sql.route.setLoadConfirmation(routeId);
      const result = await db.runQuery(query);

      res.send(result);
    },
    setOrders: async (req, res) => {
      const { routeId, storeId, orders } = req.body;

      const querySet = sql.route.setOrders(routeId, orders);
      const setOrdersResult = await db.runQuery(querySet);

      const queryRouteStatus = sql.route.setLoad(routeId);
      const routeStatusResult = await db.runQuery(queryRouteStatus);

      const queryUpdate = sql.order.updateStatus(orders);
      const updateResult = await db.runQuery(queryUpdate);

      const queryRoutes = sql.store.getRoutes(storeId);
      const routes = data.groupOrdersByRoute(await db.runQuery(queryRoutes));

      const queryOrders = sql.store.getOpenOrders(storeId);
      const openOrders = data.groupOrders(await db.runQuery(queryOrders));

      res.send({
        routes: routes,
        openOrders: openOrders,
      });
    },
    setStart: async (req, res) => {
      const { routeId } = req.body;

      const query = sql.route.setStart(routeId);
      const result = await db.runQuery(query);

      res.send(result);
    },
    setFinish: async (req, res) => {
      const { routeId } = req.body;

      const query = sql.route.setFinish(routeId);
      const result = await db.runQuery(query);

      res.send(result);
    },
    setFinishConfirmation: async (req, res) => {
      const { routeId } = req.body;

      const query = sql.route.setFinishConfirmation(routeId);
      const result = await db.runQuery(query);

      res.send(result);
    },
  },
};
