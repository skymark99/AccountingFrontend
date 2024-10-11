/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { edit_liability } from "../../../Services/AxiosService";
import Catagory from "../../../Components/CatagorySelector/Catagory";
import {
  fetchTotal,
  resetLiability,
} from "../../../Global-Variables/features/liabilitySlice/liabilitySlice";
import useFormReset from "../../../Hooks/useFormReset";
import { addCurrentTimeToDate } from "../../../Services/dateFormatter";
import {
  toggleBranch,
  validateBranches,
} from "../../../Components/Form/HelperFunctions";
import {
  DateSel,
  Purpose,
  Remark,
  StatusSel,
} from "../../../Components/Form/Components/Purpose";
import { branches } from "../../../data/generalDatas";
import BranchesSelector from "../../../Components/Buttons/BranchesSelector";
import Branches from "../../../Components/Form/Branches";
import { fetchBalanceSheet } from "../../../Global-Variables/features/BalancesheetSlice/balanceSheetSlice";

const LiabilityEditForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { laibilitySelectedItems } = useSelector((state) => state.liability);
  const [values] = laibilitySelectedItems;
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
    const [selectedCat] = selectedCatFinder();

    setDefaultCat(selectedCat?.name || "");
    setDefaultPar(values?.particular?.name || "");
  }, [
    selectedCat,
    values?.particular._id,
    values?.particular?.name,
    catagories,
    values?.catagory,
  ]);
  // values is the current object that is selected
  // Initialize the useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setError,
  } = useForm({
    defaultValues: {
      date: values?.date
        ? new Date(values.date).toISOString().split("T")[0]
        : "",
      remark: values?.remark || "",
      status: values?.status || "",
      purpose: values?.purpose || "",
    },
  });

  useFormReset(reset, values);

  const filterBranchName = values?.branches?.map(
    (branch) => branch?.branchName
  );
  const [selectedBranches, setSelectedBranches] = useState(
    filterBranchName || []
  );

  useEffect(() => {
    setSelectedBranches(values?.branches?.map((branch) => branch.branchName));
  }, [values?.branches]);

  const handleCreateTransaction = async (formData) => {
    setLoading(true);

    try {
      await edit_liability(values._id, formData);
      dispatch(resetLiability());
      dispatch(fetchTotal());
      dispatch(fetchBalanceSheet());

      toast.success("Liability updated✅", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "white",
          color: "green",
          fontSize: "1.5rem",
        },
      });
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

  // Submit handler
  const onSubmit = async (data) => {
    // Building the branches array
    if (!validateBranches(selectedBranches.length, setError)) return;

    const branches = selectedBranches?.map((branch) => ({
      branchName: branch,
      amount: Number(data[`amount_${branch}`]),
    }));

    if (!catagory) {
      toast.error("Select a Catagory");
      return;
    }
    if (!particular) {
      toast.error("Select a Particular");
      return;
    }

    const curCat = catagories.find((cat) => cat._id === catagory);
    const curPart = curCat?.particulars.find(
      (part) => part.name === particular
    );

    const formData = {
      date: addCurrentTimeToDate(data.date),
      purpose: data.purpose,
      amount: branches.reduce((acc, branch) => acc + branch.amount, 0),
      remark: data.remark,
      branches,
      status: data.status,
      particular: curPart._id,
      catagory,
      type: "liability",
    };

    await handleCreateTransaction(formData);
  };

  return (
    <div className="daybook-form-container">
      <form className="daybook-form" onSubmit={handleSubmit(onSubmit)}>
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
            <DateSel register={register} errors={errors} />
            <StatusSel register={register} errors={errors} />
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

export default LiabilityEditForm;
