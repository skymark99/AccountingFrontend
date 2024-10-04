import Navbar from "../../Components/Navbar";
import ComData from "./ComData";
import ComDataHeader from "./Components/ComDataHeader";
// import ComActionsBtns from "./ComActionBtns";
import { useUniversity } from "../../Hooks/universityHook/useUniversity";
import ComHeader from "./ComHeader";

function Commition() {
  useUniversity();

  return (
    <div className="body daybook">
      <div className="responsive-nav">
        <Navbar />
      </div>
      <div className="commition">
        <div className="commition__header">
          <ComHeader />
        </div>
        <div className="commition__data">
          <ComDataHeader />
          <ComData />
        </div>
      </div>
    </div>
  );
}

export default Commition;
