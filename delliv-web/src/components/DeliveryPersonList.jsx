import React from 'react';

import AreaHeader from './AreaHeader';

import '../styles/DeliveryPersonList.css';

function DeliveryPersonList({
  deliveryPeople,
  selectedDeliveryPerson,
  onSelectDeliveryPerson,
  onRequestDeliveryPerson,
}) {
  if (!deliveryPeople.length) {
    return (
      <>
        <div className="delivery-person-list-wraper">
          <AreaHeader
            title="Entregadores"
            button={{
              icon: 'src/assets/images/icons/mais.png',
              text: 'Solicitar entregador',
              onClick: onRequestDeliveryPerson,
            }}
          ></AreaHeader>
          <div className="delivery-person-list">
            <div className="empty-list-text">
              Solicite um entregador para iniciar.
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="delivery-person-list-wraper">
        <AreaHeader
          title="Entregadores"
          button={{
            icon: 'src/assets/images/icons/mais.png',
            text: 'Solicitar entregador',
            onClick: onRequestDeliveryPerson,
          }}
        ></AreaHeader>

        <div className="delivery-person-list">
          {deliveryPeople.map((deliveryPerson) => (
            <div
              key={deliveryPerson.id}
              className={
                selectedDeliveryPerson &&
                deliveryPerson.id == selectedDeliveryPerson.id
                  ? 'delivery-person-card card-selected'
                  : 'delivery-person-card'
              }
              onClick={(e) => onSelectDeliveryPerson(e, deliveryPerson)}
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
                {/* <div className="delivery-person-info-description">
                  Mussum Ipsum
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DeliveryPersonList;
