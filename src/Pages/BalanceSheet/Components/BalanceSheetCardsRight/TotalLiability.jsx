import { useSelector } from "react-redux";
import { Skeleton } from "antd";
import ArrowDownBtn from "../../../../Components/ArrowDownBtn";

function TotalLiability() {
  const { totalLiability, error, loading } = useSelector(
    (state) => state.liability
  );

  return (
    <div className="balance-sheet-card">
      <span className="small-bold-title">Total Liability</span>
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
          <span>{isNaN(totalLiability) ? totalLiability : 0.0}</span>
          <ArrowDownBtn size="20px" />
        </div>
      )}
    </div>
  );
}

export default TotalLiability;
