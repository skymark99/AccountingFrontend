import LogoutButton from "../../Components/Buttons/LogutButton/LogoutButton";
import Logo from "../../Components/Logo/Logo";
import SideBarContents from "./SideBarContents";
import User from "./User";

function SideBar() {
  return (
    <div className="sideBar">
      <Logo />
      <nav className="sideBar__nav">
        <SideBarContents />
      </nav>
      <div>
        <User />
        <LogoutButton />
      </div>
    </div>
  );
}

export default SideBar;
