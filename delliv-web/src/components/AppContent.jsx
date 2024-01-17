import axios from 'axios';
import React from 'react';

import DeliveryPersonList from './DeliveryPersonList';
import OrdersList from './OrdersList';
import OpenOrdersList from './OpenOrdersList';
import ItemsList from './ItemsList';

import '../styles/AppContent.css';

function AppContent() {
  const [items, setItems] = React.useState([]);
  const [openOrders, setOpenOrders] = React.useState([]);
  const [deliveryPeople, setDeliveryPeople] = React.useState([]);
  const [selected, setSelected] = React.useState({});

  React.useEffect(() => {
    axios.get('http://localhost:3000/get-all-delivery-people').then((res) => {
      setDeliveryPeople(res.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get('http://localhost:3000/get-all-items').then((res) => {
      setItems(res.data);
    });
  }, []);

  const setSelectDeliveryPerson = (e, deliveryPerson) => {
    setSelected(deliveryPerson);
  };

  const createOrder = (e, selectedItems) => {
    axios
      .post('http://localhost:3000/create-order', {
        idStore: 0,
        items: selectedItems,
      })
      .then((res) => {
        console.log('res: ', res.data);
      });
  };

  return (
    <>
      <div className="app-content">
        <DeliveryPersonList
          deliveryPeople={deliveryPeople}
          onSelect={setSelectDeliveryPerson}
          selected={selected}
        ></DeliveryPersonList>
        <OrdersList selected={selected}></OrdersList>
        <OpenOrdersList></OpenOrdersList>
        <ItemsList items={items} createOrder={createOrder}></ItemsList>
      </div>
    </>
  );
}

export default AppContent;
