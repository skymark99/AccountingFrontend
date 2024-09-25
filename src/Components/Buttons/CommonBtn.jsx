function CommonBtn({ children, style }) {
  return (
    <button style={style} className="common-btn">
      {children}
    </button>
  );
}

export default CommonBtn;
