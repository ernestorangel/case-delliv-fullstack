const DB_INFO = {
  NAME: 'delliv_db',
  TABLES: {
    DELIVERY_PEOPLE: 'delivery_people',
    ITEMS: 'items',
    ORDERS: 'orders',
    ORDERS_IN_ROUTE: 'orders_in_route',
    ORDER_STATUS: 'order_status',
    ROUTE_STATUS: 'route_status',
    ROUTES: 'routes',
    STORES: 'stores',
    STORE_SOCKET_ID: 'store_socket_id',
    DELIVERY_PERSON_SOCKET_ID: 'delivery_person_socket_id',
  },
};

module.exports = {
  sql: {
    user: {
      getByUsername: (type, username) => {
        const DB_BY_USER = {
          store: DB_INFO.TABLES.STORES,
          'delivery-person': DB_INFO.TABLES.DELIVERY_PEOPLE,
        };

        return `
          SELECT *
          FROM ${DB_INFO.NAME}.${DB_BY_USER[`${type}`]}
          WHERE username = '${username}'
        `;
      },
      create: () => {
        // let query = `
        //   INSERT
        //   INTO ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES}
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
        //   INTO ${DB_INFO.NAME}.${DB_INFO.TABLES.STORES}
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
      setSocket: (storeId, socketId) => {
        return `
          INSERT INTO ${DB_INFO.NAME}.${DB_INFO.TABLES.STORE_SOCKET_ID}
          (id, idSocket)
          VALUES 
          (\'${storeId}\', \'${socketId}\')
          ON DUPLICATE KEY UPDATE idSocket = \'${socketId}\'
        `;
      },
      getRoutes: (storeId) => {
        return `
          SELECT 
          r.id AS routeId,
          dp.id AS deliveryPersonId,
          dp.name AS deliveryPersonName,
          s.status AS routeStatus,
          o.uuid AS uuidOrder,
          o.quantity AS itemQuantity,
          i.sku AS itemSku,
          i.name AS itemName
          FROM ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES} AS r
          LEFT JOIN ${DB_INFO.NAME}.${DB_INFO.TABLES.DELIVERY_PEOPLE} AS dp
          ON r.idDeliveryPerson = dp.id
          LEFT JOIN ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTE_STATUS} AS s
          ON r.idStatus = s.id
          LEFT JOIN ${DB_INFO.NAME}.${DB_INFO.TABLES.ORDERS_IN_ROUTE} AS oir
          ON r.id = oir.idRoute
          LEFT JOIN ${DB_INFO.NAME}.${DB_INFO.TABLES.ORDERS} AS o
          ON oir.uuidOrder = o.uuid
          LEFT JOIN ${DB_INFO.NAME}.items AS i
          ON o.idItem = i.id
          WHERE r.idStore = ${storeId}
          AND r.idStatus != 6
        `;
      },
      getOpenOrders: (storeId) => {
        return `
          SELECT 
          o.uuid,
          o.idItem,
          o.quantity,
          i.sku,
          i.name
          FROM ${DB_INFO.NAME}.orders AS o
          LEFT JOIN ${DB_INFO.NAME}.items AS i
          ON o.idItem = i.id
          WHERE o.idStore = ${storeId}
          AND o.idStatus = 0
        `;
      },
      getOpenRequests: (storeId) => {
        return `
          SELECT *
          FROM ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES}
          WHERE idStore = ${storeId}
          AND idStatus = 0
        `;
      },
      getItems: (storeId) => {
        return `
          SELECT *
          FROM ${DB_INFO.NAME}.${DB_INFO.TABLES.ITEMS}
          WHERE idStore = ${storeId}
        `;
      },
      createOrder: (uuid, storeId, itemsArray) => {
        let values = [];

        for (const item of itemsArray) {
          values.push(
            `(\'${uuid}\',\'${item.id}\', \'${storeId}\', \'${item.quantity}\', 0 )`
          );
        }

        return `
          INSERT INTO ${DB_INFO.NAME}.${DB_INFO.TABLES.ORDERS}
          (uuid, idItem, idStore, quantity, idStatus) 
          VALUES
          ${values.join(',')}
        `;
      },
      createItem: () => {
        let query = `
          INSERT 
          INTO ${DB_INFO.NAME}.${DB_INFO.TABLES.ITEMS} 
          (sku, name, price, description, idStore) 
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
          DELETE FROM ${DB_INFO.NAME}.${DB_INFO.TABLES.ORDERS}
          WHERE idStore = ${idStore}
          AND uuid = \'${uuid}\'
        `;
        return query;
      },
      //deleteItem: () => {},
    },
    order: {
      updateStatus: (orders) => {
        return `
          UPDATE ${DB_INFO.NAME}.${DB_INFO.TABLES.ORDERS}
          SET idStatus = 1
          WHERE uuid IN ${orders}
        `;
      },
    },
    deliveryPerson: {
      setSocket: (deliveryPersonId, socketId) => {
        return `
          INSERT INTO ${DB_INFO.NAME}.${DB_INFO.TABLES.DELIVERY_PERSON_SOCKET_ID}
          (id, idSocket)
          VALUES 
          (\'${deliveryPersonId}\', \'${socketId}\')
          ON DUPLICATE KEY UPDATE idSocket = \'${deliveryPersonId}\'
        `;
      },
      getRequests: (deliveryPersonId) => {
        return `
          SELECT 
          r.id AS idRoute,
          s.id AS idStore,
          s.name
          FROM ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES} AS r
          LEFT JOIN ${DB_INFO.NAME}.${DB_INFO.TABLES.STORES} AS s
          ON r.idStore = s.id
          WHERE idStatus = 0
        `;
      },
      getRoute: (deliveryPersonId) => {
        return `
          SELECT 
          r.id AS routeId,
          s.id AS storeId,
          s.name AS storeName,
          rs.status AS routeStatus,
          o.uuid AS uuidOrder,
          o.quantity AS itemQuantity,
          i.sku AS itemSku,
          i.name AS itemName
          FROM ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES} AS r
          LEFT JOIN ${DB_INFO.NAME}.${DB_INFO.TABLES.STORES} AS s
          ON r.idStore = s.id
          LEFT JOIN ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTE_STATUS} AS rs
          ON r.idStatus = rs.id
          LEFT JOIN ${DB_INFO.NAME}.${DB_INFO.TABLES.ORDERS_IN_ROUTE} AS oir
          ON r.id = oir.idRoute
          LEFT JOIN ${DB_INFO.NAME}.${DB_INFO.TABLES.ORDERS} AS o
          ON oir.uuidOrder = o.uuid
          LEFT JOIN ${DB_INFO.NAME}.items AS i
          ON o.idItem = i.id
          WHERE r.idDeliveryPerson = ${deliveryPersonId}
          AND r.idStatus IN (1, 2, 3, 4)
        `;
      },
    },
    route: {
      getStoreSocket: (routeId) => {
        return `
          SELECT
          sid.idSocket
          FROM ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES} AS r
          LEFT JOIN ${DB_INFO.NAME}.${DB_INFO.TABLES.STORE_SOCKET_ID} AS sid
          ON r.idStore = sid.id
          WHERE r.id = ${routeId}
        `;
      },
      getDeliveryPersonSocket: (routeId) => {
        return `
          SELECT
          sid.idSocket
          FROM ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES} AS r
          LEFT JOIN ${DB_INFO.NAME}.${DB_INFO.TABLES.DELIVERY_PERSON_SOCKET_ID} AS sid
          ON r.idDeliveryPerson = sid.id
          WHERE r.id = ${routeId}
        `;
      },
      create: (storeId) => {
        return `
          INSERT INTO ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES} 
          (idStore, idStatus, storeRequestDatetime)
          VALUES
          (\'${storeId}\', 0, NOW())
        `;
      },
      setDeliveryPerson: (routeId, deliveryPersonId) => {
        return `
          UPDATE ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES}
          SET 
          idDeliveryPerson = ${deliveryPersonId},
          idStatus = 1,
          deliveryPersonAcceptDatetime = NOW()
          WHERE id = ${routeId}
          AND idStatus = 0
        `;
      },
      setDeliveryPersonArrival: (routeId) => {
        return `
          UPDATE ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES}
          SET deliveryPersonArrivalDatetime = NOW()
          WHERE id = ${routeId}
        `;
      },
      setArrivalConfirmation: (routeId) => {
        return `
          UPDATE ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES}
          SET
          idStatus = 2,
          storeArrivalConfirmationDatetime = NOW()
          WHERE id = ${routeId}
          AND idStatus = 1
        `;
      },
      setLoad: (routeId) => {
        return `
          UPDATE ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES}
          SET storeLoadTime= NOW()
          WHERE id = ${routeId}
        `;
      },
      setLoadConfirmation: (routeId) => {
        return `
          UPDATE ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES}
          SET 
          idStatus = 3,
          deliveryPersonLoadConfirmationDatetime = NOW()
          WHERE id = ${routeId}
          AND idStatus = 2
        `;
      },
      setOrders: (routeId, orders) => {
        let values = [];

        for (const uuid of orders) {
          values.push(`(\'${routeId}\',\'${uuid}\' )`);
        }

        return `
          INSERT INTO ${DB_INFO.NAME}.${DB_INFO.TABLES.ORDERS_IN_ROUTE}
          (idRoute, uuidOrder) 
          VALUES
          ${values.join(',')}
        `;
      },
      setStart: (routeId) => {
        return `
          UPDATE ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES}
          SET
          idStatus = 4,
          routeStartDatetime = NOW()
          WHERE id = ${routeId}
          AND idStatus = 3
        `;
      },
      setFinish: (routeId) => {
        return `
          UPDATE ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES}
          SET deliveryPersonFinishDatetime = NOW()
          WHERE id = ${routeId}
        `;
      },
      setFinishConfirmation: (routeId) => {
        return `
          UPDATE ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES}
          SET
          idStatus = 5,
          storeFinishConfirmationDatetime = NOW()
          WHERE id = ${routeId}
          AND idStatus = 4
        `;
      },
      getActiveStore: (deliveryPersonId) => {
        return `
          SELECT *
          FROM ${DB_INFO.NAME}.${DB_INFO.TABLES.ROUTES}
          WHERE idDeliveryPerson = ${deliveryPersonId}
          AND idStatus IN (1, 2, 3, 4)
        `;
      },
    },
  },
};
