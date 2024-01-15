import axios from 'axios';
import React from 'react';
import '../styles/DeliveryPersonList.css';

function DeliveryPersonList() {
  const [deliveryPeople, setDeliveryPeople] = React.useState();

  React.useEffect(() => {
    axios.get('http://localhost:3000/get-all-delivery-people').then((res) => {
      setDeliveryPeople(res.data);
    });
  }, []);

  if (!deliveryPeople)
    return (
      <>
        <div class="delivery-person-list-wraper">
          <div class="delivery-person-title">Entregadores</div>
          <div class="delivery-person-list">Nenhum encontrado.</div>
        </div>
      </>
    );

  return (
    <>
      <div class="delivery-person-list-wraper">
        <div class="delivery-person-title">Entregadores</div>
        <div class="delivery-person-list">
          {deliveryPeople.map((deliveryPerson) => (
            <div key={deliveryPerson.id} class="delivery-person-card">
              <div class="delivery-person-picture">
                <img
                  src="src\assets\images\icons\profile-pic-icon.png"
                  alt="Profile Picture"
                  width="40"
                  height="40"
                  class="profile-picture"
                />
              </div>
              <div class="delivery-person-info">
                <div class="delivery-person-info-title">
                  {deliveryPerson.name}
                </div>
                <div class="delivery-person-info-description">Mussum Ipsum</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DeliveryPersonList;
