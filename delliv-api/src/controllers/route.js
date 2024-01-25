const db = require('../db');
const { store, route } = require('../sql/query');
const { groupOrdersByRoute } = require('../assets/helper');

module.exports = {
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
