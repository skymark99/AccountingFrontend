import React, { useState, useEffect, useRef } from "react";
import BudgetPlannerSelector from "../Components/BudgetPlannerSelector";
import BudgetPlannerHeaderRight from "../Components/BudgetPlannerHeaderRight";
import TableHeaderTread from "../Components/TableHeaderTread";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import BudegetPlannerRow from "./BudegetPlannerRow";
import Loader from "../../../Components/Loader/Loader";
import { NoData } from "../../../assets/images";

const BudgetPlannerHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const { data, loading } = useSelector((state) => state.budget);
  const { curSelectedBranch } = useSelector((state) => state.budget);
  const [amounts, setAmounts] = useState([]);
  const [eventNames, setEventNames] = useState([]);
  const [currentAmounts, setCurrentAmounts] = useState([]);
  const [currentEventNames, setCurrentEventNames] = useState([]);
  const [currentTotal, setCurrentTotal] = useState("One Month");

  const updatationData = useRef({});

  useEffect(() => {
    if (data.length > 0) {
      const newAmounts = data.map((item) => item.amount);
      const newEventNames = data.map((item) => item.name);
      setAmounts(newAmounts);
      setEventNames(newEventNames);
    }
  }, [data]);

  const handleAmountChange = (index, e) => {
    const newAmounts = [...amounts];
    newAmounts[index] = e.target.value;
    updatationData.current.amount = e.target.value;
    setAmounts(newAmounts);
  };

  const handleEventNameChange = (index, e) => {
    const newEventNames = [...eventNames];
    newEventNames[index] = e.target.value;
    updatationData.current.eventName = e.target.value;
    setEventNames(newEventNames);
  };

  const saveChanges = () => {
    setIsEditing(false);
    setEditingIndex(null);
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
        <BudgetPlannerSelector disabled={isEditing} />
        <BudgetPlannerHeaderRight
          amount={amounts[editingIndex]}
          eventName={eventNames[editingIndex]}
          editingIndex={editingIndex}
          saveChanges={saveChanges}
          openBtn={isEditing}
          setOpenBtn={setIsEditing}
          handleDiscard={handleDiscard}
          selectedItem={data[editingIndex]}
          updatationData={updatationData.current}
          onSetCurrentTotal={setCurrentTotal}
          currentTotal={currentTotal}
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
                data.map((item, index) => (
                  <BudegetPlannerRow
                    key={item.id}
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
