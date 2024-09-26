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
  } = useForm({
    defaultValues: {
      date: values?.date
        ? new Date(values.date).toISOString().split("T")[0]
        : "",
      amount: values?.amount || 0,
      remark: values?.remark || "",
      branch: values?.branch || "",
      status: values?.status || "",
      purpose: values?.purpose || "",
    },
  });

  useFormReset(reset, values);

  const handleCreateTransaction = async (formData) => {
    setLoading(true);

    try {
      await edit_liability(values._id, formData);
      dispatch(resetLiability());
      toast.success("Liability updated✅", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "white",
          color: "green",
          fontSize: "1.5rem",
        },
      });
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

  // Submit handler
  const handleReminderSubmit = async (data) => {
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
      name: data.particulars,
      date: addCurrentTimeToDate(data.date),
      purpose: data.purpose,
      amount: data.amount,
      remark: data.remark,
      branch: data.branch,
      status: data.status,
      particular: curPart._id,
      catagory,
      type: "liability",
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
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                {...register("amount", {
                  required: "Amount is required",
                  min: { value: 0, message: "Amount must be positive" },
                })}
              />
              {errors.amount && (
                <span className="form-group-error">
                  {errors.amount.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <span className="form-group-error">{errors.date.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="branch">Branch</label>
              <select
                id="branch"
                {...register("branch", { required: "Select a branch" })}
              >
                <option value="">Select branch</option>
                <option value="Kochi">Kochi</option>
                <option value="Kozhikode">Kozhikode</option>
                <option value="Kottayam">Kottayam</option>
                <option value="Manjeri">Manjeri</option>
                <option value="Kannur">Kannur</option>
                <option value="Corporate">Corporate</option>
                <option value="Directors">Directors</option>
              </select>
              {errors.branch && (
                <span className="form-group-error">
                  {errors.branch.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                {...register("status", { required: "Select a status" })}
              >
                <option value="">Select Status</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Postponed">Postponed</option>
              </select>
              {errors.status && (
                <span className="form-group-error">
                  {errors.status.message}
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
