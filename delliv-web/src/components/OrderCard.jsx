import '../styles/OrderCard.css';

function OrderCard({ order }) {
  return (
    <>
      <div className="order-card">
        <div className="order-card-header">{order.uuid}</div>
        <div className="order-card-content">
          <table className="order-card-table">
            <thead className="order-card-table-head">
              <tr className="order-card-table-row">
                <th className="order-card-table-header-cell">Qtd.</th>
                <th className="order-card-table-header-cell">SKU</th>
                <th className="order-card-table-header-cell">Nome</th>
              </tr>
            </thead>
            <tbody className="order-card-table-body">
              {order.items.map((item) => (
                <tr key={item.idItem} className="order-card-table-row">
                  <td className="order-card-table-cell">{item.quantity}</td>
                  <td className="order-card-table-cell">{item.sku}</td>
                  <td className="order-card-table-cell">{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default OrderCard;
