import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BranchesSelector from "../../../../Components/Buttons/BranchesSelector";
import { resetDayBook } from "../../../../Services/useDayBookActions";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { create_daybook, create_log } from "../../../../Services/AxiosService";
import Catagory from "../../../../Components/CatagorySelector/Catagory";
import {
  addCurrentTimeToDate,
  combineDateWithCurrentTime,
  today,
} from "../../../../Services/dateFormatter";
import particularFinder from "../../../../Services/helperFunctions";
import { fetchBalanceSheet } from "../../../../Global-Variables/features/BalancesheetSlice/balanceSheetSlice";

import {
  fetchBranchChart,
  fetchBranchTransaction,
  fetchBranchYearlyPnl,
} from "../../../../Global-Variables/features/BranchWisePnlSlice/branchWIsePnlSlice";
import { fetchBankDetails } from "../../../../Global-Variables/fetch/details";
import { fetchDashboardData } from "../../../../Global-Variables/features/dashBoardSlice/dashBoardSlice";
import { getInitialTime } from "../../../../Components/Coundown/countdownActions";
import { setTime } from "../../../../Global-Variables/features/auth/authSlice";

const DaybookForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { catagories } = useSelector((state) => state.catagories);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [catagory, setCatagory] = useState("");
  const [particular, setParticular] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      transaction: "",
      date: today(),
      remark: "",
      bank: "",
      type: "",
      purpose: "",
    },
  });
  const b = combineDateWithCurrentTime(new Date());
  const toggleBranch = (branch) => {
    setSelectedBranches((prev) =>
      prev.includes(branch)
        ? prev.filter((b) => b !== branch)
        : [...prev, branch]
    );

    if (selectedBranches.length === 0) {
      clearErrors("branches");
    }
  };

  const validateBranches = () => {
    if (selectedBranches.length === 0) {
      setError("branches", {
        type: "manual",
        message: "At least one branch must be selected",
      });
      return false;
    }
    return true;
  };

  const onSubmit = async (data) => {
    if (!validateBranches()) return;

    // Building the branches array
    const branches = selectedBranches.map((branch) => ({
      branchName: branch,
      amount: data[`amount_${branch}`],
    }));

    if (!catagory) {
      toast.error("Select a Catagory");
      return;
    }
    if (!particular) {
      toast.error("Select a Particular");
      return;
    }

    const curPart = particularFinder(catagories, particular, catagory);
    // Constructing the final data object
    const formData = {
      purpose: data.purpose,
      amount: branches.reduce(
        (total, branch) => total + parseFloat(branch.amount),
        0
      ),
      date: addCurrentTimeToDate(data.date),
      remark: data.remark,
      branches: branches,
      bank: data.bank,
      type: data.type,
      catagory: catagory,
      particular: curPart._id,
    };

    // Here you would typically send the formData to your backend using an API call.
    await handleCreateTransaction(formData);
  };

  const handleReset = () => {
    reset();
    setSelectedBranches([]);
  };

  const handleCreateTransaction = async (formData) => {
    setLoading(true);
    try {
      await create_daybook(formData);
      await create_log(
        `${combineDateWithCurrentTime(new Date())} ${user.name} created a ${
          formData.type
        } transaction of ${formData.amount} in ${
          formData.bank
        } bank for ${particular} with purpose of ${formData.purpose}`,
        user._id
      );
      reset();
      dispatch(fetchBalanceSheet());
      dispatch(fetchBranchTransaction());
      dispatch(fetchDashboardData());
      dispatch(fetchBranchChart());
      dispatch(fetchBranchYearlyPnl());
      dispatch(fetchBankDetails());
      setSelectedBranches([]);
      resetDayBook(dispatch);
      toast.success("Transaction created successfully");
    } catch (err) {
      // Extract the error message, defaulting to a generic one if necessary
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred. Please try again.";

      const formattedMessage = `${errorMessage}!`;

      // Show a toast notification with the formatted error message
      toast.error(formattedMessage, {
        duration: 3000,
        position: "top-center",
        style: {
          background: "white",
          color: "red",
          fontSize: "1.5rem",
        },
      });
    } finally {
      setLoading(false);
      dispatch(setTime(getInitialTime()));
    }
  };

  return (
    <div className="daybook-form-container">
      <form className="daybook-form" onSubmit={handleSubmit(onSubmit)}>
        <Catagory
          setCatagory={setCatagory}
          setParticular={setParticular}
          particular={particular}
        />
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="purpose">Purpose</label>
              <input
                type="text"
                id="purpose"
                {...register("purpose", {
                  required: "Purpose is required",
                })}
              />
              {errors.purpose && (
                <span className="form-group-error">
                  {errors.purpose.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="remark">Remark</label>
              <textarea
                id="remark"
                {...register("remark", { required: "Remark is required" })}
              ></textarea>
              {errors.remark && (
                <span className="form-group-error">
                  {errors.remark.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bank">Bank</label>
              <select
                id="bank"
                {...register("bank", { required: "Bank is required" })}
              >
                <option value="">Select Bank</option>
                <option value="HDFC">HDFC</option>
                <option value="RAK">RAK</option>
                <option value="ICICI">ICICI</option>
                <option value="RBL">RBL</option>
                <option value="CASH">CASH</option>
              </select>
              {errors.bank && (
                <span className="form-group-error">{errors.bank.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="Type">Type</label>
              <div className="type-options">
                <label className="type-option">
                  <input
                    type="radio"
                    value="Debit"
                    {...register("type", {
                      required: "Select a type",
                    })}
                  />
                  Debited
                </label>
                <label className="type-option">
                  <input
                    type="radio"
                    value="Credit"
                    {...register("type", {
                      required: "Select a type",
                    })}
                  />
                  Credited
                </label>
              </div>
              {errors.type && (
                <span className="form-group-error">{errors.type.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                max={new Date().toISOString().split("T")[0]}
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <span className="form-group-error">{errors.date.message}</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <div htmlFor="Branches" className="branch-label">
                Branches
              </div>
              <div className="branch-group">
                {[
                  "Kochi",
                  "Kozhikode",
                  "Kottayam",
                  "Manjeri",
                  "Kannur",
                  "Corporate",
                  "Directors",
                ].map((branch) => (
                  <BranchesSelector
                    key={branch}
                    isActive={selectedBranches.includes(branch)}
                    onClick={() => toggleBranch(branch)}
                  >
                    {branch}
                  </BranchesSelector>
                ))}
              </div>
            </div>
          </div>
          {errors.branches && (
            <span className="form-group-error">{errors.branches.message}</span>
          )}
          <div className="form-section">
            {selectedBranches.length > 0 && (
              <>
                <h5>Selected Branches and Amounts</h5>
                <div className="grid-container">
                  {selectedBranches.map((branch) => (
                    <div key={branch} className="grid-item">
                      <label htmlFor={`amount_${branch}`}>{branch}</label>
                      <div className="amount-field ">
                        <input
                          type="number"
                          id={`amount_${branch}`}
                          {...register(`amount_${branch}`, {
                            required: "Amount is required",
                            min: {
                              value: 0,
                              message: "Amount must be positive",
                            },
                          })}
                        />
                      </div>
                      {errors[`amount_${branch}`] && (
                        <span className="form-group-error">
                          {errors[`amount_${branch}`].message}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="form-btn-group form-submit-btns">
          <button
            type="button"
            className="btn delete-btn"
            onClick={handleReset}
          >
            Clear
          </button>
          <button
            type="submit"
            style={loading ? { opacity: 0.5 } : {}}
            className={`btn primary-blue-btn form-submit`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DaybookForm;
