import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon, {
  BalanceSheetIcon,
  BranchPnlIcon,
  BudgetPlannerIcon,
  CommitionIcon,
  DaybookIcon,
  LiabilityIcon,
  OutStandingIcon,
  RemiderIcon,
} from "../../Utils/icons/HomeIcon";
import { Toaster } from "react-hot-toast";

function SideBarContents() {
  const iconSize = "20px";

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
      <NavLink to="/commition">
        <li>
          <CommitionIcon size={iconSize} className="nav-icons" />
          <span>Commission</span>
        </li>
      </NavLink>
    </ul>
  );
}

export default SideBarContents;
