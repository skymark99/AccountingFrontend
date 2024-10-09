/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import LiabilityHeader from "./LiabilityHeader/LiabilityHeader";
import ChameleonBtn from "../../Components/Buttons/ChameleonBtn";
import LiabilityActions from "./LiabilityHeader/LiabilityActions";
import PageNavigate from "../../Components/PageNavigate/PageNavigate";
import { useDispatch, useSelector } from "react-redux";
import {
  setLaibilitySelectedItems,
  setLiabilityAllSelected,
  setLiabilityCurrentPage,
} from "../../Global-Variables/features/liabilitySlice/liabilitySlice";
import LiabilityTable from "./LiabilityHeader/LiabilityTable";
import Navbar from "../../Components/Navbar";
import ThertiaryBtn from "../../Components/Buttons/ThertiaryBtn";
import DateModal from "../../Components/Date/DateModal";
import { dateOptions } from "../../data/generalDatas";
import MaterialDatePicker from "../../Services/MaterialDatePicker";
import formatDate from "../../Services/formatDate";
import { today } from "../../Services/dateFormatter";
import toast from "react-hot-toast";
import { downloadLiabilityReport } from "../../Services/downloadReports";
import { dateFinder } from "../../Services/helperFunctions";
import { useAllFetch } from "../../Hooks/useAllFetch/useAllFetch";

function Liability() {
  const {
    liability,
    currentPage,
    length,
    startPage,
    laibilitySelectedItems,
    liabilityAllSelected,
  } = useSelector((state) => state.liability);

  useAllFetch();

  const dispatch = useDispatch();

  const viewSix = liability.slice(startPage, startPage + 6);
  const showThisData = viewSix.map(
    ({
      particular,
      catagory,
      purpose,
      amount,
      remark,
      status,
      branches,
      date,
      _id,
    }) => ({
      particular,
      purpose,
      amount,
      catagory,
      remark,
      status,
      branches,
      date,
      _id,
    })
  );

  // Update the effect to set allChecked correctly
  useEffect(() => {
    if (
      laibilitySelectedItems.length === showThisData.length &&
      showThisData.length > 0
    ) {
      dispatch(setLiabilityAllSelected(true));
    } else {
      dispatch(setLiabilityAllSelected(false));
    }
  }, [laibilitySelectedItems.length, showThisData.length, dispatch]);

  useEffect(() => {
    if (liabilityAllSelected) {
      dispatch(setLaibilitySelectedItems(showThisData));
    } else if (laibilitySelectedItems.length === showThisData.length) {
      dispatch(setLaibilitySelectedItems([]));
    }
  }, [liabilityAllSelected, dispatch]);

  const total = laibilitySelectedItems.reduce(
    (acc, val) => val.amount + acc,
    0
  );

  const btnDisable = viewSix.length < 6;

  // download report
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
      downloadLiabilityReport(startDate, endDate, "liability");
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
    <div className="body liability">
      <div className="responsive-nav">
        <Navbar />
      </div>
      <div className="header">
        <h2>Liability</h2>
      </div>
      <div className="liability_body">
        <LiabilityHeader />

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
              ₹{total ? total : "Total"}
            </ChameleonBtn>
            <LiabilityActions />
          </div>
          <LiabilityTable data={showThisData} currentPage={currentPage} />
          <div className="liability_footer">
            <ThertiaryBtn
              style={{ fontSize: "1.2rem" }}
              onClick={handleOpenDownload}
            >
              Download Report
            </ThertiaryBtn>

            <PageNavigate
              setCurrentPage={setLiabilityCurrentPage}
              currentPage={currentPage}
              totalPages={length}
              btnDisable={btnDisable}
            />
          </div>
        </div>
        <div className="right_card_group">
          <LiabilityActions />
          <div className="items-selected">
            <span>{laibilitySelectedItems.length} items Selected</span>
            <ThertiaryBtn>{total ? total : "Total"} ₹</ThertiaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Liability;
