import Navbar from "../../Components/Navbar";
import ComData from "./ComData";
import ComDataHeader from "./ComDataHeader";
import { useUniversity } from "../../Hooks/universityHook/useUniversity";
import ComActionsBtns from "./ComActionBtns";
import { setUniversityCurrentPage } from "../../Global-Variables/features/university/universitySlice";
import { useSelector } from "react-redux";
import PageNavigate from "../../Components/PageNavigate/PageNavigate";

function Commition() {
  const { currentPage } = useSelector((state) => state.university);
  useUniversity();

  return (
    <div className="body daybook">
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
