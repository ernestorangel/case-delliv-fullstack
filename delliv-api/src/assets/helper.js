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
};
