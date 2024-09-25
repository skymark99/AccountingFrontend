import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon, {
  BalanceSheetIcon,
  BranchPnlIcon,
  BudgetPlannerIcon,
  DaybookIcon,
  LiabilityIcon,
  LogoutIcon,
  OutStandingIcon,
  RemiderIcon,
} from "../../Utils/icons/HomeIcon";
import NotifyBtn from "../../Components/Buttons/NotifyBtn";
import { Toaster } from "react-hot-toast";
import { logout } from "../../Services/AxiosService";
import toasting from "../../Utils/Toasting";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../Global-Variables/features/auth/authSlice";

function SideBarContents() {
  const iconSize = "20px";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const handleLogout = async () => {
  //   try {
  //     toasting("error", "Logged Out");
  //     await logout();
  //     navigate("/sign-in");
  //     dispatch(setIsLoggedIn(false));
  //   } catch (e) {
  //     toasting("error", "Logout failed");
  //   }
  // };
  return (
    <ul>
      <Toaster />
      <NavLink to="/dashboard">
        <li>
          <HomeIcon size={iconSize} className="nav-icons" />
          <span>Dashboard</span>
        </li>
      </NavLink>

      <NavLink to="/daybook">
        <li>
          <DaybookIcon size={iconSize} className="nav-icons" />
          <span>Day Book</span>
          {/* <NotifyBtn style={{ backgroundColor: "rgb(16, 182, 16)" }}>
            83
          </NotifyBtn> */}
        </li>
      </NavLink>

      <NavLink to="/balance-sheet">
        <li>
          <BalanceSheetIcon size={iconSize} className="nav-icons" />
          <span>Balance Sheet</span>
        </li>
      </NavLink>

      <NavLink to="/liability">
        <li>
          <LiabilityIcon size={iconSize} className="nav-icons" />
          <span>Liability</span>
        </li>
      </NavLink>

      <NavLink to="/outstanding">
        <li>
          <OutStandingIcon size={iconSize} className="nav-icons" />
          <span>Outstanding</span>
        </li>
      </NavLink>

      <NavLink to="/reminders">
        <li>
          <RemiderIcon size={iconSize} className="nav-icons" />
          <span>Reminders</span>
          {/* <NotifyBtn style={{ backgroundColor: "rgb(39, 1, 100)" }}>
            83
          </NotifyBtn> */}
        </li>
      </NavLink>

      <NavLink to="/branch-pnl">
        <li>
          <BranchPnlIcon size={iconSize} className="nav-icons" />
          <span>Branchwise PNL</span>
        </li>
      </NavLink>

      <NavLink to="/budget-planner">
        <li>
          <BudgetPlannerIcon size={iconSize} className="nav-icons" />
          <span>Budget Planner</span>
        </li>
      </NavLink>

      {/* <li onClick={handleLogout}>
        <LogoutIcon size={iconSize} className="nav-icons" />
        <span>Logout</span>
      </li> */}
    </ul>
  );
}

export default SideBarContents;
