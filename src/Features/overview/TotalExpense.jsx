import ArrowDownBtn from "../../Components/ArrowDownBtn";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";

function TotalExpense() {
  const { expense, loading, error } = useSelector((state) => state.dashboard);
  return (
    <div className="overview-item">
      <span className="small-bold-title">Expense</span>
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
          <span>{expense}</span>
          <ArrowDownBtn size="20px" />
        </div>
      )}
    </div>
  );
}

export default TotalExpense;
