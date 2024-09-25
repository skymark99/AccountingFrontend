import { useState } from "react";
import { Modal } from "antd";
import PrimaryBlueBtn from "../../../Components/Buttons/PrimaryBlueBtn";
import SecondaryBtn from "../../../Components/Buttons/SecondaryBtn";
import RemindersForm from "./RemindersForm";
import { useSelector } from "react-redux";
import RemindersEditForm from "./RemindersEditForm";
import LogModal from "../../../Features/LogModal/LogModal";

function RemindersActions() {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLog, setIsLog] = useState(false);

  const { reminderSelectedItems } = useSelector((state) => state.reminders);

  const editBtnDisable = reminderSelectedItems.length !== 1;

  const handleEdit = () => {
    setIsEdit((val) => !val);
  };

  const handleIsLog = () => {
    setIsLog((val) => !val);
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

      <Modal open={open} onCancel={handleCancel} footer={null} width={"60%"}>
        <h4 className="form-head">New entry for Reminders</h4>
        <RemindersForm />
      </Modal>
      <Modal open={isEdit} onCancel={handleEdit} footer={null} width={"60%"}>
        <h4 className="form-head">Edit Reminders</h4>
        <RemindersEditForm />
      </Modal>

      <LogModal isLog={isLog} handleIsLog={handleIsLog} />

      <div className="daybook__secondary-btns">
        <PrimaryBlueBtn
          style={{ padding: "1rem 2rem", width: "48%" }}
          onClick={handleEdit}
          disabled={editBtnDisable}
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

export default RemindersActions;
