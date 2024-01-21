import React from 'react';

import '../styles/Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <>
      <div className="login-wraper">
        <div className="login-logo">delliv</div>
        <form
          className="login-form"
          onSubmit={(e) => onLogin(e, { username, password })}
        >
          <div className="input-wraper">
            <img
              src="src\assets\images\icons\profile-pic-icon.png"
              alt="Profile Picture"
              className="input-icon"
            />
            <input
              className="login-text-field"
              type="text"
              placeholder="Usuário"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wraper">
            <img
              src="src\assets\images\icons\trancar.png"
              alt="Profile Picture"
              className="input-icon"
            />
            <input
              className="login-text-field"
              type="password"
              placeholder="Senha"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-button" type="submit" value="Login">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
