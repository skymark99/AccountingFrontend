import { ArrowUp } from "../Utils/icons/HomeIcon";

function ArrowUpBtn({ size = "30px", style, arroSize = "24px" }) {
  return (
    <span
      className="arrow-up-btn"
      style={{ height: size, width: size, ...style }}
    >
      <ArrowUp size={arroSize} />
    </span>
  );
}

export default ArrowUpBtn;
