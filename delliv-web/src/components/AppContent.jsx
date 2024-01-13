import '../styles/AppContent.css';
import DeliveryPersonList from './DeliveryPersonList';
import OrdersList from './OrdersList';
import Inspector from './Inspector';

function AppContent() {
  return (
    <>
      <div class="app-content">
        <DeliveryPersonList></DeliveryPersonList>
        <OrdersList></OrdersList>
        <Inspector></Inspector>
      </div>
    </>
  );
}

export default AppContent;
