import { useSelector } from "react-redux";
import ArrowUpBtn from "../../Components/ArrowUpBtn";
import { Skeleton } from "antd";

function TotalIncome() {
  const { income, loading, error } = useSelector((state) => state.dashboard);

  return (
    <div className="overview-item">
      <span className="small-bold-title">Income</span>
      {loading ? (
        <div className="medium-money overview-content">
          <Skeleton.Input active style={{ width: 200, height: 26 }} />
        </div>
      ) : error ? (
        <div className="error-message">
          <span>Error: {error}</span>
        </div>
      ) : (
        <div className="medium-money overview-content">
          <span>{income}</span>
          <ArrowUpBtn size="20px" />
        </div>
      )}
    </div>
  );
}

export default TotalIncome;
