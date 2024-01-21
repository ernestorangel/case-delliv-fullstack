import axios from 'axios';
import React from 'react';
import { io } from 'socket.io-client';

import './styles/App.css';
import AppBar from './components/AppBar';
import AppContent from './components/AppContent';
import Login from './components/Login';
import Toast from './components/Toast';

function App() {
  const [toastType, setToastType] = React.useState();
  const [toastMessage, setToastMessage] = React.useState();
  const [store, setStore] = React.useState();
  const [socket, setSocket] = React.useState();

  React.useEffect(() => {
    if (store) {
      const socket = io('http://localhost:3030', {
        transports: ['websocket'],
      });
      setSocket(socket);
    }
  }, [store]);

  const requestDeliveryPerson = () => {
    socket.emit('request-delivery-person', store.id, 'store');
  };

  const showToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
  };

  const clearToast = () => {
    setToastType(undefined);
    setToastMessage(undefined);
  };

  if (!store) {
    const onLogin = async (e, typedCredentials) => {
      e.preventDefault();
      await axios
        .post(`http://localhost:3000/login`, typedCredentials)
        .then((res) => {
          setStore(res.data);
        })
        .catch((err) => {
          showToast('error', err.response.data);
        });
    };

    return (
      <>
        <Toast
          type={toastType}
          message={toastMessage}
          clear={clearToast}
        ></Toast>
        <Login onLogin={onLogin}></Login>
      </>
    );
  }

  return (
    <>
      <Toast type={toastType} message={toastMessage}></Toast>
      <AppBar store={store}></AppBar>
      <AppContent store={store} onRequest={requestDeliveryPerson}></AppContent>
    </>
  );
}

export default App;
