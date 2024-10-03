import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { create_commition, create_log } from "../../../Services/AxiosService";
import { getInitialTime } from "../../../Components/Coundown/countdownActions";
import { setTime } from "../../../Global-Variables/features/auth/authSlice";
import {
  addCurrentTimeToDate,
  combineDateWithCurrentTime,
  today,
} from "../../../Services/dateFormatter";
import { resetUniversity } from "../../../Global-Variables/features/university/universitySlice";

const aprilIntake = ["May", "June", "July", "August", "September", "October"];
const novemberIntake = ["November", "December", "January", "February", "March"];

const UniversityEditForm = () => {
  const [loading, setLoading] = useState(false);
  const [intake, setIntake] = useState(""); // State to track selected intake
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { universitySelectedItems: selected } = useSelector(
    (state) => state.university
  );

  console.log(selected, "selected");

  const defaultValues = useMemo(
    () => ({
      student: selected?.student || "",
      courseFee: selected?.courseFee || "",
      counsillor: selected?.counsillor || "",
      country: selected?.country || "",
      agent: selected?.agent || "",
      university: selected?.university || "",
      commition: selected?.commition || "",
      branchName: selected?.branchName || "",
      status: selected?.status || "",
      intake: selected?.intake || "",
      intakeMonth: selected?.intakeMonth || "",
      date: selected?.date || today(),
    }),
    [selected]
  ); // Only re-compute when 'selected' changes

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
  });

  const handleCreateTransaction = async (formData) => {
    setLoading(true);

    try {
      await create_commition(formData);
      reset();
      dispatch(resetUniversity());

      toast.success("New Commition added✅", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "white",
          color: "green",
          fontSize: "1.5rem",
        },
      });

      await create_log(
        `${combineDateWithCurrentTime(new Date())} ${
          user.name
        } created a ${"Commition"} of ${formData.courseFee} in ${
          formData.branchName
        } branch , ${formData.counsillor} consillor, ${formData.agent} agent`,
        user._id
      );
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred. Please try again.";

      const formattedMessage = `${errorMessage}!`;

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
    const formData = {
      date: addCurrentTimeToDate(data.date),
      intake: data.intake,
      intakeMonth: data.intakeMonth,
      country: data.country,
      university: data.university,
      commition: data.commition,
      student: data.student,
      agent: data.agent,
      status: data.status,
      counsillor: data.counsillor,
      courseFee: data.courseFee,
      branchName: data.branchName,
    };
    await handleCreateTransaction(formData);
  };

  // Function to handle intake change
  const handleIntakeChange = (event) => {
    setIntake(event.target.value); // Update intake state
  };

  return (
    <div className="daybook-form-container">
      <form
        className="daybook-form"
        onSubmit={handleSubmit(handleReminderSubmit)}
      >
        <div className="form-section">
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
              <label htmlFor="branchName">Branch</label>
              <select
                id="branchName"
                {...register("branchName", { required: "Select a branch" })}
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
              {errors.branchName && (
                <span className="form-group-error">
                  {errors.branchName.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="counsillor">Counsillor</label>
              <input
                id="counsillor"
                {...register("counsillor", {
                  required: "Counsillor is required",
                })}
              ></input>
              {errors.counsillor && (
                <span className="form-group-error">
                  {errors.counsillor.message}
                </span>
              )}
            </div>
          </div>
          <div className="form-student-details">Student Details</div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="student">Student</label>
              <input
                type="text"
                id="student"
                {...register("student", {
                  required: "Student name is required",
                })}
              />
              {errors.student && (
                <span className="form-group-error">
                  {errors.student.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="university">University</label>
              <input
                id="university"
                {...register("university", {
                  required: "University is required",
                })}
              ></input>
              {errors.university && (
                <span className="form-group-error">
                  {errors.university.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="courseFee">Course Fee</label>
              <input
                type="number"
                id="courseFee"
                {...register("courseFee", {
                  required: "Course Fee is required",
                  min: { value: 0, message: "Course Fee must be positive" },
                })}
              />
              {errors.courseFee && (
                <span className="form-group-error">
                  {errors.courseFee.message}
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
                <option value="Invoice Shared">Invoice Shared</option>
                <option value="Mail Pending">Mail Pending</option>
                <option value="Pending">Pending</option>
                <option value="Received">Received</option>
              </select>
              {errors.status && (
                <span className="form-group-error">
                  {errors.status.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                {...register("country", {
                  required: "Country is required",
                })}
              />
              {errors.country && (
                <span className="form-group-error">
                  {errors.country.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="agent">Agent</label>
              <input
                id="agent"
                {...register("agent", {
                  required: "Agent Name is required",
                })}
              ></input>
              {errors.agent && (
                <span className="form-group-error">{errors.agent.message}</span>
              )}
            </div>
          </div>
        </div>
        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="commition">Commition</label>
              <input
                type="number"
                id="commition"
                {...register("commition", {
                  required: "Commition is required",
                })}
              ></input>
              {errors.commition && (
                <span className="form-group-error">
                  {errors.commition.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="intake">Intake</label>
              <select
                id="intake"
                {...register("intake", { required: "Select an Intake" })}
                onChange={handleIntakeChange} // Handle intake change
              >
                <option value="">Select Intake</option>
                <option value="April-October">April-October</option>
                <option value="November-March">November-March</option>
              </select>
              {errors.intake && (
                <span className="form-group-error">
                  {errors.intake.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="intakeMonth">Intake Month</label>
              <select
                disabled={!intake}
                id="intakeMonth"
                {...register("intakeMonth", {
                  required: "Select an Intake Month",
                })}
              >
                <option value="">Select Intake Month</option>
                {intake === "April-October"
                  ? aprilIntake.map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))
                  : intake === "November-March" &&
                    novemberIntake.map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
              </select>
              {errors.intakeMonth && (
                <span className="form-group-error">
                  {errors.intakeMonth.message}
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
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UniversityEditForm;
