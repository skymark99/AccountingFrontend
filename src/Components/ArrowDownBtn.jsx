import { ArrowDown } from "../Utils/icons/HomeIcon";

function ArrowDownBtn({ size = "20px" }) {
  return (
    <span className="arrow-down-btn" style={{ height: size, width: size }}>
      <ArrowDown size="24" />
    </span>
  );
}

export default ArrowDownBtn;
