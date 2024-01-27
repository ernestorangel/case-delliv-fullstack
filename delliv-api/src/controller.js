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

      console.log(store);

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
      // console.log(params);
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
      // console.log(params);
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
    getRoutes: async (req, res) => {
      const { storeId } = req.params;

      const query = sql.store.getRoutes(storeId);
      const routes = data.groupOrdersByRoute(await db.runQuery(query));

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

      console.log(createOrderInfo);

      const sqlGetOpenOrders = sql.store.getOpenOrders(storeId);
      const openOrders = data.groupOrders(await db.runQuery(sqlGetOpenOrders));

      res.send(openOrders);
    },
    createItem: async (req, res) => {
      const params = req.body;

      console.log(params);

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

      console.log(result); // implementar checagem

      const sql_query_2 = sql.getAllOpenOrders(req.params.idStore);
      const result_2 = helper.groupOrders(await db.runQuery(sql_query_2));

      res.send(result_2);
    },
    //deleteItem: async (req, res) => {},
  },
  deliveryPerson: {
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

      console.log('route: ', result);

      res.send(result);
    },
  },
  route: {
    create: async (req, res) => {
      const { storeId } = req.body;

      const storeSql = sql.store.getOpenRequests(storeId);
      const openRequests = await db.runQuery(storeSql);
      console.log('openRequests: ', openRequests);
      if (openRequests.length) return res.status(200).send(openRequests);

      const query = sql.route.create(storeId);
      const result = await db.runQuery(query);

      res.send(result);
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

      const sql = route.setDeliveryPersonArrival(routeId);
      const result = await db.runQuery(sql);

      res.send(result);
    },
    setArrivalConfirmation: async (req, res) => {
      const { routeId } = req.body;

      const sql = route.setArrivalConfirmation(routeId);
      const result = await db.runQuery(sql);

      res.send(result);
    },
    setLoad: async (req, res) => {
      const { routeId } = req.body;

      const sql = route.setLoad(routeId);
      const result = await db.runQuery(sql);

      res.send(result);
    },
    setLoadConfirmation: async (req, res) => {
      const { routeId } = req.body;

      const sql = route.setLoadConfirmation(routeId);
      const result = await db.runQuery(sql);

      res.send(result);
    },
    setOrders: async (req, res) => {
      const { routeId, storeId, orders } = req.body;

      const querySet = sql.route.setOrders(routeId, orders);
      const setOrdersResult = await db.runQuery(querySet);

      // check se criou
      console.log('setOrdersResult: ', setOrdersResult);

      const queryUpdate = sql.order.updateStatus(orders);
      const updateResult = await db.runQuery(queryUpdate);

      // check se criou
      console.log('updateResult: ', updateResult);

      const queryRoutes = sql.store.getRoutes(storeId);
      const routes = data.groupOrdersByRoute(await db.runQuery(queryRoutes));

      const queryOrders = sql.store.getRoutes(storeId);
      const openOrders = await db.runQuery(queryOrders);

      res.send({
        routes: routes,
        openOrders: openOrders,
      });
    },
    setStart: async (req, res) => {
      const { routeId } = req.body;

      const sql = route.setStart(routeId);
      const result = await db.runQuery(sql);

      res.send(result);
    },
    setFinish: async (req, res) => {
      const { routeId } = req.body;

      const sql = route.setFinish(routeId);
      const result = await db.runQuery(sql);

      res.send(result);
    },
    setFinishConfirmation: async (req, res) => {
      const { routeId } = req.body;

      const sql = route.setFinishConfirmation(routeId);
      const result = await db.runQuery(sql);

      res.send(result);
    },
  },
};
