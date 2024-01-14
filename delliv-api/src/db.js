const mysql = require('mysql');

const db_config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'delliv1234',
};

async function runQuery(sql_query) {
  try {
    const res = await executeQuery(sql_query);
    console.log('res: ', res);
    return res;
  } catch (err) {
    return err;
  }
}

function executeQuery(sql_query) {
  return new Promise((resolve, reject) => {
    const db = mysql.createConnection(db_config);

    db.query(sql_query, (err, results) => {
      db.end();
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = {
  runQuery,
};
