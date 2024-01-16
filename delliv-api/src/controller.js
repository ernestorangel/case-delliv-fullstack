const sql = require('./sql_queries');
const db = require('./db');
const bcrypt = require('bcrypt');

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

module.exports = {
  getAllDeliveryPeople,
  getDeliveryPerson,
  createDeliveryPerson,
  createStore,
};
