import { Modal } from "antd";
import NewProperty from "../BudgetPlannerHeader/NewProperty";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import toast from "react-hot-toast";
import { budgetPlannerUpdateEvent } from "../../../Services/AxiosService";
import { useDispatch, useSelector } from "react-redux";
import {
  getCalcBudget,
  refreshBudgetPlanner,
} from "../../../Global-Variables/features/BudgetPlannerSlice/budgetPlannerSlice";

function BudgetPlannerHeaderRight({
  editingIndex,
  saveChanges,
  openBtn,
  setOpenBtn,
  handleDiscard,
  selectedItem,
  updatationData,
  onSetCurrentTotal,
  currentTotal,
}) {
  const [open, setOpen] = useState(false);
  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);
  const dispatch = useDispatch();

  const handleSave = async () => {
    if (editingIndex !== null) {
      try {
        await budgetPlannerUpdateEvent(selectedItem?._id, updatationData);
        dispatch(refreshBudgetPlanner());
        dispatch(getCalcBudget());
        saveChanges();
        setOpenBtn(!openBtn);
        toast.success("Data updated successfully");
      } catch (error) {
        console.error("Error updating data", error);
      }
    }
  };

  return (
    <>
      <div className="bp-sub-btn-container">
        {openBtn && (
          <>
            <button onClick={handleDiscard} className="btn discard-btn">
              Discard
            </button>
            <button onClick={handleSave} className="btn save-btn">
              Update
            </button>
          </>
        )}
        <div className="bp-dropdown-container">
          <div className="bp-select-wrapper">
            <select
              className="bp-select"
              value={currentTotal}
              onChange={(e) => onSetCurrentTotal(e.target.value)}
            >
              <option value="One month">One month</option>
              <option value="Three month">Three month</option>
              <option value="Six month">Six month</option>
            </select>
            <IoIosArrowDown className="bp-select-icon" />
          </div>
        </div>
        {/* 
        <button className="bp-btn">Calculate</button> */}
        <button onClick={showModal} className="bp-btn bp-btn-property">
          New Property
        </button>
      </div>
      <Modal open={open} onCancel={handleCancel} footer={null}>
        <h4 className="form-head">Budget Planner</h4>
        <NewProperty />
      </Modal>
    </>
  );
}

export default BudgetPlannerHeaderRight;
