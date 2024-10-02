import { Modal } from "antd";
import PrimaryBlueBtn from "../../Components/Buttons/PrimaryBlueBtn";
import DaybookForm from "../Daybook/Components/DaybookData/DaybookForm";
import DaybookEditForm from "../Daybook/Components/DaybookData/DaybookEditForm";
import SecondaryBtn from "../../Components/Buttons/SecondaryBtn";
import LogModal from "../../Features/LogModal/LogModal";
import { useSelector } from "react-redux";
import { useState } from "react";

function ComActionsBtns() {
  const { selected } = useSelector((state) => state.daybook);

  const [isNewEntri, setIsNewEntri] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [isLog, setIsLog] = useState(false);
  const handleIsLog = () => {
    setIsLog((val) => !val);
  };

  const handleIsEdit = () => {
    setIsEdit((val) => !val);
  };
  const handleIsNewEntri = () => {
    setIsNewEntri((val) => !val);
  };

  return (
    <div className="daybook__actions-btns-daybook">
      <PrimaryBlueBtn
        onClick={handleIsNewEntri}
        style={{
          fontWeight: "700",
          padding: "1rem 3rem",
          fontFamily: "Roboto",
          width: "15rem",
        }}
      >
        + New Entry
      </PrimaryBlueBtn>

      <Modal
        open={isNewEntri}
        onCancel={handleIsNewEntri}
        footer={null}
        width={"50%"}
      >
        <h4 className="form-head">New entry for Day book</h4>
        <DaybookForm />
      </Modal>

      <Modal open={isEdit} onCancel={handleIsEdit} footer={null} width={"50%"}>
        <h4 className="form-head">Edit The Transaction</h4>
        <DaybookEditForm />
      </Modal>

      <div className="daybook__secondary-btns">
        <PrimaryBlueBtn
          disabled={selected.length !== 1}
          onClick={handleIsEdit}
          style={{ padding: "1rem 2rem", width: "48%" }}
        >
          Edit
        </PrimaryBlueBtn>
        <SecondaryBtn
          onClick={handleIsLog}
          style={{ padding: "1rem 2rem", width: "48%" }}
        >
          Log
        </SecondaryBtn>
      </div>

      <LogModal isLog={isLog} handleIsLog={handleIsLog} />
    </div>
  );
}

export default ComActionsBtns;
