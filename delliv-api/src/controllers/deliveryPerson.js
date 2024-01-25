const db = require('../db');
const { deliveryPerson } = require('../sql/query');

module.exports = {
  deliveryPerson: {
    getRequests: async (req, res) => {
      const { deliveryPersonId } = req.params;

      const sql = deliveryPerson.getRequests(deliveryPersonId);
      const result = await db.runQuery(sql);

      res.send(result);
    },
    getRoutes: async (req, res) => {
      const { idDeliveryPerson } = req.params;

      const sql = deliveryPerson.getRoutes(idDeliveryPerson);
      const result = await db.runQuery(sql);

      res.send(result);
    },
  },
};
