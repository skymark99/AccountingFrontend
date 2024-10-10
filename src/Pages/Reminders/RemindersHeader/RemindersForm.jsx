import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { create_log, create_reminder } from "../../../Services/AxiosService";
import Catagory from "../../../Components/CatagorySelector/Catagory";
import { resetReminders } from "../../../Global-Variables/features/remindersSlice/remindersSlice.";
import particularFinder from "../../../Services/helperFunctions";
import {
  addCurrentTimeToDate,
  combineDateWithCurrentTime,
} from "../../../Services/dateFormatter";
import { getInitialTime } from "../../../Components/Coundown/countdownActions";
import { setTime } from "../../../Global-Variables/features/auth/authSlice";

const RemindersForm = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [catagory, setCatagory] = useState("");
  const [particular, setParticular] = useState("");
  const { catagories } = useSelector((state) => state.catagories);

  const dispatch = useDispatch();

  // Initialize the useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      date: "",
      amount: "",
      remark: "",
      branch: "",
      status: "",
      purpose: "",
    },
  });

  const handleCreateTransaction = async (formData) => {
    setLoading(true);

    try {
      const res = await create_reminder(formData);

      await create_log(
        `${combineDateWithCurrentTime(new Date())} ${
          user.name
        } created a reminder with status of ${
          formData.status
        } with the amount of ${formData.amount} in ${
          formData.branchName
        } branch for ${particular} with purpose of ${formData.purpose}`,
        user._id
      );
      dispatch(resetReminders());
      reset();
      toast.success("New reminder added✅", {
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
      dispatch(setTime(getInitialTime()));
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

    const curPart = particularFinder(catagories, particular, catagory);

    const formData = {
      purpose: data.purpose,
      amount: data.amount,
      remark: data.remark,
      branchName: data.branch,
      status: data.status,
      date: addCurrentTimeToDate(data.date),
      catagory,
      particular: curPart._id,
    };
    await handleCreateTransaction(formData);
  };

  return (
    <div className="daybook-form-container">
      <form
        className="daybook-form"
        onSubmit={handleSubmit(handleReminderSubmit)}
      >
        <Catagory setCatagory={setCatagory} setParticular={setParticular} />
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
                step="any"
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
          </div>
        </div>
        <div className="form-section">
          <div className="form-row">
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

export default RemindersForm;
