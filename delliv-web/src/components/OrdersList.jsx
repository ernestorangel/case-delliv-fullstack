import '../styles/OrdersList.css';

import AreaHeader from './AreaHeader';
import OrderCard from './OrderCard';

function OrdersList({ specificOrders, selectedDeliveryPerson }) {
  if (!Object.keys(selectedDeliveryPerson).length) {
    return (
      <>
        <div className="orders-list-wraper">
          <AreaHeader
            title={'Pedidos com Entregador'}
            button={false}
          ></AreaHeader>
          <div className="empty-list-text">
            Selecione um entregador para ver seus pedidos.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="orders-list-wraper">
        <AreaHeader
          title={
            selectedDeliveryPerson.name
              ? `Pedidos com ${selectedDeliveryPerson.name}`
              : 'Pedidos com Entregador'
          }
          button={false}
        ></AreaHeader>
        <div className="orders-list">
          {specificOrders.map((order) => (
            <OrderCard key={order.uuid} order={order}></OrderCard>
          ))}
        </div>
      </div>
    </>
  );
}

export default OrdersList;
