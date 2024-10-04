import React, { useState } from "react";
import toast from "react-hot-toast";
import { budgetPlannerAddEvent } from "../../../Services/AxiosService";
import {
  getCalcBudget,
  refreshBudgetPlanner,
} from "../../../Global-Variables/features/BudgetPlannerSlice/budgetPlannerSlice";
import { useDispatch } from "react-redux";
import { getInitialTime } from "../../../Components/Coundown/countdownActions";
import { setTime } from "../../../Global-Variables/features/auth/authSlice";

const branches = [
  "Kozhikode",
  "Kochi",
  "Manjeri",
  "Kottayam",
  "Kannur",
  "Directors",
  "Corporate",
];

const NewProperty = () => {
  const [amount, setAmount] = useState("");
  const [newProperty, setNewProperty] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedBranch && amount && newProperty) {
      // nested event objects created by the request of arjun
      const event = {
        name: newProperty,
        amount: amount,
        branchName: selectedBranch,
      };

      try {
        setLoading(true);
        await budgetPlannerAddEvent(event);
        setNewProperty("");
        setAmount("");
        setSelectedBranch("");
        dispatch(refreshBudgetPlanner());
        await dispatch(getCalcBudget());
        toast.success("Data added successfully");
      } catch (error) {
        console.log(error, "error");
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
        dispatch(setTime(getInitialTime()));
      }
    } else {
      toast.error("Please fill in all fields.", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "white !important",
          color: "red !important",
          fontSize: "1.5rem !imortant",
          zIndex: "1000 !important",
        },
      });
    }
  };

  return (
    <div className="property-form">
      <form className="property-form-inner" onSubmit={handleSubmit}>
        <div className="budget-form-group property-name-group">
          <label className="form-label">New Property :</label>
          <input
            className="form-input"
            type="text"
            id="newProperty"
            value={newProperty}
            onChange={(e) => setNewProperty(e.target.value)}
            required
          />
        </div>

        <div className="property-fields">
          <div className="budget-form-group">
            <label className="form-label" htmlFor="amount">
              Amount :
            </label>
            <input
              className="form-input"
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="budget-form-group">
            <label className="form-label" htmlFor="branch">
              Branches
            </label>
            <select
              className="form-select"
              id="branch"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              required
            >
              <option value="">Select a branch</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="budget-form-group">
          <button
            className="submit-button"
            type="submit"
            disabled={loading}
            style={{ opacity: loading ? 0.5 : 1 }}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProperty;
