const mysql = require('mysql');

const dotenv = require('dotenv');
dotenv.config();

const db_config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

async function runQuery(sql_query) {
  try {
    const res = await executeQuery(sql_query);
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
