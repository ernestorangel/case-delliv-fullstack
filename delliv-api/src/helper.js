module.exports = {
  groupOrders: (ungroupedOrders) => {
    const originalResult = ungroupedOrders;
    let grouped = [...new Set(originalResult.map((row) => row.uuid))].map(
      (uuid) => {
        let orderItems = [];
        ungroupedOrders.forEach((row) => {
          if (row.uuid == uuid)
            orderItems.push({
              idItem: row.idItem,
              quantity: row.quantity,
              sku: row.sku,
              name: row.name,
            });
        });
        return { uuid: uuid, items: orderItems };
      }
    );
    return grouped;
  },

  groupOrdersByRoute: (ungroupedRoutes) => {
    console.log('ungroupedRoutes: ', ungroupedRoutes);

    const rows = ungroupedRoutes;

    let ungroupedRoutesInfo = {};
    rows.forEach((row) => {
      ungroupedRoutesInfo[`${row.routeId}`] = {
        deliveryPersonId: row.deliveryPersonId,
        deliveryPersonName: row.deliveryPersonName,
        routeStatus: row.routeStatus,
      };
    });

    let uniqueRouteIds = [...new Set(rows.map((row) => row.routeId))];

    let uniqueRoutes = uniqueRouteIds.map((routeId) => {
      return {
        routeId,
        ...ungroupedRoutesInfo[`${routeId}`],
      };
    });

    let uniqueRoutesWithUniqueOrdersIds = uniqueRoutes.map((route) => {
      let orders = [];
      ungroupedRoutes.forEach((row) => {
        if (row.routeId == route.routeId && row.uuidOrder)
          orders.push(row.uuidOrder);
      });
      return { ...route, orders: [...new Set(orders)] };
    });

    let uuidOrdersUnique = [
      ...new Set(
        ungroupedRoutes.map((route) => {
          if (route.uuidOrder) return route.uuidOrder;
        })
      ),
    ];

    let itemsInOrders = uuidOrdersUnique.map((uuid) => {
      let items = [];
      ungroupedRoutes.forEach((row) => {
        if (row.uuidOrder && row.uuidOrder == uuid)
          items.push({
            quantity: row.itemQuantity,
            sku: row.itemSku,
            name: row.itemName,
          });
      });
      return { uuid, items };
    });

    let grouped = uniqueRoutesWithUniqueOrdersIds.map((route) => {
      route.orders = route.orders.map((uuid) => {
        return itemsInOrders.find((order) => order.uuid == uuid);
      });
      return route;
    });

    return grouped;
  },
};
