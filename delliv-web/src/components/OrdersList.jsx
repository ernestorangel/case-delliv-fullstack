import '../styles/OrdersList.css';
import AreaHeader from './AreaHeader';
import OrderCard from './OrderCard';
import { camelCaseToRegular } from '../utils/format';

function OrdersList({ selectedRoute, onLoadOrders }) {
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
              ? `${camelCaseToRegular(selectedRoute.routeStatus)}`
              : 'Pedidos com Entregador'
          }
          button={{
            icon: 'src/assets/images/icons/mais.png',
            text: 'Carregar',
            onClick: onLoadOrders,
          }}
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
