import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { validateBranches } from "../../../../Components/Form/HelperFunctions";
import {
  Bank,
  BranchComponent,
  DateSel,
  Purpose,
  Radio,
  Remark,
} from "../../../../Components/Form/Components/Purpose";

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

  const onSubmit = async (data) => {
    if (!validateBranches(selectedBranches.length, setError)) return;

    // Building the branches array
    const branches = selectedBranches.map((branch) => ({
      branchName: branch.trim(),
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
      const res = await create_daybook(formData);
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
            <Purpose register={register} errors={errors} />
            <Remark register={register} errors={errors} />
          </div>

          <div className="form-row">
            <Bank register={register} errors={errors} />
            <Radio register={register} errors={errors} />
            <DateSel register={register} errors={errors} />
          </div>
        </div>
        <BranchComponent
          setSelectedBranches={setSelectedBranches}
          clearErrors={clearErrors}
          selectedBranches={selectedBranches}
          errors={errors}
          register={register}
        />

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
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DaybookForm;
