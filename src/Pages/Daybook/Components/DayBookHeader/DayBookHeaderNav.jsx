import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentDayBookState } from "../../../../Global-Variables/features/dayBookSlice/dayBookSlice";

function DayBookHeaderNav() {
  const [translate, setTranslate] = useState(0);

  const dispatch = useDispatch();

  const hanldeAllStatus = () => {
    setTranslate(0);
    dispatch(setCurrentDayBookState("all"));
  };
  const hanldeDebit = () => {
    setTranslate(9.3);
    dispatch(setCurrentDayBookState("debit"));
  };
  const hanldeCredit = () => {
    setTranslate(17.8);
    dispatch(setCurrentDayBookState("credit"));
  };

  return (
    <div className="daybook__navigation">
      <span onClick={hanldeAllStatus}>All Status</span>
      <span onClick={hanldeDebit}>Expense</span>
      <span onClick={hanldeCredit} className="income">
        Income
      </span>
      <div
        style={{
          width: "7rem",
          height: "2px",
          backgroundColor: "black",
          position: "absolute",
          bottom: "-0.2rem",
          transform: `translateX(${translate}rem)`,
          transition: "all .3s ease",
        }}
        className="line"
      ></div>
    </div>
  );
}

export default DayBookHeaderNav;
