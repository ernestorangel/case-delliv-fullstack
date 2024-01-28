import '../styles/AppContent.css';

import DeliveryPersonList from './DeliveryPersonList';
import OrdersList from './OrdersList';
import OpenOrdersList from './OpenOrdersList';
import ItemsList from './ItemsList';

function AppContent({
  routes,
  selectedRoute,
  openOrders,
  items,
  selectedItems,
  onRequestDeliveryPerson,
  onSelectDeliveryPerson,
  onSelectOrder,
  onAddOrdersToRoute,
  onDeleteOpenOrder,
  onAddItemCount,
  onCreateOrder,
  onDeleteOrder,
}) {
  return (
    <>
      <div className="app-content">
        <DeliveryPersonList
          routes={routes}
          selectedRoute={selectedRoute}
          onSelectDeliveryPerson={onSelectDeliveryPerson}
          onRequestDeliveryPerson={onRequestDeliveryPerson}
        ></DeliveryPersonList>
        <OrdersList selectedRoute={selectedRoute}></OrdersList>
        <OpenOrdersList
          openOrders={openOrders}
          onSelectOrder={onSelectOrder}
          onAddOrdersToRoute={onAddOrdersToRoute}
          onDeleteOpenOrder={onDeleteOpenOrder}
          onDeleteOrder={onDeleteOrder}
        ></OpenOrdersList>
        <ItemsList
          items={items}
          selectedItems={selectedItems}
          onAddItemCount={onAddItemCount}
          onCreateOrder={onCreateOrder}
        ></ItemsList>
      </div>
    </>
  );
}

export default AppContent;
