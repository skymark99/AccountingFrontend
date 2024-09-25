import CurrentBalance from "../../../Components/CurrentBalance";
import ErrorBoundary from "../../../Utils/ErrorBoundary";
import DashboardReminder from "../Components/DashboardReminder";

function DashBoardRight() {
  return (
    <div className="dashboard__right">
      <div className="dashboard__right-wrap">
        <CurrentBalance />
        <ErrorBoundary>
          <DashboardReminder />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default DashBoardRight;
