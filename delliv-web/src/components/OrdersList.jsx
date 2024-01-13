import '../styles/OrdersList.css';

function OrdersList() {
  return (
    <>
      <div class="orders-list-wraper">
        <div class="orders-list-header">
          <div class="orders-list-title">Pedidos - Brenda Brandão</div>
          <div class="orders-add-button">
            <img
              class="orders-add-button-icon"
              src="src\assets\images\icons\mais.png"
              width="20px"
            ></img>
            Novo Pedido
          </div>
        </div>
        <div class="orders-list">
          <div class="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div class="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div class="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div class="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div class="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div class="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div class="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div class="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div class="order-card">
            Pedido #1234<br></br>3 itens
          </div>
          <div class="order-card">
            Pedido #1234<br></br>3 itens
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersList;
