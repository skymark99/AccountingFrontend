import React, { useState } from "react";
import { RiMenuFold2Fill, RiMenuFoldFill } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import Logo from "./Logo/Logo";
import HomeIcon, {
  BalanceSheetIcon,
  BranchPnlIcon,
  BudgetPlannerIcon,
  DaybookIcon,
  LiabilityIcon,
  OutStandingIcon,
  RemiderIcon,
} from "../Utils/icons/HomeIcon";
import { NavLink } from "react-router-dom";
import { Popconfirm, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FaPowerOff } from "react-icons/fa";

// Simulate the backend API call
const handleLogout = async () => {};

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="navbar">
      <span className="navbar-menu" onClick={toggleNav}>
        <RiMenuFold2Fill className="menu-icon" />
        Menu
      </span>
      <span className="navbar-logo">
        <Logo />
      </span>

      {/* Popconfirm on the CiMenuKebab */}
      <Popconfirm
        title="Logout"
        description="Are you sure to logout now ?"
        onConfirm={handleLogout}
        icon={
          <FaPowerOff
            style={{ color: "red", marginTop: "5px", marginRight: "5px" }}
          />
        }
        okText="Yes"
        cancelText="No"
      >
        <span className="navbar-kebab">
          <CiMenuKebab className="kebab-icon" />
        </span>
      </Popconfirm>

      {/* Sidebar Navigation */}
      <div className={`side-nav ${isNavOpen ? "open" : ""}`}>
        <h2 onClick={toggleNav}>
          <RiMenuFoldFill />
        </h2>
        <div className="menu-list">
          <NavLink to="/dashboard">
            <span>
              <HomeIcon size={"18px"} />
              <span>Dashboard</span>
            </span>
          </NavLink>
          <NavLink to="/daybook">
            <span>
              <DaybookIcon size={"18px"} />
              <span>Day Book</span>
            </span>
          </NavLink>
          <NavLink to="/balance-sheet">
            <span>
              <BalanceSheetIcon size={"18px"} />
              <span>Balance Sheet</span>
            </span>
          </NavLink>
          <NavLink to="/liability">
            <span>
              <LiabilityIcon size={"18px"} />
              <span>Liability</span>
            </span>
          </NavLink>
          <NavLink to="/outstanding">
            <span>
              <OutStandingIcon size={"18px"} />
              <span>Outstanding</span>
            </span>
          </NavLink>
          <NavLink to="/reminders">
            <span>
              <RemiderIcon size={"18px"} />
              <span>Reminders</span>
            </span>
          </NavLink>
          <NavLink to="/branch-pnl">
            <span>
              <BranchPnlIcon size={"18px"} />
              <span>Branchwise PNL</span>
            </span>
          </NavLink>
          <NavLink to="/budget-planner">
            <span>
              <BudgetPlannerIcon size={"18px"} />
              <span>Budget Planner</span>
            </span>
          </NavLink>
        </div>
      </div>

      {/* Overlay */}
      {isNavOpen && <div className="overlay" onClick={toggleNav}></div>}
    </div>
  );
};

export default Navbar;
