import React, { useState, useEffect, useRef } from "react";
import BudgetPlannerHeaderRight from "../Components/BudgetPlannerHeaderRight";
import TableHeaderTread from "../Components/TableHeaderTread";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import BudegetPlannerRow from "./BudegetPlannerRow";
import Loader from "../../../Components/Loader/Loader";
import { NoData } from "../../../assets/images";
import PrimaryBlueBtn from "../../../Components/Buttons/PrimaryBlueBtn";

const BudgetPlannerHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const { data, loading, branchData } = useSelector((state) => state.budget);
  const { curSelectedBranch } = useSelector((state) => state.budget);
  const [amounts, setAmounts] = useState([]);
  const [eventNames, setEventNames] = useState([]);
  const [currentAmounts, setCurrentAmounts] = useState([]);
  const [currentEventNames, setCurrentEventNames] = useState([]);

  const [currentTotal, setCurrentTotal] = useState("One month");

  const [total, setTotal] = useState(0);
  const updatationData = useRef({});

  useEffect(() => {
    if (branchData.length > 0) {
      const newAmounts = branchData.map((item) => item.amount);
      const newEventNames = branchData.map((item) => item.name);
      setTotal(newAmounts.reduce((acc, curr) => acc + curr, 0));
      setAmounts(newAmounts);
      setEventNames(newEventNames);
    } else {
      setTotal(0);
    }
  }, [branchData]);

  const handleTotalChange = (e) => {
    setCurrentTotal(e.target.value);
  };

  useEffect(() => {
    const total = branchData.reduce((acc, val) => acc + val.amount, 0);
    if (currentTotal === "One month") {
      setTotal(total * 1);
    } else if (currentTotal === "Three month") {
      setTotal(total * 3);
    } else if (currentTotal === "Six month") {
      setTotal(total * 6);
    }
  }, [currentTotal, branchData]);

  const handleAmountChange = (index, e) => {
    const newAmounts = [...amounts];
    newAmounts[index] = e.target.value;
    updatationData.current.amount = e.target.value;
    setAmounts(newAmounts);
  };

  const handleEventNameChange = (index, e) => {
    const newEventNames = [...eventNames];
    newEventNames[index] = e.target.value;
    updatationData.current.name = e.target.value;
    setEventNames(newEventNames);
  };

  const saveChanges = () => {
    setIsEditing(false);
    setEditingIndex(null);
    setAmounts([]);
    setEventNames([]);
    // dispatch(setCurSelectedBranch("All Branch"));
  };

  const handleEdit = (index) => {
    if (curSelectedBranch === "All Branch") {
      toast.error("Please select a branch to edit");
      return;
    }
    setIsEditing(true);
    setEditingIndex(index);
    setCurrentEventNames(eventNames.slice());
    setCurrentAmounts(amounts.slice());
  };

  const handleDiscard = () => {
    setIsEditing(false);
    setEditingIndex(null);
    setEventNames(currentEventNames);
    setAmounts(currentAmounts);
  };

  return (
    <div className="bp-table-card">
      <div className="bp-btn-container">
        <div>
          <PrimaryBlueBtn
            style={{
              fontSize: "1.6rem",
              fontWeight: "600",
              padding: "1rem 3rem",
            }}
          >
            ₹ {total?.toFixed(2)}
          </PrimaryBlueBtn>
        </div>
        <BudgetPlannerHeaderRight
          isEditing={isEditing}
          amount={amounts[editingIndex]}
          eventName={eventNames[editingIndex]}
          editingIndex={editingIndex}
          saveChanges={saveChanges}
          openBtn={isEditing}
          setOpenBtn={setIsEditing}
          handleDiscard={handleDiscard}
          selectedItem={branchData[editingIndex]}
          updatationData={updatationData.current}
          onSetCurrentTotal={handleTotalChange}
          currentTotal={currentTotal}
          setTotal={setTotal}
        />
      </div>

      <div className="bp-table-container">
        <table>
          <TableHeaderTread />
        </table>
        <div className="t-body-container">
          <table>
            <tbody className="scrollable-tbody">
              {loading ? (
                <tr>
                  <td colSpan="100%">
                    <Loader />
                  </td>
                </tr>
              ) : data.length <= 0 ? (
                <tr>
                  <td colSpan="100%">
                    <div className="no-data-6pack">
                      <img src={NoData} alt="no-data" />
                      <span className="text">No data available</span>
                    </div>
                  </td>
                </tr>
              ) : (
                branchData.map((item, index) => (
                  <BudegetPlannerRow
                    key={item?._id}
                    item={item}
                    index={index}
                    isEditing={isEditing}
                    editingIndex={editingIndex}
                    eventNames={eventNames}
                    amounts={amounts}
                    handleEventNameChange={handleEventNameChange}
                    handleAmountChange={handleAmountChange}
                    handleEdit={handleEdit}
                    currentTotal={currentTotal}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlannerHeader;
