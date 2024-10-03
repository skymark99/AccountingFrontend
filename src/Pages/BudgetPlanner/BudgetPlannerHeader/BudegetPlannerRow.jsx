import React, { useEffect, useState } from "react";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import DeleteEvent from "../Components/DeleteEvent";

// const formatAmount = (amount) => {
//   if (amount >= 10000000) {
//     return `${(amount / 10000000).toFixed(2)} Cr`;
//   } else if (amount >= 100000) {
//     return `${(amount / 100000).toFixed(2)} L`;
//   }
//   return amount?.toLocaleString("en-IN");
// };

const BudgetPlannerRow = ({
  item,
  index,
  isEditing,
  editingIndex,
  eventNames,
  amounts,
  handleEventNameChange,
  handleAmountChange,
  handleEdit,
  currentTotal,
}) => {
  const displayDownIcon = () => <IoIosArrowRoundDown className="down-icon" />;
  const displayUpIcon = () => <IoIosArrowRoundUp className="up-icon" />;
  const [totalAmount, setTotalAmount] = useState(item.amount);

  useEffect(() => {
    if (currentTotal === "One month") {
      setTotalAmount(item.amount);
    } else if (currentTotal === "Three month") {
      setTotalAmount(item.amount * 3);
    } else if (currentTotal === "Six month") {
      setTotalAmount(item.amount * 6);
    }
  }, [item.amount, currentTotal]);

  return (
    <tr key={item.id} className="budgetplanner-content-row">
      <td>
        {isEditing && editingIndex === index ? (
          <input
            type="text"
            value={eventNames[index]}
            onChange={(e) => handleEventNameChange(index, e)}
            placeholder="Event Name"
            className="editable-input"
            maxLength={20}
          />
        ) : (
          <span
            className="budget-td-properties"
            onClick={() => handleEdit(index)}
          >
            {eventNames[index]}
          </span>
        )}
      </td>
      <td className="budget-td-branch">{item.branchName}</td>
      <td className="budget-td-amount">
        {isEditing && editingIndex === index ? (
          <div className="amount-edit-container">
            <input
              type="number"
              value={amounts[index]}
              onChange={(e) => handleAmountChange(index, e)}
              placeholder="Amount"
              className="editable-input"
              maxLength={10}
            />
          </div>
        ) : (
          <span onClick={() => handleEdit(index)}>{amounts[index]}</span>
        )}
      </td>
      <td className="budget-td-change">
        {item.percentageDifference.startsWith("-")
          ? displayDownIcon()
          : displayUpIcon()}
        {item.percentageDifference}
      </td>
      <td className="budget-td-total">{totalAmount}</td>
      <td className="delete-action">
        <DeleteEvent id={item._id} eventName={eventNames[index]} />
      </td>
    </tr>
  );
};

export default BudgetPlannerRow;
