import '../styles/AppContent.css';

import DeliveryPersonList from './DeliveryPersonList';
import OrdersList from './OrdersList';
import OpenOrdersList from './OpenOrdersList';
import ItemsList from './ItemsList';

function AppContent({
  deliveryPeople,
  routes,
  selectedRoute,
  selectedDeliveryPerson,
  specificOrders,
  openOrders,
  selectedOpenOrder,
  items,
  selectedItems,
  onRequestDeliveryPerson,
  onSelectDeliveryPerson,
  onSelectOrder,
  onAddOrdersToRoute,
  onAddOrdersToDeliveryPerson,
  onAddItemCount,
  onCreateOrder,
  onDeleteOrder,
}) {
  return (
    <>
      <div className="app-content">
        <DeliveryPersonList
          deliveryPeople={deliveryPeople}
          routes={routes}
          selectedRoute={selectedRoute}
          selectedDeliveryPerson={selectedDeliveryPerson}
          onSelectDeliveryPerson={onSelectDeliveryPerson}
          onRequestDeliveryPerson={onRequestDeliveryPerson}
        ></DeliveryPersonList>
        <OrdersList
          selectedRoute={selectedRoute}
          specificOrders={specificOrders}
          selectedDeliveryPerson={selectedDeliveryPerson}
        ></OrdersList>
        <OpenOrdersList
          openOrders={openOrders}
          onSelectOrder={onSelectOrder}
          onAddOrdersToRoute={onAddOrdersToRoute}
          selectedOpenOrder={selectedOpenOrder}
          onAddOrdersToDeliveryPerson={onAddOrdersToDeliveryPerson}
          selectedDeliveryPerson={selectedDeliveryPerson}
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
