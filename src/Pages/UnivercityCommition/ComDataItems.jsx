import { useDispatch, useSelector } from "react-redux";
import { truncateText } from "../../Services/truncateFormatter";
import { useCallback, useEffect, useState } from "react";
import { setUniversitySelectedItems } from "../../Global-Variables/features/university/universitySlice";
import { currencies } from "../../data/generalDatas";

export default function ComDataItems({ item }) {
  const { universitySelectedItems } = useSelector((state) => state.university);

  const checkItem = useCallback(() => {
    return universitySelectedItems?.some((val) => val._id === item._id);
  }, [universitySelectedItems, item._Id]);

  const [isChecked, setIsChecked] = useState(checkItem());
  const dispatch = useDispatch();

  const handleChecked = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    if (newCheckedState) {
      dispatch(setUniversitySelectedItems([...universitySelectedItems, item]));
    } else {
      dispatch(
        setUniversitySelectedItems(
          universitySelectedItems.filter((val) => val._id !== item._id)
        )
      );
    }
  };

  useEffect(() => {
    setIsChecked(checkItem());
  }, [checkItem]);

  const currentCurrency = currencies.indexOf(item?.currency);

  return (
    <div
      className={`commition__data-items ${
        isChecked ? "daybook__selected" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChecked}
        style={{ cursor: "pointer" }}
      />
      <span className="commition__data-headerItems commitionDate data-items">
        <h4> {item?.formattedDate}</h4>
      </span>
      <span className="commition__data-headerItems commition__student data-items">
        <div>
          <h4>{truncateText(item?.student, 30)}</h4>
          <div className="text">{item?.country}</div>
          <div className="text">{item?.counsillor}</div>
          <div className="text">
            {item?.intakeMonth} | {item?.intake}
          </div>
          <div className="text">{item?.university}</div>
        </div>
      </span>
      <span className="commition__data-headerItems data-items">
        <h4>{item?.branchName}</h4>
      </span>
      <span className="commition__data-headerItems data-items">
        <div style={{ textAlign: "center" }}>
          <h4>{item?.courseFee + " " + item?.currency}</h4>
          <div className="text">{item?.commition + "%"}</div>
        </div>
      </span>
      <span className="commition__data-headerItems data-items">
        <div style={{ textAlign: "left" }}>
          <h4>{((item?.commition / 100) * item?.courseFee).toFixed(2)}</h4>
          <div className="text">{item?.inr + " INR"}</div>
        </div>
      </span>
      <span className="commition__data-headerItems data-items">
        <h4>{item?.status}</h4>
      </span>
      <span className="commition__data-headerItems data-items">
        <h4>{truncateText(item?.agent, 25)}</h4>
      </span>
    </div>
  );
}
