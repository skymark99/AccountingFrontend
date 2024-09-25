function Percentage({ children, size = "1rem" }) {
  const content = children.split("/");
  const percent = content[0];
  const text = content[1];
  const isPositive = !percent.startsWith("-");

  return (
    <div>
      <span
        style={{
          color: isPositive ? "green" : "red",
          fontSize: size,
          fontWeight: "100",
          fontFamily: "inter",
        }}
      >
        {percent}
      </span>
      <span
        style={{
          color: "black",
          fontSize: size,
          fontWeight: "100",
          paddingLeft: parseInt(size) / 2 + "rem",
        }}
      >
        {text}
      </span>
    </div>
  );
}

export default Percentage;
