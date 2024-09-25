import { useSelector } from "react-redux";
import MonthlyPNLChart from "../../Pages/BranchPNL/BranchPNL_Cards/MonthlyPNLChart";
import Outstanding from "./Outstanding";
import TopPerformer from "./TopPerformer";
import TotalExpense from "./TotalExpense";
import TotalIncome from "./TotalIncome";
import GraphSkelton from "../../Components/GraphSkelton";

const labels = [
  "Kannur",
  "Manjeri",
  "Kochi",
  "Kottayam",
  "Calicut",
  "Directors",
  "Corporate",
];

function Overview() {
  const { incomeArr, expenseArr, loading, error } = useSelector(
    (state) => state.dashboard
  );

  const max = Math.max(1000, ...(incomeArr || []), ...(expenseArr || []));

  const datasets = [
    {
      label: "Expense",
      data: expenseArr,
      gradientStart: "rgba(60, 135, 167, 1)",
      gradientEnd: "rgba(7, 18, 93, 1)",
    },
    {
      label: "Income",
      data: incomeArr,
      gradientStart: "rgba(71, 202, 52, 1)",
      gradientEnd: "rgba(71, 202, 52, 1)",
    },
  ];

  return (
    <div>
      <div className="overview">
        <div className="shadow-box">
          <TotalIncome />
        </div>
        <div className="shadow-box">
          <TotalExpense />
        </div>
        <div className="shadow-box">
          <TopPerformer />
        </div>
        <div className="shadow-box">
          <Outstanding />
        </div>
      </div>
      <div className="graph-container">
        {error ? (
          <div className="error error-fullpage">An error occurred: {error}</div>
        ) : loading ? (
          <GraphSkelton />
        ) : (
          <>
            <span className="graph-head">August Branch wise PNL</span>
            <div className="chart-wrapper">
              <MonthlyPNLChart labels={labels} datasets={datasets} max={max} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Overview;
