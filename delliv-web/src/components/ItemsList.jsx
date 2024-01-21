import React from 'react';

import '../styles/ItemsList.css';
import formatMoney from '../utils/format.js';

function ItemsList({ items, createOrder }) {
  const [selectedItems, setSelectedItems] = React.useState({});

  const addCount = (id, addBy) => {
    let newSelected = { ...selectedItems };

    if (newSelected[`${id}`]) newSelected[`${id}`] += addBy;
    else newSelected[`${id}`] = addBy;

    if (newSelected[`${id}`] <= 0) delete newSelected[`${id}`];

    console.log(newSelected);

    setSelectedItems(newSelected);
  };

  return (
    <>
      <div className="items-list-wraper">
        <div className="items-list-header">
          <div className="items-list-title">Items</div>
          <button
            className="items-list-header-button"
            onClick={(e) => {
              setSelectedItems({});
              createOrder(e, selectedItems);
            }}
          >
            Novo pedido
          </button>
        </div>
        <div className="items-list">
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
                  onClick={() => addCount(item.id, 1)}
                >
                  +
                </button>
                <div className="actions-info">
                  {selectedItems[`${item.id}`]
                    ? `${selectedItems[`${item.id}`]}`
                    : '0'}
                </div>
                <button
                  className="actions-button"
                  onClick={() => addCount(item.id, -1)}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ItemsList;
