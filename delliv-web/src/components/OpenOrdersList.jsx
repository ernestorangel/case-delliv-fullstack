import '../styles/OpenOrdersList.css';

import AreaHeader from './AreaHeader';
import OrderCard from './OrderCard';

function OpenOrdersList({
  openOrders,
  selectedOpenOrder,
  onAddOrdersToDeliveryPerson,
  selectedDeliveryPerson,
  onDeleteOrder,
}) {
  if (!openOrders.length) {
    return (
      <>
        <div className="open-orders-list-wraper">
          <div className="open-orders-list-header">
            <div className="open-orders-list-header-title">
              Pedidos em aberto
            </div>
          </div>
          <div className="open-orders-list">Não há pedidos em aberto.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="open-orders-list-wraper">
        <AreaHeader title="Pedidos em aberto" button={false}></AreaHeader>

        <div className="open-orders-list">
          {openOrders.map((order) => (
            <OrderCard key={order.uuid} order={order}></OrderCard>
          ))}
        </div>
      </div>
    </>
  );
}

export default OpenOrdersList;
