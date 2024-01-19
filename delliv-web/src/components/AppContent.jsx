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

  const idStore = 0;

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

  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/get-all-open-orders/${idStore}`)
      .then((res) => {
        setOpenOrders(res.data);
      });
  }, []);

  const setSelectDeliveryPerson = (e, deliveryPerson) => {
    setSelected(deliveryPerson);
  };

  const createOrder = (e, selectedItems) => {
    axios
      .post('http://localhost:3000/create-order', {
        idStore: idStore,
        items: selectedItems,
      })
      .then((res) => {
        setOpenOrders(res.data);
      });
  };

  const deleteOrder = (e, uuid) => {
    axios
      .delete(`http://localhost:3000/delete-order/${idStore}/${uuid}`)
      .then((res) => {
        setOpenOrders(res.data);
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
        <OpenOrdersList
          openOrders={openOrders}
          selected={selected}
          deleteOrder={deleteOrder}
        ></OpenOrdersList>
        <ItemsList items={items} createOrder={createOrder}></ItemsList>
      </div>
    </>
  );
}

export default AppContent;
