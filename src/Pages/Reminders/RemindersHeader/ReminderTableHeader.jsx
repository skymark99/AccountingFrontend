import { useDispatch, useSelector } from "react-redux";
import { setReminderAllSelected } from "../../../Global-Variables/features/remindersSlice/remindersSlice.";

function ReminderTableHeader({ children, style, className }) {
  const { reminderAllSelected: allSelected } = useSelector(
    (state) => state.reminders
  );

  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(setReminderAllSelected(!allSelected));
  };

  return (
    <div className={`data-header ${className}`} style={style}>
      <input
        style={{ cursor: "pointer" }}
        checked={allSelected}
        type="checkbox"
        onChange={handleSelect}
      />
      {children}
    </div>
  );
}

export default ReminderTableHeader;
