/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BranchesSelector from "../../../../Components/Buttons/BranchesSelector";
import { resetDayBook } from "../../../../Services/useDayBookActions";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { edit_daybook } from "../../../../Services/AxiosService";
import Catagory from "../../../../Components/CatagorySelector/Catagory";
import particularFinder from "../../../../Services/helperFunctions";
import useFormReset from "../../../../Hooks/useFormReset";
import { addCurrentTimeToDate } from "../../../../Services/dateFormatter";
import { fetchBalanceSheet } from "../../../../Global-Variables/features/BalancesheetSlice/balanceSheetSlice";
import {
  fetchBranchChart,
  fetchBranchTransaction,
  fetchBranchYearlyPnl,
} from "../../../../Global-Variables/features/BranchWisePnlSlice/branchWIsePnlSlice";
import { fetchBankDetails } from "../../../../Global-Variables/fetch/details";
import { fetchDashboardData } from "../../../../Global-Variables/features/dashBoardSlice/dashBoardSlice";
import {
  addTimer,
  getInitialTime,
} from "../../../../Components/Coundown/countdownActions";
import { setTime } from "../../../../Global-Variables/features/auth/authSlice";

const DaybookEditForm = () => {
  const { selected } = useSelector((state) => state.daybook);
  const [values] = selected;
  const { catagories } = useSelector((state) => state.catagories);

  const selectedCatFinder = () => {
    const selectedCat = catagories?.find(
      (cat) => values?.catagory === cat?._id
    );
    return [selectedCat];
  };
  const [selectedCat] = selectedCatFinder();

  const [catagory, setCatagory] = useState("Select Catagory");

  const [particular, setParticular] = useState(
    values?.particular?.name || "Select Particular"
  );

  const [defaultCat, setDefaultCat] = useState(selectedCat?.name || "");
  const [defaultPar, setDefaultPar] = useState(values?.particular?.name || "");

  useEffect(() => {
    if (selected.length > 1) {
      setDefaultCat("Select Catagory");
      setDefaultPar("Select Particular");
    }

    const [selectedCat] = selectedCatFinder();

    setDefaultCat(selectedCat?.name || "");
    setDefaultPar(values?.particular?.name || "");
  }, [
    selectedCat,
    values?.particular._id,
    values?.particular?.name,
    catagories,
    values?.catagory,
    selected.length,
  ]);
  // values is the current object that is selected

  const dispatch = useDispatch();

  const { branches } = useSelector((state) => state.daybook);

  const filterBranchName = values?.branches?.map(
    (branch) => branch?.branchName
  );
  const [selectedBranches, setSelectedBranches] = useState(
    filterBranchName || []
  );

  useEffect(() => {
    setSelectedBranches(values?.branches?.map((branch) => branch.branchName));
  }, [values?.branches]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      transaction: values?.name || "",
      date: values?.date
        ? new Date(values.date).toISOString().split("T")[0]
        : "",
      remark: values?.remark || "",
      bank: values?.bank || "",
      type: values?.type || "",
      purpose: values?.purpose || "",
    },
  });

  // Update the form with new values when `values` changes
  useFormReset(reset, values);

  const toggleBranch = (branch) => {
    setSelectedBranches((prev) =>
      prev?.includes(branch)
        ? prev?.filter((b) => b !== branch)
        : prev?.concat(branch)
    );

    // Clear errors if there are selected branches
    if (selectedBranches?.length > 1) {
      clearErrors("branches");
    }
  };
  const validateBranches = () => {
    if (selectedBranches?.length === 0) {
      setError("branches", {
        type: "manual",
        message: "At least one branch must be selected",
      });
      return false;
    }
    return true;
  };

  const [loading, setLoading] = useState(false);

  const handleCreateTransaction = async (formData) => {
    setLoading(true);
    try {
      await edit_daybook(values._id, formData);
      resetDayBook(dispatch);
      dispatch(fetchBalanceSheet());
      dispatch(fetchDashboardData());
      dispatch(fetchBranchTransaction());
      dispatch(fetchBranchChart());
      dispatch(fetchBranchYearlyPnl());
      dispatch(fetchBankDetails());

      toast.success("Successfully", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "white",
          color: "green",
          fontSize: "1.5rem",
        },
      });
    } catch (err) {
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
      addTimer();
      dispatch(setTime(getInitialTime()));
    }
  };

  const handleDaybookSubmit = async (data) => {
    if (!validateBranches()) return;

    // Building the branches array
    const branches = selectedBranches?.map((branch) => ({
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

    await handleCreateTransaction(formData);
  };

  const handleReset = () => {
    reset();
    setSelectedBranches([]);
  };

  return (
    <div className="daybook-form-container">
      <form
        className="daybook-form"
        onSubmit={handleSubmit(handleDaybookSubmit)}
      >
        <Catagory
          setCatagory={setCatagory}
          setParticular={setParticular}
          defaultValue={defaultCat}
          defaultParticular={defaultPar}
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
                <div className="type-option-container">
                  <label className="type-option">
                    <input
                      disabled={true}
                      type="radio"
                      value="Debit"
                      {...register("type")}
                      onClick={(e) => e.stopPropagation()} // Prevent default submission behavior
                    />
                    Debited
                  </label>
                </div>
                <label className="type-option">
                  <input
                    disabled={true}
                    type="radio"
                    value="Credit"
                    {...register("type")}
                    onClick={(e) => e.stopPropagation()} // Prevent default submission behavior
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
                defaultValue={
                  values?.date
                    ? new Date(values.date).toISOString().split("T")[0]
                    : ""
                }
                {...register("date")}
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
              <label htmlFor="Branches">Branches</label>
              <div className="branch-group">
                {branches?.slice(1).map((branch) => (
                  <BranchesSelector
                    key={branch}
                    isActive={selectedBranches?.includes(branch)}
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
            {selectedBranches?.length > 0 && (
              <>
                <h5>Selected Branches and Amounts</h5>
                <div className="grid-container">
                  {selectedBranches.map((branch) => (
                    <div key={branch} className="grid-item">
                      <label htmlFor={`amount_${branch}`}>{branch}</label>
                      <div className="amount-field ">
                        <input
                          type="number"
                          defaultValue={
                            values?.branches?.find(
                              (b) => branch == b?.branchName
                            )?.amount
                          }
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

export default DaybookEditForm;
