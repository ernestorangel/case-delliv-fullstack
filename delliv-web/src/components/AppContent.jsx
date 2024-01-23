import '../styles/AppContent.css';

import DeliveryPersonList from './DeliveryPersonList';
import OrdersList from './OrdersList';
import OpenOrdersList from './OpenOrdersList';
import ItemsList from './ItemsList';

function AppContent({
  deliveryPeople,
  selectedDeliveryPerson,
  specificOrders,
  openOrders,
  selectedOpenOrder,
  items,
  selectedItems,
  onRequestDeliveryPerson,
  onSelectDeliveryPerson,
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
          selectedDeliveryPerson={selectedDeliveryPerson}
          onSelectDeliveryPerson={onSelectDeliveryPerson}
          onRequestDeliveryPerson={onRequestDeliveryPerson}
        ></DeliveryPersonList>
        <OrdersList
          specificOrders={specificOrders}
          selectedDeliveryPerson={selectedDeliveryPerson}
        ></OrdersList>
        <OpenOrdersList
          openOrders={openOrders}
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
