/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { edit_liability } from "../../../Services/AxiosService";
import Catagory from "../../../Components/CatagorySelector/Catagory";
import { useDispatch, useSelector } from "react-redux";
import { resetOutStanding } from "../../../Global-Variables/features/liabilitySlice/outstandingSlice";
import particularFinder from "../../../Services/helperFunctions";
import useFormReset from "../../../Hooks/useFormReset";
import { addCurrentTimeToDate } from "../../../Services/dateFormatter";
import { fetchTotal } from "../../../Global-Variables/features/liabilitySlice/liabilitySlice";
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
import Branches from "../../../Components/Form/Branches";
import { branches } from "../../../data/generalDatas";
import BranchesSelector from "../../../Components/Buttons/BranchesSelector";

const OutstandingEditForm = () => {
  const { outstandingSelectedItems: selected } = useSelector(
    (state) => state.outstanding
  );
  const [values] = selected;
  const { catagories } = useSelector((state) => state.catagories);

  const selectedCatFinder = () => {
    const selectedCat = catagories?.find(
      (cat) => values?.catagory === cat?._id
    );
    return [selectedCat];
  };
  const [selectedCat] = selectedCatFinder();

  const { statusOptions } = useSelector((state) => state.outstanding);
  const [loading, setLoading] = useState(false);
  const [catagory, setCatagory] = useState("Select Catagory");
  const [particular, setParticular] = useState(
    values?.particular?.name || "Select Particular"
  );

  const [defaultCat, setDefaultCat] = useState(selectedCat?.name || "");
  const [defaultPar, setDefaultPar] = useState(values?.particular?.name || "");
  const dispatch = useDispatch();

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
    selected.length,
  ]);

  // Initialize the useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      date: values?.date
        ? new Date(values?.date).toISOString().split("T")[0]
        : "",
      remark: values?.remark,
      status: values?.status,
      purpose: values?.purpose,
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
      //for both liability and outstanding , using same axios service
      await edit_liability(values._id, formData);
      dispatch(resetOutStanding());
      dispatch(fetchTotal());

      reset();
      toast.success("Updated outstanding ✅", {
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
  const handleReminderSubmit = async (data) => {
    if (!validateBranches()) return;

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
    const curPart = particularFinder(catagories, particular, catagory);
    const formData = {
      particular: curPart._id,
      catagory,
      purpose: data.purpose,
      amount: branches.reduce((acc, branch) => acc + branch.amount, 0),
      remark: data.remark,
      status: data.status,
      branches,
      date: addCurrentTimeToDate(data.date),
      type: "outstanding",
    };
    await handleCreateTransaction(formData);
  };

  return (
    <div className="daybook-form-container">
      <form
        className="daybook-form"
        onSubmit={handleSubmit(handleReminderSubmit)}
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

export default OutstandingEditForm;
