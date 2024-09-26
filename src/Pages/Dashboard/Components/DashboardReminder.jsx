import { Modal, Skeleton } from "antd";
import PrimaryBlueBtn from "../../../Components/Buttons/PrimaryBlueBtn";
import SecondaryBtn from "../../../Components/Buttons/SecondaryBtn";
import { useEffect, useState } from "react";
import RemindersForm from "../../Reminders/RemindersHeader/RemindersForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchReminders } from "../../../Global-Variables/features/remindersSlice/remindersSlice.";
import { NavLink } from "react-router-dom";
import { truncateText } from "../../../Services/truncateFormatter";
import { RemiderIcon } from "../../../Utils/icons/HomeIcon";

function DashboardReminder() {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { reminders, startPage, loading, error } = useSelector(
    (state) => state.reminders
  );

  const dispatch = useDispatch();

  const viewSix = reminders.slice(startPage, startPage + 4);

  // calling the data
  useEffect(() => {
    if (reminders.length <= 0) {
      dispatch(fetchReminders("/v1/reminders"));
    }
  }, [dispatch, reminders.length]);

  const dateFormatter = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString();
    const time = date.toLocaleTimeString();
    return [formattedDate, time];
  };

  return (
    <div className="dashboard__reminder">
      <div className="dashboard__reminder-header">
        <div className="reminder-title-wrapper">
          <h3>Payment Reminder</h3>
          <span className="dashboard__reminder-small-text">
            Set your new reminder
          </span>
        </div>
        <PrimaryBlueBtn onClick={showModal} className="dashboard__reminder-btn">
          +New Reminder
        </PrimaryBlueBtn>
        <Modal open={open} onCancel={handleCancel} footer={null} width={"70%"}>
          <h4 className="form-head">New Reminder</h4>
          <RemindersForm />
        </Modal>
      </div>

      <div className="dashboard__reminder-itemWrapper">
        <ul>
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <li key={index} className="payment-item">
                  <Skeleton.Input style={{ width: 30, height: 30 }} active />
                  <div className="payment-details">
                    <Skeleton paragraph={{ rows: 1 }} title={false} active />
                  </div>
                  <Skeleton.Button style={{ width: 20, height: 20 }} active />
                </li>
              ))
            : viewSix?.map((payment, index) => {
                const [formattedDate, time] = dateFormatter(payment.date);
                const truncatedPurpose = truncateText(
                  payment.purpose || "",
                  18
                );

                return (
                  <li key={index} className="payment-item">
                    <div className="gray-box">
                      <RemiderIcon />
                    </div>
                    <div className="payment-details">
                      <h3>{payment?.name}</h3>
                      <div className="sub-details">
                        <span>
                          {payment?.amount} - {truncatedPurpose} -{" "}
                          {formattedDate}
                        </span>
                        <span className="payment-time">{time}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
          {error && <div className="error">{error}</div>}
        </ul>
      </div>

      <div className="more-btn-wrapper">
        <NavLink to="/reminders">
          <SecondaryBtn
            style={{ padding: ".5rem 3.5rem", marginTop: "0.9rem" }}
          >
            More
          </SecondaryBtn>
        </NavLink>
      </div>
    </div>
  );
}

export default DashboardReminder;
