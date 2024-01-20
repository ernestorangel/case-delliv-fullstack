import axios from 'axios';
import React from 'react';
import { io } from 'socket.io-client';

import './styles/App.css';
import AppBar from './components/AppBar';
import AppContent from './components/AppContent';
import Login from './components/Login';

function App() {
  const [logged, setlogged] = React.useState(false);
  const [store, setStore] = React.useState();

  React.useEffect(() => {
    if (logged) {
      axios.get('http://localhost:3000/get-store/0').then((res) => {
        setStore(res.data[0]);
      });

      const socket = io('http://localhost:3030', {
        transports: ['websocket'],
      });
    }
  }, [logged]);

  if (!logged) {
    const login = (e, loginValue) => {
      setlogged(loginValue);
    };

    return (
      <>
        <Login onLogin={login}></Login>
      </>
    );
  }

  return (
    <>
      <AppBar store={store}></AppBar>
      <AppContent></AppContent>
    </>
  );
}

export default App;
