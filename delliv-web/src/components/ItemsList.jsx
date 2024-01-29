import React from 'react';

import AreaHeader from './AreaHeader.jsx';

import '../styles/ItemsList.css';
import { formatMoney } from '../utils/format.js';

function ItemsList({ items, selectedItems, onAddItemCount, onCreateOrder }) {
  if (!items.length) {
    return (
      <>
        <div className="orders-list-wraper">
          <AreaHeader title={'Itens'} button={false}></AreaHeader>
          <div className="empty-list-text">
            Não há itens cadastrados para essa loja.
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="items-list-wraper">
        <AreaHeader
          title="Itens"
          button={{
            icon: 'src/assets/images/icons/mais.png',
            text: 'Novo Pedido',
            onClick: onCreateOrder,
          }}
        ></AreaHeader>

        <div className="items-list">
          <div className="items-list-inside">
            {items.map((item) => (
              <div key={item.id} className="item-card">
                <div className="item-card-img">
                  <img
                    src={`src\\assets\\images\\products\\${item.sku}.jpg`}
                    alt={item.description}
                    width="100%"
                  />
                </div>
                <div className="item-card-info">
                  <div className="item-card-info-name">{item.name}</div>
                  <div className="item-card-info-desc">{item.description}</div>
                  <div className="item-card-info-price">
                    {formatMoney(item.price)}
                  </div>
                </div>
                <div className="item-card-info-actions">
                  <button
                    className="actions-button"
                    onClick={() => onAddItemCount(item.id, -1)}
                  >
                    -
                  </button>
                  <div className="actions-info">
                    {selectedItems[`${item.id}`]
                      ? `${selectedItems[`${item.id}`]}`
                      : '0'}
                  </div>
                  <button
                    className="actions-button"
                    onClick={() => onAddItemCount(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemsList;
