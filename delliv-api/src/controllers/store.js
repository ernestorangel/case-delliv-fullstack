const db = require('../db');
const { store } = require('../sql/query');
const { groupOrdersByRoute } = require('../assets/helper');

module.exports = {
  store: {
    getRoutes: async (req, res) => {
      const { idStore } = req.params;

      const sql = store.getRoutes(idStore);
      const result = groupOrdersByRoute(await db.runQuery(sql));

      console.log('result: ', result);

      res.send(result);
    },
  },
};
