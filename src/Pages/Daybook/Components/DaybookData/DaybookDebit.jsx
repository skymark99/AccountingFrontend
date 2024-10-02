import ThertiaryBtn from "../../../../Components/Buttons/ThertiaryBtn";
import PageNavigate from "../../../../Components/PageNavigate/PageNavigate";
import DaybookDataItems from "./DaybookDataItems";
import Loader from "../../../../Components/Loader/Loader";
import { setDebitsCurrentPage } from "../../../../Global-Variables/features/dayBookSlice/debitSlice";
import DataHeader from "../../../../Components/DataHeader";
import { useDebitsManagement } from "../../../../Hooks/debitsHooks/useDebitsManagement";
import { NoData } from "../../../../assets/images";
function DaybookDebit({ onSetTotal }) {
  const { currentPage, loading, error, viewSix } =
    useDebitsManagement(onSetTotal);

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
          currentPage > 4 ? (
            <div className="no-data-6pack">
              <div className="balance-card page-limit-card">
                <span>⚠</span> You have reached the end of the data
              </div>
            </div>
          ) : (
            <div className="no-data-6pack">
              <img src={NoData} alt="no-data" />
              <span className="text">No data available</span>
            </div>
          )
        ) : (
          viewSix.map((trans, i) => (
            <DaybookDataItems transaction={trans} key={i} />
          ))
        )}
      </div>
      <div className="daybook__data-footer">
        <ThertiaryBtn style={{ fontSize: "1.2rem", fontWeight: "400" }}>
          Download Report
        </ThertiaryBtn>
        {
          <PageNavigate
            setCurrentPage={setDebitsCurrentPage}
            currentPage={currentPage}
            totalPages={length}
            btnDisable={btnDisable}
            key={4}
          />
        }
      </div>
    </>
  );
}

export default DaybookDebit;
