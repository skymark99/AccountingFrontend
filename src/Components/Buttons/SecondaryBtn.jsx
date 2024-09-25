function SecondaryBtn({ children, style, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={style}
      className="btn secondary-blue-btn"
    >
      {children}
    </button>
  );
}

export default SecondaryBtn;
