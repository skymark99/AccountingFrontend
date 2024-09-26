import { useEffect } from "react";
import DashBoardLeft from "./DashboardLeft/DashBoardLeft";
import DashBoardRight from "./DashboardRight/DashBoardRight";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../Global-Variables/features/dashBoardSlice/dashBoardSlice";
import Navbar from "../../Components/Navbar";

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

  const { initialStatus } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (initialStatus !== "Success") {
      console.log("working");
      dispatch(fetchDashboardData());
    }
  }, [dispatch, initialStatus]);

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
