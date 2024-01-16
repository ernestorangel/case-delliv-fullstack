import axios from 'axios';
import React from 'react';

import '../styles/AppContent.css';
import DeliveryPersonList from './DeliveryPersonList';
import OrdersList from './OrdersList';
import Inspector from './Inspector';

function AppContent() {
  const [deliveryPeople, setDeliveryPeople] = React.useState();

  const [selected, setSelected] = React.useState();

  React.useEffect(() => {
    axios.get('http://localhost:3000/get-all-delivery-people').then((res) => {
      setDeliveryPeople(res.data);
    });
  }, []);

  const setSelectDeliveryPerson = (e, deliveryPerson) => {
    setSelected(deliveryPerson);
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
        <Inspector></Inspector>
      </div>
    </>
  );
}

export default AppContent;
