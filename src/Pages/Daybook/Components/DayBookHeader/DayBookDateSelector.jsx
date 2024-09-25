import { SlEqualizer } from "react-icons/sl";

function DayBookDateSelector({ onClick }) {
  return (
    <div onClick={onClick} className="icon-wrapper">
      <SlEqualizer className="rotated-icon" />
    </div>
  );
}

export default DayBookDateSelector;
