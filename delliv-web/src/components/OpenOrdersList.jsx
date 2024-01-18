import '../styles/OpenOrdersList.css';

function OpenOrdersList({ openOrders }) {
  return (
    <>
      <div className="open-orders-list-wraper">
        <div className="open-orders-list-header">
          <div className="open-orders-list-header-title">Pedidos em aberto</div>
        </div>
        <div className="open-orders-list">
          {openOrders.map((order) => (
            <div key={order.uuid} className="open-orders-card">
              <div className="open-orders-card-header">Pedido {order.uuid}</div>
              <div className="open-orders-card-content">
                {order.items.map((item) => (
                  <div
                    key={item.idItem}
                    className="open-orders-card-content-info"
                  >
                    {item.quantity}x {item.sku} - {item.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OpenOrdersList;
