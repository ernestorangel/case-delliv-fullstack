module.exports = {
  store: {
    getRoutes: (idStore) => {
      let query = `
        SELECT 
        r.id AS routeId,
        dp.id AS deliveryPersonId,
        dp.name AS deliveryPersonName,
        s.status AS routeStatus,
        o.uuidOrder AS uuidOrder
        FROM delliv_db.routes AS r
        LEFT JOIN delliv_db.delivery_person AS dp
        ON r.idDeliveryPerson = dp.id
        LEFT JOIN delliv_db.route_status AS s
        ON r.idStatus = s.id
        LEFT JOIN delliv_db.orders_in_route AS o
        ON r.id = o.idRoute
        WHERE idStore = ${idStore}
        AND idStatus != 6
      `;
      return query;
    },
    getOpenRequests: (idStore) => {
      let query = `
        SELECT *
        FROM delliv_db.routes
        WHERE idStore = ${idStore}
        AND idStatus = 0
      `;
      return query;
    },
  },
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
      // let query = `
      //   INSERT INTO delliv_db.routes
      //   (idStore, idStatus, storeRequestDatetime)
      //   VALUES
      //   (\'${storeId}\', \'${status}\', NOW())
      // `;
      // return query;
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
        SET 
        idDeliveryPerson = ${deliveryPersonId},
        idStatus = 1,
        deliveryPersonAcceptDatetime = NOW()
        WHERE id = ${routeId}
        AND idStatus = 0
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
