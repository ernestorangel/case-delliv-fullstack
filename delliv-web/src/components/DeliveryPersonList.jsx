import React from 'react';

import '../styles/DeliveryPersonList.css';

function DeliveryPersonList({ deliveryPeople, onSelect, selected }) {
  if (!deliveryPeople) {
    return (
      <>
        <div className="delivery-person-list-wraper">
          <div className="delivery-person-title">Entregadores</div>
          <div className="delivery-person-list">Nenhum encontrado.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="delivery-person-list-wraper">
        <div className="delivery-person-title">Entregadores</div>
        <div className="delivery-person-list">
          {deliveryPeople.map((deliveryPerson) => (
            <div
              key={deliveryPerson.id}
              className={
                selected && deliveryPerson.id == selected.id
                  ? 'delivery-person-card card-selected'
                  : 'delivery-person-card'
              }
              onClick={(e) => onSelect(e, deliveryPerson)}
            >
              <div className="delivery-person-picture">
                <img
                  src="src\assets\images\icons\profile-pic-icon.png"
                  alt="Profile Picture"
                  width="30"
                  height="30"
                  className="profile-picture"
                />
              </div>
              <div className="delivery-person-info">
                <div className="delivery-person-info-title">
                  {deliveryPerson.name}
                </div>
                <div className="delivery-person-info-description">
                  Mussum Ipsum
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DeliveryPersonList;
