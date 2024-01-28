import '../styles/OpenOrdersList.css';

import AreaHeader from './AreaHeader';
import OrderCard from './OrderCard';

function OpenOrdersList({
  openOrders,
  onSelectOrder,
  onAddOrdersToRoute,
  onDeleteOpenOrder,
  onDeleteOrder,
}) {
  if (!openOrders.length) {
    return (
      <>
        <div className="open-orders-list-wraper">
          <AreaHeader title="Pedidos em aberto" button={false}></AreaHeader>
          <div className="empty-list-text">Não há pedidos em aberto.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="open-orders-list-wraper">
        <AreaHeader
          title="Pedidos em aberto"
          button={{
            icon: 'src/assets/images/icons/mais.png',
            text: 'Adicionar',
            onClick: onAddOrdersToRoute,
          }}
        ></AreaHeader>

        <div className="open-orders-list">
          {openOrders.map((order) => (
            <OrderCard
              key={order.uuid}
              order={order}
              onSelectOrder={onSelectOrder}
              onDeleteOpenOrder={onDeleteOpenOrder}
            ></OrderCard>
          ))}
        </div>
      </div>
    </>
  );
}

export default OpenOrdersList;
