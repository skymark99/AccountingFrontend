import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { create_liability, create_log } from "../../../Services/AxiosService";
import {
  addCurrentTimeToDate,
  combineDateWithCurrentTime,
  today,
} from "../../../Services/dateFormatter";
import Catagory from "../../../Components/CatagorySelector/Catagory";
import {
  fetchTotal,
  resetLiability,
} from "../../../Global-Variables/features/liabilitySlice/liabilitySlice";
import particularFinder from "../../../Services/helperFunctions";
import { validateBranches } from "../../../Components/Form/HelperFunctions";
import {
  BranchComponent,
  DateSel,
  Purpose,
  Remark,
  StatusSel,
} from "../../../Components/Form/Components/Purpose";
import { fetchBalanceSheet } from "../../../Global-Variables/features/BalancesheetSlice/balanceSheetSlice";

const LiabilityForm = () => {
  const [loading, setLoading] = useState(false);
  const [catagory, setCatagory] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [particular, setParticular] = useState("");
  const dispatch = useDispatch();
  const { catagories } = useSelector((state) => state.catagories);
  const [selectedBranches, setSelectedBranches] = useState([]);
  // Initialize the useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      date: today(),
      remark: "",
      status: "",
      purpose: "",
    },
  });

  // Submit handler
  const onSubmit = async (data) => {
    if (!validateBranches(selectedBranches.length, setError)) return;

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

    const formData = {
      purpose: data.purpose,
      amount: branches.reduce(
        (total, branch) => total + parseFloat(branch.amount),
        0
      ),
      date: addCurrentTimeToDate(data.date),
      remark: data.remark,
      branches,
      status: data.status,
      type: "liability",
      catagory: catagory,
      particular: curPart._id,
    };
    await handleCreateTransaction(formData);
  };

  const handleCreateTransaction = async (formData) => {
    setLoading(true);

    try {
      await create_liability(formData);
      reset();
      dispatch(resetLiability());
      dispatch(fetchBalanceSheet());

      toast.success("New liability added✅", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "white",
          color: "green",
          fontSize: "1.5rem",
        },
      });
      await create_log(
        `${combineDateWithCurrentTime(new Date())} ${user.name} created a ${
          formData.type
        } of ${formData.amount} in ${
          formData.branch
        } branch for ${particular} with purpose of ${formData.purpose}`,
        user._id
      );
      dispatch(fetchTotal());
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

  const handleReset = () => {
    reset();
    setSelectedBranches([]);
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
            <DateSel register={register} errors={errors} />
            <StatusSel register={register} errors={errors} />
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
            onClick={() => reset()}
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

export default LiabilityForm;
