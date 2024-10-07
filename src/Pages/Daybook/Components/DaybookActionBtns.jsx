import { useState } from "react";
import PrimaryBlueBtn from "../../../Components/Buttons/PrimaryBlueBtn";
import SecondaryBtn from "../../../Components/Buttons/SecondaryBtn";
import { Modal } from "antd";
import DaybookForm from "./DaybookData/DaybookForm";
import { useSelector } from "react-redux";
import DaybookEditForm from "./DaybookData/DaybookEditForm";
import CatagorySelector from "../../../Components/CatagorySelector/CatagorySelector";
import {
  setSelectedCatagory,
  setSelectedParticular,
} from "../../../Global-Variables/features/dayBookSlice/dayBookSlice";
import ParticularSelector from "../../../Components/CatagorySelector/ParticularSelector";
import LogModal from "../../../Features/LogModal/LogModal";
import BankToBankForm from "./DaybookData/BankToBankForm";

function DaybookActionBtns() {
  const { selected, selectedCatagory, selectedParticular } = useSelector(
    (state) => state.daybook
  );

  const [isNewEntri, setIsNewEntri] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isBankToBank, setIsBankToBank] = useState(false);

  const handleBankToBank = () => {
    setIsBankToBank((b) => !b);
  };

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
      <PrimaryBlueBtn
        onClick={handleBankToBank}
        style={{
          fontWeight: "700",
          padding: "1rem 3rem",
          fontFamily: "Roboto",
          width: "15rem",
        }}
      >
        Bank to Bank
      </PrimaryBlueBtn>

      <Modal open={isBankToBank} onCancel={handleBankToBank} footer={null}>
        <h4 className="form-head">Self Transaction</h4>
        <BankToBankForm />
      </Modal>

      <Modal open={isEdit} onCancel={handleIsEdit} footer={null} width={"50%"}>
        <h4 className="form-head">Edit The Transaction</h4>
        <DaybookEditForm />
      </Modal>

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

      <div className="daybook__catagory-selectors">
        <CatagorySelector
          selectedCat={selectedCatagory}
          setSelectedCat={setSelectedCatagory}
        />
        <ParticularSelector
          selectedCat={selectedCatagory}
          selectedParticular={selectedParticular}
          setSelectedParticular={setSelectedParticular}
        />
      </div>
    </div>
  );
}

export default DaybookActionBtns;
