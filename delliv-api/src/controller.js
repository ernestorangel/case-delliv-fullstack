const db = require('../db');
const bcrypt = require('bcrypt');
const { sql } = require('./queries');

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
      const { idStore } = req.params;

      const sql = sql.store.getRoutes(idStore);
      const result = groupOrdersByRoute(await db.runQuery(sql));

      console.log('result: ', result);

      res.send(result);
    },
    getOpenOrders: async (req, res) => {
      const { idStore } = req.params;

      const sql = store.getOpenOrders(idStore);
      const result = groupOrders(await db.runQuery(sql));

      res.send(result);
    },
    getItems: async (req, res) => {
      const { idStore } = req.params;

      const sql = store.getItems(idStore);
      const result = await db.runQuery(sql);

      res.send(result);
    },
    createOrder: async (req, res) => {
      const { idStore, items } = req.body;

      const uuid = uuidv4();

      let itemsArray = [];

      for (const idItem in items) {
        itemsArray.push({
          id: idItem,
          quantity: items[idItem],
        });
      }

      const sqlCreateOrder = store.createOrder(uuid, idStore, itemsArray);
      const createOrderInfo = await db.runQuery(sqlCreateOrder);

      console.log(createOrderInfo); // implementar checagem

      const sqlGetOpenOrders = store.getOpenOrders(idStore);
      const openOrders = groupOrders(await db.runQuery(sqlGetOpenOrders));

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

      const sql = deliveryPerson.getRequests(deliveryPersonId);
      const result = await db.runQuery(sql);

      res.send(result);
    },
  },
  route: {
    create: async (req, res) => {
      const { storeId } = req.body;

      const storeSql = store.getOpenRequests(storeId);
      const openRequests = await db.runQuery(storeSql);
      console.log(openRequests);
      if (openRequests.length)
        return res.status(200).send('Request já foi feito.');

      const sql = route.create(storeId, 0);
      const result = await db.runQuery(sql);

      res.send(result);
    },
    setDeliveryPerson: async (req, res) => {
      const { routeId, deliveryPersonId } = req.body;

      const sql = route.setDeliveryPerson(routeId, deliveryPersonId);
      const result = await db.runQuery(sql);

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

      const setOrdersSql = route.setOrders(routeId, orders);
      const setOrdersResult = await db.runQuery(setOrdersSql);

      // check se criou
      console.log('setOrdersResult: ', setOrdersResult);

      const getRoutesSql = store.getRoutes(storeId);
      const getRoutesResult = groupOrdersByRoute(
        await db.runQuery(getRoutesSql)
      );

      const getOpenOrdersSql = store.getRoutes(storeId);
      const getOpenOrdersResult = await db.runQuery(getOpenOrdersSql);

      res.send({
        routes: getRoutesResult,
        openOrders: getOpenOrdersResult,
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
