import '../styles/OpenOrdersList.css';

function OpenOrdersList() {
  // const openItemsList = () => {
  //   console.log('click');
  // };
  return (
    <>
      <div className="inspector-wraper">
        <div className="inspector-header">
          <div className="inspector-header-title">Pedidos em aberto</div>
          {/* <div className="inspector-header-button">
            <button className="orders-add-button" onClick={openItemsList}>
              <img
                className="orders-add-button-icon"
                src="src\assets\images\icons\mais.png"
                width="20px"
              ></img>
              Novo Pedido
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default OpenOrdersList;
