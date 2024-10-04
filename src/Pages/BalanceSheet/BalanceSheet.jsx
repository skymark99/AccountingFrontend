import { useState } from "react";
import BalanceSheetHeader from "./Components/BalanceSheetHeader/BalanceSheetHeader";
import TotalLiability from "./Components/BalanceSheetCardsRight/TotalLiability";
import OutstandingIncome from "./Components/BalanceSheetCardsRight/OutstandingIncome";
import TotAvailableBalance from "./Components/BalanceSheetCardsRight/TotAvailableBalance";
import BalanceSheetTable from "./Components/BalanceSheetCardsRight/BalanceSheetTable";
import Navbar from "../../Components/Navbar";
import { useSelector } from "react-redux";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { useBalanceSheet } from "../../Hooks/balanceSheetHook/useBalanceSheet";

function BalanceSheet() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data } = useSelector((state) => state.balanceSheet);

  useBalanceSheet();

  const handleNext = () => {
    setCurrentPage(6);
  };

  const handlePrevious = () => {
    setCurrentPage(0);
  };

  return (
    <div className="body balancesheet">
      <div className="responsive-nav">
        <Navbar />
      </div>
      <div className="header">
        <h2>Balance Sheet</h2>
      </div>
      <div className="balance_sheet_body">
        <BalanceSheetHeader />
        <div className="balance_sheet_data">
          <BalanceSheetTable
            data={data.slice(currentPage, currentPage + 6)}
            width="90%"
          />

          <div className="sheet__buttons">
            {/* <ThertiaryBtn style={{ fontSize: "1.2rem" }}>
              Download Report
            </ThertiaryBtn> */}

            <div className="pagination-group">
              <button className="pagination-btn" onClick={handlePrevious}>
                <span className="prev-icon-span">
                  <TbPlayerTrackPrev className="icons" />
                </span>
                Previous
              </button>
              <button className="button pagination-btn" onClick={handleNext}>
                Next
                <span className="next-icon-span">
                  <TbPlayerTrackNext className="icons" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="balance_sheet_cards_group">
          <div className="income-cards">
            <OutstandingIncome />
            <TotalLiability />
          </div>
          <TotAvailableBalance />
        </div>
      </div>
    </div>
  );
}

export default BalanceSheet;
