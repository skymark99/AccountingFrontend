function PrimaryBlueBtn({ children, style, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={`btn primary-blue-btn ${disabled ? "disabledBtn" : ""}`}
    >
      {children}
    </button>
  );
}

export default PrimaryBlueBtn;
