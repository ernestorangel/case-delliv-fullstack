const sql = require('./sql_queries');
const db = require('./db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

async function getAllDeliveryPeople(req, res) {
  const sql_query = sql.getAllDeliveryPeople(req.params);
  const result = await db.runQuery(sql_query);

  res.send(result);
}

async function getDeliveryPerson(req, res) {
  const sql_query = sql.getDeliveryPerson(req.params);
  const result = await db.runQuery(sql_query);

  res.send(result);
}

async function createDeliveryPerson(req, res) {
  const params = req.body;

  console.log(params);

  bcrypt.hash(params.password, 10, async function (err, hash) {
    const sql_query = sql.createDeliveryPerson({
      name: params.name,
      login: params.login,
      encryptedPassword: hash,
    });
    const result = await db.runQuery(sql_query);

    res.send(result);
  });

  // Load hash from your password DB.
  //bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
  // result == true
  //});
  //bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
  // result == false
  //});
}

async function getStore(req, res) {
  const sql_query = sql.getStore(req.params);
  const result = await db.runQuery(sql_query);

  res.send(result);
}

async function createStore(req, res) {
  const params = req.body;

  console.log(params);

  bcrypt.hash(params.password, 10, async function (err, hash) {
    const sql_query = sql.createStore({
      name: params.name,
      username: params.username,
      encryptedPassword: hash,
    });
    const result = await db.runQuery(sql_query);

    res.send(result);
  });
}

async function getAllItems(req, res) {
  const sql_query = sql.getAllItems(req.params);
  const result = await db.runQuery(sql_query);

  res.send(result);
}

async function createItem(req, res) {
  const params = req.body;

  console.log(params);

  const sql_query = sql.createItem({
    sku: params.sku,
    name: params.name,
    price: params.price,
    description: params.description,
    idStore: params.idStore,
  });
  const result = await db.runQuery(sql_query);

  res.send(result);
}

async function getAllOpenOrders(req, res) {
  const sql_query = sql.getAllOpenOrders(req.params.idStore);
  const result = await db.runQuery(sql_query);

  res.send(result);
}

async function createOrder(req, res) {
  const { idStore, items } = req.body;

  const uuid = uuidv4();

  let itemsArray = [];

  for (const idItem in items) {
    itemsArray.push({
      id: idItem,
      quantity: items[idItem],
    });
  }

  const sql_query = sql.createOrder({ uuid, idStore, itemsArray });
  const result = await db.runQuery(sql_query);

  res.send(result);
}

module.exports = {
  getAllDeliveryPeople,
  getDeliveryPerson,
  createDeliveryPerson,
  getStore,
  createStore,
  getAllItems,
  createItem,
  getAllOpenOrders,
  createOrder,
};
