function DeleteBtn({ disabled, onClick, style, children }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={`btn delete-btn ${disabled ? "disabledBtn" : ""}`}
    >
      {children}
    </button>
  );
}

export default DeleteBtn;
