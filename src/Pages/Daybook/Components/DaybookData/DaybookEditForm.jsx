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
  Bank,
  DateSel,
  Purpose,
  Radio,
  Remark,
} from "../../../../Components/Form/Components/Purpose";
import Branches from "../../../../Components/Form/Branches";
import { toggleBranch } from "../../../../Components/Form/HelperFunctions";

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
            <Purpose register={register} errors={errors} />
            <Remark register={register} errors={errors} />
          </div>

          <div className="form-row">
            <Bank register={register} errors={errors} />
            <Radio register={register} errors={errors} edit={true} />
            <DateSel register={register} errors={errors} />
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
                    onClick={() =>
                      toggleBranch(
                        branch,
                        setSelectedBranches,
                        clearErrors,
                        selectedBranches.length
                      )
                    }
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
                    <Branches
                      key={branch}
                      branch={branch}
                      register={register}
                      errors={errors}
                      defaultValue={
                        values?.branches?.find((b) => branch == b?.branchName)
                          ?.amount
                      }
                    />
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
