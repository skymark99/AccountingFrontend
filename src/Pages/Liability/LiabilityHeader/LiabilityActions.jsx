import { useState } from "react";
import { Modal } from "antd";
import PrimaryBlueBtn from "../../../Components/Buttons/PrimaryBlueBtn";
import SecondaryBtn from "../../../Components/Buttons/SecondaryBtn";
import LiabilityForm from "./LiabilityForm";
import LiabilityEditForm from "./LiabilityEditForm";
import { useSelector } from "react-redux";
import LogModal from "../../../Features/LogModal/LogModal";

function LiabilityActions() {
  const [open, setOpen] = useState(false);
  const [edit, setEditOpen] = useState(false);
  const [isLog, setIsLog] = useState(false);
  const handleIsLog = () => {
    setIsLog((val) => !val);
  };

  const { laibilitySelectedItems } = useSelector((state) => state.liability);

  const handleShowEdit = () => {
    setEditOpen((open) => !open);
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

      <Modal open={open} onCancel={handleCancel} footer={null} width={"50%"}>
        <h4 className="form-head">New entry for Liability</h4>
        <LiabilityForm />
      </Modal>

      <LogModal isLog={isLog} handleIsLog={handleIsLog} />

      <Modal open={edit} onCancel={handleShowEdit} footer={null} width={"50%"}>
        <h4 className="form-head">Edit Liability </h4>
        <LiabilityEditForm />
      </Modal>

      <div className="daybook__secondary-btns">
        <PrimaryBlueBtn
          onClick={handleShowEdit}
          style={{ padding: "1rem 2rem", width: "48%" }}
          disabled={laibilitySelectedItems.length !== 1}
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

export default LiabilityActions;
