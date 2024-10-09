import ChameleonBtn from "../../Components/Buttons/ChameleonBtn";
import OutstandingHeader from "./OutstandingHeader/OutstandingHeader";
import OutstandingActions from "./OutstandingHeader/OutstandingActions";
import { useDispatch, useSelector } from "react-redux";
import PageNavigate from "../../Components/PageNavigate/PageNavigate";
import {
  setOutstandingAllSelected,
  setOutStandingCurrentPage,
  setOutstandingSelectedItems,
} from "../../Global-Variables/features/liabilitySlice/outstandingSlice";
import OutstandingTable from "./OutstandingHeader/OutstandingTable";
import Navbar from "../../Components/Navbar";
import { useEffect, useState } from "react";
import ThertiaryBtn from "../../Components/Buttons/ThertiaryBtn";
import DateModal from "../../Components/Date/DateModal";
import MaterialDatePicker from "../../Services/MaterialDatePicker";
import { dateOptions } from "../../data/generalDatas";
import { dateFinder } from "../../Services/helperFunctions";
import toast from "react-hot-toast";
import formatDate from "../../Services/formatDate";
import { today } from "../../Services/dateFormatter";
import { downloadLiabilityReport } from "../../Services/downloadReports";

function Outstanding() {
  const {
    outStanding,
    currentPage,
    length,
    startPage,
    outstandingSelectedItems,
    outstatndingAllSelected,
  } = useSelector((state) => state.outstanding);

  const viewSix = outStanding.slice(startPage, startPage + 6);
  const btnDisable = viewSix.length < 6;

  const showThisData = viewSix.map(
    ({
      purpose,
      amount,
      remark,
      catagory,
      status,
      branches,
      date,
      _id,
      particular,
    }) => ({
      purpose,
      amount,
      remark,
      status,
      branches,
      date,
      particular,
      catagory,
      _id,
    })
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      outstandingSelectedItems.length === showThisData.length &&
      showThisData.length > 0
    ) {
      dispatch(setOutstandingAllSelected(true));
    } else {
      dispatch(setOutstandingAllSelected(false));
    }
  }, [outstandingSelectedItems.length, showThisData.length, dispatch]);

  useEffect(() => {
    if (outstatndingAllSelected) {
      dispatch(setOutstandingSelectedItems(showThisData));
    } else if (outstandingSelectedItems.length === showThisData.length) {
      dispatch(setOutstandingSelectedItems([]));
    }
  }, [outstatndingAllSelected, dispatch]);

  const total = outstandingSelectedItems.reduce(
    (acc, val) => val.amount + acc,
    0
  );

  const [selectedDate, setSelectedDate] = useState("All");
  const [startDate, setStartDate] = useState(
    formatDate(new Date(new Date().getFullYear(), 0, 1))
  );
  const [endDate, setEndDate] = useState(today());
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDownload = () => {
    setIsOpen((val) => !val);
  };

  const handleSetStartDate = (value) => {
    setSelectedDate("Custom");
    setStartDate(value);
  };

  const handleSetEndDate = (value) => {
    setSelectedDate("Custom");
    setEndDate(value);
  };

  const handleDownloadReport = () => {
    const toastId = toast.loading("Report will be downloaded shortly...");
    try {
      downloadLiabilityReport(startDate, endDate, "outstanding");
      toast.success("Report downloaded successfully", { id: toastId });
    } catch (error) {
      toast.error("Error downloading report", { id: toastId });
    }
  };

  const handleSelectChange = (value) => {
    const { startDate: start, endDate: end } = dateFinder(value);
    return () => {
      setSelectedDate(value);
      setStartDate(start);
      setEndDate(end);
    };
  };

  return (
    <div className="body outstanding">
      <div className="responsive-nav">
        <Navbar />
      </div>
      <div className="header">
        <h2>Outstanding</h2>
      </div>
      {/* scss styles used from liability & common */}
      <div className="liability_body">
        <OutstandingHeader />

        <DateModal
          handleSelectChange={handleSelectChange}
          dateOptions={dateOptions}
          selectedDate={selectedDate}
          isOpen={isOpen}
          handleCancel={handleOpenDownload}
          isDownload={true}
          handleDownload={handleDownloadReport}
        >
          <div className="popupContainer">
            <div className="daybook__datePopup">
              <MaterialDatePicker
                date={startDate}
                setDate={handleSetStartDate}
              />
            </div>
            <div className="daybook__datePopup">
              <MaterialDatePicker date={endDate} setDate={handleSetEndDate} />
            </div>
          </div>
        </DateModal>

        <div className="entry_card_data">
          <div className="horizontal-actions">
            <ChameleonBtn className="target_info">
              {total ? total : "Total"} ₹
            </ChameleonBtn>
            <OutstandingActions />
          </div>
          <OutstandingTable data={showThisData} currentPage={currentPage} />
          <div className="liability_footer">
            <ThertiaryBtn
              style={{ fontSize: "1.2rem" }}
              onClick={handleOpenDownload}
            >
              Download Report
            </ThertiaryBtn>

            <PageNavigate
              setCurrentPage={setOutStandingCurrentPage}
              currentPage={currentPage}
              totalPages={length}
              btnDisable={btnDisable}
            />
          </div>
        </div>

        <div className="right_card_group">
          <OutstandingActions />
          <div className="items-selected">
            <span>{outstandingSelectedItems.length} items Selected</span>
            <ChameleonBtn className="target_info">
              {total ? total : "Total"} ₹
            </ChameleonBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Outstanding;
