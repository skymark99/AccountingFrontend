/* eslint-disable react-hooks/exhaustive-deps */
import ThertiaryBtn from "../../../../Components/Buttons/ThertiaryBtn";
import PageNavigate from "../../../../Components/PageNavigate/PageNavigate";
import DaybookDataItems from "./DaybookDataItems";
import Loader from "../../../../Components/Loader/Loader";
import { setCreditsCurrentPage } from "../../../../Global-Variables/features/dayBookSlice/creditSlice";
import DataHeader from "../../../../Components/DataHeader";
import { useCreditsManagement } from "../../../../Hooks/creditsHooks/useCreditManagement";
import { NoData } from "../../../../assets/images";

function DaybookCredit({ onSetTotal }) {
  const { currentPage, loading, error, viewSix } =
    useCreditsManagement(onSetTotal);

  const btnDisable = viewSix.length < 6;

  return (
    <>
      <DataHeader>
        <span className="particulars">Particular</span>
        <span className="date-time">Date & time</span>
        <span className="Amount">Amount</span>
        <span className="header-remark">Remark</span>
        <span className="debited">Debited</span>
        <span className="credited">Credited</span>
        <span>Branch</span>
      </DataHeader>

      {/* Transactions Data Container */}
      <div className={`datas__container`}>
        {loading ? (
          <Loader
            styles={{
              width: "15rem",
              height: "15rem",
            }}
          />
        ) : error ? (
          <div className="error-fullpage">{error}</div>
        ) : viewSix.length === 0 ? (
          <div className="no-data-6pack">
            <img src={NoData} alt="no-data" />
            <span className="text">No data available</span>
          </div>
        ) : (
          viewSix.map((trans, i) => (
            <DaybookDataItems transaction={trans} key={i} />
          ))
        )}
      </div>

      {/* Footer with Download and Pagination */}
      <div className="daybook__data-footer">
        <ThertiaryBtn style={{ fontSize: "1.2rem", fontWeight: "400" }}>
          Download Report
        </ThertiaryBtn>
        <PageNavigate
          setCurrentPage={setCreditsCurrentPage}
          currentPage={currentPage}
          btnDisable={btnDisable}
          key={3}
        />
      </div>
    </>
  );
}

export default DaybookCredit;
