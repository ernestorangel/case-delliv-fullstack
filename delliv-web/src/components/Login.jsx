import '../styles/Login.css';

function Login({ onLogin }) {
  return (
    <>
      <div className="login-wraper">
        <div className="login-logo">delliv</div>
        <form className="login-form" onSubmit={(e) => onLogin(e, true)}>
          <input
            className="login-text-field"
            type="text"
            placeholder="username"
          />
          <input
            className="login-text-field"
            type="text"
            placeholder="password"
          />
          <button className="login-button" type="submit" value="Login">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
