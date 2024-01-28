import '../styles/OrdersList.css';

import AreaHeader from './AreaHeader';
import OrderCard from './OrderCard';

function OrdersList({ selectedRoute }) {
  if (!Object.keys(selectedRoute).length) {
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

  if (!selectedRoute.orders.length) {
    return (
      <>
        <div className="orders-list-wraper">
          <AreaHeader
            title={
              selectedRoute.deliveryPersonName
                ? `Pedidos com ${selectedRoute.deliveryPersonName}`
                : 'Pedidos com Entregador'
            }
            button={false}
          ></AreaHeader>
          <div className="empty-list-text">
            Esse entregador ainda não possui pedidos.
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
            selectedRoute.deliveryPersonName
              ? `Pedidos com ${selectedRoute.deliveryPersonName}`
              : 'Pedidos com Entregador'
          }
          button={false}
        ></AreaHeader>
        <div className="orders-list">
          {selectedRoute.orders.map((order) => (
            <OrderCard key={order.uuid} order={order}></OrderCard>
          ))}
        </div>
      </div>
    </>
  );
}

export default OrdersList;
