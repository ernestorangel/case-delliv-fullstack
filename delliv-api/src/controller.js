const sql = require('./sql_queries');
const db = require('./db');

function hello(req, res) {
  res.send('Hello World!');
}

async function getDeliveryPerson(req, res) {
  const sql_query = sql.getDeliveryPerson(req.params);
  const result = await db.runQuery(sql_query);

  console.log('result: ', result);

  res.send(result);
}

module.exports = {
  hello,
  getDeliveryPerson,
};
