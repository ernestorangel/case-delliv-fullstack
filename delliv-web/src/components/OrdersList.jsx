import '../styles/OrdersList.css';

function OrdersList({ selected }) {
  if (!selected) {
    return (
      <>
        <div className="orders-list-wraper">
          <div className="orders-list-header">
            <div className="orders-list-title">Pedidos</div>
            <div className="orders-add-button">
              <img
                className="orders-add-button-icon"
                src="src\assets\images\icons\mais.png"
                width="20px"
              ></img>
              Novo Pedido
            </div>
          </div>
          <div className="orders-list">
            <div className="order-card">
              Pedido #1234<br></br>3 itens
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="orders-list-wraper">
        <div className="orders-list-header">
          <div className="orders-list-title">Pedidos com {selected.name}</div>
          <div className="orders-add-button">
            <img
              className="orders-add-button-icon"
              src="src\assets\images\icons\mais.png"
              width="20px"
            ></img>
            Novo Pedido
          </div>
        </div>
        <div className="orders-list">
          <div className="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div className="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div className="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div className="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div className="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div className="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div className="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div className="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div className="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div className="order-card">
            Pedido #1234<br></br>3 itens
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersList;
