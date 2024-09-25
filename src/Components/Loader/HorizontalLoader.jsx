function HorizontalLoader({ style }) {
  return (
    <div className="h-spinner-container">
      <div className="h-spinner" style={style}>
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
      </div>
    </div>
  );
}

export default HorizontalLoader;
