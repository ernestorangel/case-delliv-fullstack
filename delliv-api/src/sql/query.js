module.exports = {
  deliveryPerson: {
    getRequests: () => {
      let query = `
        SELECT 
        r.id AS idRoute,
        s.id AS idStore,
        s.name
        FROM delliv_db.routes AS r
        LEFT JOIN delliv_db.store AS s
        ON r.idStore = s.id
        WHERE idStatus = 0
      `;
      return query;
    },
    getRoutes: (idDeliveryPerson) => {
      let query = `
        INSERT INTO delliv_db.routes 
        (idStore, idStatus, storeRequestDatetime)
        VALUES
        (\'${storeId}\', \'${status}\', NOW())
      `;
      return query;
    },
  },
  route: {
    create: (storeId, status) => {
      let query = `
        INSERT INTO delliv_db.routes 
        (idStore, idStatus, storeRequestDatetime)
        VALUES
        (\'${storeId}\', \'${status}\', NOW())
      `;
      return query;
    },
    setDeliveryPerson: (routeId, deliveryPersonId) => {
      let query = `
        UPDATE delliv_db.routes
        SET idDeliveryPerson = ${deliveryPersonId}
        WHERE id = ${routeId}
      `;
      return query;
    },
    setDeliveryPersonArrival: (routeId) => {
      let query = `
        UPDATE delliv_db.routes
        SET deliveryPersonArrivalDatetime = NOW()
        WHERE id = ${routeId}
      `;
      return query;
    },
    setArrivalConfirmation: (routeId) => {
      let query = `
        UPDATE delliv_db.routes
        SET storeArrivalConfirmationDatetime = NOW()
        WHERE id = ${routeId}
      `;
      return query;
    },
    setLoad: (routeId) => {
      let query = `
        UPDATE delliv_db.routes
        SET storeLoadTime= NOW()
        WHERE id = ${routeId}
      `;
      return query;
    },
    setLoadConfirmation: (routeId) => {
      let query = `
        UPDATE delliv_db.routes
        SET deliveryPersonLoadConfirmationDatetime = NOW()
        WHERE id = ${routeId}
      `;
      return query;
    },
    setOrders: (routeId, orders) => {
      let values = [];

      for (const order of orders) {
        values.push(`(\'${routeId}\',\'${order.id}\' )`);
      }

      let query = `
        INSERT INTO delliv_db.orders_in_route
        (
          idRoute,
          uuidOrder
        ) 
        VALUES
        ${values.join(',')}
      `;
      return query;
    },
    setStart: (routeId) => {
      let query = `
        UPDATE delliv_db.routes
        SET routeStartDatetime = NOW()
        WHERE id = ${routeId}
      `;
      return query;
    },
    setFinish: (routeId) => {
      let query = `
        UPDATE delliv_db.routes
        SET deliveryPersonFinishDatetime = NOW()
        WHERE id = ${routeId}
      `;
      return query;
    },
    setFinishConfirmation: (routeId) => {
      let query = `
        UPDATE delliv_db.routes
        SET storeFinishConfirmationDatetime = NOW()
        WHERE id = ${routeId}
      `;
      return query;
    },
  },
};
