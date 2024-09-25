import { useSelector } from "react-redux";
import { Skeleton } from "antd";
import ArrowUpBtn from "../../../../Components/ArrowUpBtn";

function OutstandingIncome() {
  const { totalOutstanding, loading, error } = useSelector(
    (state) => state.liability
  );
  return (
    <div className="balance-sheet-card">
      <span className="small-bold-title">Outstanding Income</span>
      {loading ? (
        <div className="medium-money">
          <Skeleton.Input active style={{ width: 170, height: 25 }} />
        </div>
      ) : error ? (
        <div className="error">
          <span>{error}</span>
        </div>
      ) : (
        <div className="medium-money">
          <span>{isNaN(totalOutstanding) ? totalOutstanding : 0.0}</span>
          <ArrowUpBtn size="20px" />
        </div>
      )}
    </div>
  );
}

export default OutstandingIncome;
