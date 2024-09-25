const colorCombinations = [
  ["#ffffff", "#1e51a2"],
  ["#ffffff", "#e28a77"],
  ["#ffffff", "#dfb085"],
];

function TableIcons({ name, index }) {
  const getColorCombination = (index) =>
    colorCombinations[index % colorCombinations.length];

  return (
    <div className="bp-table-container">
      <div
        className="bp-table-icon"
        style={{
          background: `linear-gradient(to bottom, ${getColorCombination(
            index
          )?.join(", ")})`,
        }}
      ></div>
      <div className="bp-table-text">{name}</div>
    </div>
  );
}

export default TableIcons;
