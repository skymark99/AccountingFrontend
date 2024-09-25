import { useState } from "react";
import { Modal } from "antd";
import PrimaryBlueBtn from "../../../Components/Buttons/PrimaryBlueBtn";
import SecondaryBtn from "../../../Components/Buttons/SecondaryBtn";
import OutstandingForm from "./OutstandingForm";
import { useSelector } from "react-redux";
import OutstandingEditForm from "./OutstandingEditForm";
import LogModal from "../../../Features/LogModal/LogModal";

function OutstandingActions() {
  const { outstandingSelectedItems } = useSelector(
    (state) => state.outstanding
  );
  const editBtnDisable = outstandingSelectedItems.length !== 1;

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [isLog, setIsLog] = useState(false);
  const handleIsLog = () => {
    setIsLog((val) => !val);
  };

  const handleEdit = () => {
    setIsEdit((val) => !val);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="daybook__actions-btns-daybook">
      <PrimaryBlueBtn
        onClick={showModal}
        style={{
          fontWeight: "700",
          padding: "1rem 3rem",
          fontFamily: "Roboto",
          width: "15rem",
        }}
      >
        + New Entry
      </PrimaryBlueBtn>

      <Modal open={isEdit} onCancel={handleEdit} footer={null} width={"50%"}>
        <h4 className="form-head">Edit Outstandings</h4>
        <OutstandingEditForm />
      </Modal>
      <Modal open={open} onCancel={handleCancel} footer={null} width={"50%"}>
        <h4 className="form-head">New entry for Outstanding</h4>
        <OutstandingForm />
      </Modal>

      <LogModal isLog={isLog} handleIsLog={handleIsLog} />

      <div className="daybook__secondary-btns">
        <PrimaryBlueBtn
          onClick={handleEdit}
          disabled={editBtnDisable}
          style={{ padding: "1rem 2rem", width: "48%" }}
        >
          Edit
        </PrimaryBlueBtn>
        <SecondaryBtn
          style={{ padding: "1rem 2rem", width: "48%" }}
          onClick={handleIsLog}
        >
          Log
        </SecondaryBtn>
      </div>
    </div>
  );
}

export default OutstandingActions;
