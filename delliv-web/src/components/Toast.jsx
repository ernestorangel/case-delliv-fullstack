import React from 'react';

import '../styles/Toast.css';

function Toast({ type, message, clearToast }) {
  const [display, setDisplay] = React.useState(false);

  React.useEffect(() => {
    if ((type, message)) {
      setDisplay(true);
      setTimeout(() => {
        setDisplay(false);
        clearToast();
      }, 5000);
    }
  }, [type, message]);

  return (
    <>
      <div
        className={`toast ${type ? type : ''} ${display ? '' : 'dont-show'}`}
      >
        {message ? message : ''}
      </div>
    </>
  );
}

export default Toast;
