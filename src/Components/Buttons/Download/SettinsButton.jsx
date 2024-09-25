function SettinsButton({ onClick }) {
  return (
    <button className="setting-btn" onClick={onClick}>
      <span className="bar bar1"></span>
      <span className="bar bar2"></span>
      <span className="bar bar1"></span>
    </button>
  );
}

export default SettinsButton;
