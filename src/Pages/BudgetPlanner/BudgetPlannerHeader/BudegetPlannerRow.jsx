import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import TableIcons from "../Components/TableIcons";
import DeleteEvent from "../Components/DeleteEvent";

const formatAmount = (amount) => {
  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `${(amount / 100000).toFixed(2)} L`;
  }
  return amount?.toLocaleString("en-IN");
};

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
    <tr key={item.id}>
      <td className="bp-td-tag">
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
          <span onClick={() => handleEdit(index)}>
            <TableIcons name={eventNames[index]} index={index} />
          </span>
        )}
      </td>
      <td className="bp-td-branch">{item.branchName}</td>
      <td>
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
      <td style={{ flex: "1" }}>
        <span className="bp-change">
          {item.percentageDifference.startsWith("-")
            ? displayDownIcon()
            : displayUpIcon()}
          {item.percentageDifference}
        </span>
      </td>
      <td className="budget-total">{formatAmount(totalAmount)}</td>
      <td className="delete-action">
        <DeleteEvent id={item._id} eventName={eventNames[index]} />
      </td>
    </tr>
  );
};

export default BudgetPlannerRow;
