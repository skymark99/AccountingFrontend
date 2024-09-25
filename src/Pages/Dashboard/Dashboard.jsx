import { useEffect } from "react";
import DashBoardLeft from "./DashboardLeft/DashBoardLeft";
import DashBoardRight from "./DashboardRight/DashBoardRight";
import { useDispatch } from "react-redux";
import { fetchDashboardData } from "../../Global-Variables/features/dashBoardSlice/dashBoardSlice";
import Navbar from "../../Components/Navbar";
import ErrorBoundary from "../../Utils/ErrorBoundary";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Dashboard() {
  const month = new Date().getMonth();
  const currentMonth = monthNames[month];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return (
    <div className="body dashboard">
      <div className="responsive-nav">
        <Navbar />
      </div>
      <div className="header">
        <h2>Dashboard</h2>
      </div>
      <span className="title-blue-span">{currentMonth}</span>
      <div className="dashboard__body">
        <DashBoardLeft />
        <DashBoardRight />
      </div>
    </div>
  );
}

export default Dashboard;
