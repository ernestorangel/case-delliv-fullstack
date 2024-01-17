import '../styles/AppBar.css';

function AppBar({ store }) {
  if (!store) {
    return (
      <>
        <div className="app-bar">
          <div className="app-bar-logo">delliv</div>
          <div className="app-bar-profile">
            <div className="app-bar-profile-name">Loja Desconhecida</div>
            <div className="app-bar-profile-pic">
              <img
                src="src\assets\images\icons\profile-pic-icon.png"
                alt="Profile Picture"
                width="20"
                height="20"
                className="app-bar-profile-img"
              />
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="app-bar">
        <div className="app-bar-logo">delliv</div>
        <div className="app-bar-profile">
          <div className="app-bar-profile-name">{store.name}</div>
          <div className="app-bar-profile-pic">
            <img
              src="src\assets\images\icons\profile-pic-icon.png"
              alt="Profile Picture"
              width="20"
              height="20"
              className="app-bar-profile-img"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AppBar;
