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
    const routes = ungroupedRoutes;
    let grouped = routes
      .map((route) => {
        return {
          routeId: route.routeId,
          deliveryPersonId: route.deliveryPersonId,
          deliveryPersonName: route.deliveryPersonName,
          routeStatus: route.routeStatus,
        };
      })
      .map((route) => {
        let orders = [];
        ungroupedRoutes.forEach((row) => {
          if (row.routeId == route.routeId) {
            if (row.uuidOrder) orders.push(row.uuidOrder);
          }
        });
        return { ...route, orders };
      });
    return grouped;
  },
};
