import { useSelector } from "react-redux";
import Navbar from "../../Components/Navbar";
import ComData from "./ComData";
import ComDataHeader from "./ComDataHeader";

function Commition() {
  const {
    universities,
    currentPage,
    length,
    startPage,
    universitySelectedItems,
    universityAllSelecteds,
  } = useSelector((state) => state.university);

  return (
    <div className="body">
      <div className="responsive-nav">
        <Navbar />
      </div>
      <div className="header">
        <h2>University Commission</h2>
      </div>
      <div className="commition">
        <div className="daybook__header commition__header">height</div>
        <div className="commition__data">
          <ComDataHeader />
          <ComData />
        </div>
      </div>
    </div>
  );
}

export default Commition;
