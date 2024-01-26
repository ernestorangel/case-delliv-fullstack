module.exports = {
  sql: {
    user: {
      getByUsername: (type, username) => {
        let query = `
          SELECT *
          FROM delliv_db.${type}
          WHERE username = '${username}'
        `;
        return query;
      },
      create: () => {
        // let query = `
        //   INSERT
        //   INTO delliv_db.delivery_person
        //   (
        //     name,
        //     login,
        //     password
        //   )
        //   VALUES
        //   (
        //     \'${params.name}\',
        //     \'${params.login}\',
        //     \'${params.encryptedPassword}\'
        //   );
        // `;
        // return query;
        // let query = `
        //   INSERT
        //   INTO delliv_db.store
        //   (
        //     name,
        //     username,
        //     password
        //   )
        //   VALUES
        //   (
        //     \'${params.name}\',
        //     \'${params.username}\',
        //     \'${params.encryptedPassword}\'
        //   );
        // `;
        // return query;
      },
    },
    store: {
      getRoutes: (idStore) => {
        let query = `
          SELECT 
          r.id AS routeId,
          dp.id AS deliveryPersonId,
          dp.name AS deliveryPersonName,
          s.status AS routeStatus,
          o.uuid AS uuidOrder,
          o.quantity AS itemQuantity,
          i.sku AS itemSku,
          i.name AS itemName
          FROM delliv_db.routes AS r
          LEFT JOIN delliv_db.delivery_person AS dp
          ON r.idDeliveryPerson = dp.id
          LEFT JOIN delliv_db.route_status AS s
          ON r.idStatus = s.id
          LEFT JOIN delliv_db.orders_in_route AS oir
          ON r.id = oir.idRoute
          LEFT JOIN delliv_db.order AS o
          ON oir.uuidOrder = o.uuid
          LEFT JOIN delliv_db.item AS i
          ON o.idItem = i.id
          WHERE r.idStore = ${idStore}
          AND r.idStatus != 6
        `;
        return query;
      },
      getOpenOrders: (idStore) => {
        let query = `
          SELECT 
          o.uuid,
          o.idItem,
          o.quantity,
          i.sku,
          i.name
          FROM delliv_db.order AS o
          LEFT JOIN delliv_db.item AS i
          ON o.idItem = i.id
          WHERE o.idStore = ${idStore}
        `;
        return query;
      },
      getItems: () => {
        let query = `
          SELECT
          *
          FROM delliv_db.item
        `;
        return query;
      },
      createOrder: () => {
        let values = [];

        for (const item of itemsArray) {
          values.push(
            `(\'${uuid}\',\'${item.id}\', \'${idStore}\', \'${item.quantity}\' )`
          );
        }

        let query = `
          INSERT INTO delliv_db.order
          (
            uuid,
            idItem,
            idStore,
            quantity
          ) 
          VALUES
          ${values.join(',')}
        `;
        return query;
      },
      createItem: () => {
        let query = `
          INSERT 
          INTO delliv_db.item 
          (
            sku, 
            name, 
            price,
            description,
            idStore
          ) 
          VALUES 
          (
            \'${params.sku}\', 
            \'${params.name}\', 
            \'${params.price}\',
            \'${params.description}\',
            \'${params.idStore}\'
          );
        `;
        return query;
      },
      deleteOrder: () => {
        let query = `
          DELETE FROM delliv_db.order
          WHERE idStore = ${idStore}
          AND uuid = \'${uuid}\'
        `;
        return query;
      },
      //deleteItem: () => {},
    },
    deliveryPerson: {
      getRequests: (deliveryPersonId) => {
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

        for (const uuid of orders) {
          values.push(`(\'${routeId}\',\'${uuid}\' )`);
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
  },
};
