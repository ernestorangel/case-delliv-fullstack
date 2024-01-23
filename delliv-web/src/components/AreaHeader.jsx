import '../styles/AreaHeader.css';

function AreaHeader({ title, button }) {
  return (
    <>
      <div className="area-header">
        <div className="area-header-title">{title}</div>
        {button ? (
          <button className="area-header-button" onClick={button.onClick}>
            <img src={button.icon} className="area-header-button-icon" />
            <div className="area-header-button-text">{button.text}</div>
          </button>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default AreaHeader;
