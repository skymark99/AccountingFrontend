import Navbar from "../../Components/Navbar";
import ComData from "./ComData";
import ComDataHeader from "./ComDataHeader";
import { useUniversity } from "../../Hooks/universityHook/useUniversity";
import ThertiaryBtn from "../../Components/Buttons/ThertiaryBtn";
import DaybookActionBtns from "../Daybook/Components/DaybookActionBtns";
import ComActionsBtns from "./ComActionBtns";

function Commition() {
  useUniversity();

  return (
    <div className="body">
      <div className="responsive-nav">
        <Navbar />
      </div>
      <div className="header">
        <h2>University Commission</h2>
      </div>
      <div className="daybook__body commition">
        <div className="daybook__header">height</div>
        <div className="daybook__data commition_data">
          <ComDataHeader />
          <ComData />
        </div>
        <div className="daybook__actions commition__actions">
          <ComActionsBtns />
        </div>
      </div>
    </div>
  );
}

export default Commition;
