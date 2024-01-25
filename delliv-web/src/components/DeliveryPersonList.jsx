import React from 'react';

import AreaHeader from './AreaHeader';

import '../styles/DeliveryPersonList.css';

function DeliveryPersonList({
  deliveryPeople,
  routes,
  selectedRoute,
  selectedDeliveryPerson,
  onSelectDeliveryPerson,
  onRequestDeliveryPerson,
}) {
  console.log('DeliveryPersonList (routes): ', routes);
  if (!routes.length) {
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
          {routes.map((route) => (
            <div
              key={route.routeId}
              className={
                selectedRoute && route.routeId == selectedRoute.routeId
                  ? 'delivery-person-card card-selected'
                  : 'delivery-person-card'
              }
              onClick={(e) => onSelectDeliveryPerson(e, route)}
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
                  {route.deliveryPersonName}
                </div>
                <div className="delivery-person-info-description">
                  {route.routeStatus}
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
