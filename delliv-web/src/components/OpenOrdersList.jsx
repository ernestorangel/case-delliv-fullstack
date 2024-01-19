import '../styles/OpenOrdersList.css';

function OpenOrdersList({ openOrders, selected, deleteOrder }) {
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
                <div className="open-orders-card-content-info">
                  <table className="open-orders-card-table">
                    <thead>
                      <tr className="open-orders-card-table-header">
                        <th className="open-orders-card-table-header-cell">
                          Qtd.
                        </th>
                        <th className="open-orders-card-table-header-cell">
                          SKU
                        </th>
                        <th className="open-orders-card-table-header-cell">
                          Nome
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr
                          key={item.idItem}
                          className="open-orders-card-table-row"
                        >
                          <td className="open-orders-card-table-cell">
                            {item.quantity}
                          </td>
                          <td className="open-orders-card-table-cell">
                            {item.sku}
                          </td>
                          <td className="open-orders-card-table-cell">
                            {item.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="open-orders-card-actions">
                <div className="open-orders-card-actions-button add-button">
                  {`Adicionar para ${selected.name}`}
                </div>

                <button
                  className="open-orders-card-actions-button del-button"
                  onClick={(e) => deleteOrder(e, order.uuid)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OpenOrdersList;
