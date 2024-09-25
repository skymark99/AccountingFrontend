function ThertiaryBtn({ children, style, onClick }) {
  return (
    <button onClick={onClick} className="btn thertiary-blue-btn" style={style}>
      {children}
    </button>
  );
}

export default ThertiaryBtn;
