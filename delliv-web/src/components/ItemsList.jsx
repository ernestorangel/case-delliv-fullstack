import '../styles/ItemsList.css';
import formatMoney from '../utils/format.js';

function ItemsList({ items }) {
  console.log(items);
  return (
    <>
      <div className="items-list-wraper">
        <div className="items-list-header">Items</div>
        <div className="items-list">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-card-img">
                <img
                  src={`src\\assets\\images\\products\\${item.sku}.jpg`}
                  alt="Product Picture"
                  width="120"
                  height="120"
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
                <div className="actions-button">+</div>
                <div className="actions-info">2</div>
                <div className="actions-button">-</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ItemsList;
