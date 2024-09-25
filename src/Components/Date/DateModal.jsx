import DeleteBtn from "../Buttons/DeleteBtn";
import DownloadButton from "../Buttons/Download/DownloadButton";
import ThertiaryBtn from "../Buttons/ThertiaryBtn";
import QuickDateFIlters from "./QuickDateFIlters";
import { Modal } from "antd";

function DateModal({
  handleSelectChange,
  dateOptions,
  selectedDate,
  children,
  isOpen,
  handleCancel,
  isDownload = false,
  handleDownload = () => {},
}) {
  return (
    <Modal
      open={isOpen}
      confirmLoading={true}
      onCancel={handleCancel}
      footer={null}
      width={"60%"}
    >
      <QuickDateFIlters
        handleSelectChange={handleSelectChange}
        dateOptions={dateOptions}
        selectedDate={selectedDate}
      />
      <h4 className="form-head">Select Date</h4>
      {children}
      <div className="setDate_daybook">
        {isDownload && (
          <DownloadButton
            style={{ backgroundColor: "rgb(39, 1, 100)" }}
            onClick={handleDownload}
          >
            Download
          </DownloadButton>
        )}
        <DeleteBtn
          style={{ width: "10rem" }}
          onClick={handleSelectChange("All")}
        >
          Clear
        </DeleteBtn>
        <ThertiaryBtn style={{ width: "10rem" }} onClick={handleCancel}>
          Set Date
        </ThertiaryBtn>
      </div>
    </Modal>
  );
}

export default DateModal;
