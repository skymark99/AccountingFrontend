import axios from "axios";
import { useSelector } from "react-redux";
const URL = import.meta.env.VITE_URL;

// Daybook
export const create_daybook = async (formData) => {
  return (
    await axios.post(`${URL}/v1/transaction`, formData, {
      withCredentials: true,
    })
  ).data;
};

export const edit_daybook = async (id, formData) => {
  return (
    await axios.patch(`${URL}/v1/transaction/${id}`, formData, {
      withCredentials: true,
    })
  ).data;
};

export const delete_daybook = async (ids) => {
  return await axios.delete(`${URL}/v1/transaction/delete-transactions`, {
    data: { ids },
  });
};

//Liability & outstanding
export const create_liability = async (formData) => {
  return (
    await axios.post(`${URL}/v1/liability`, formData, { withCredentials: true })
  ).data;
};

export const edit_liability = async (id, formData) => {
  return (
    await axios.patch(`${URL}/v1/liability/${id}`, formData, {
      withCredentials: true,
    })
  ).data;
};

// Reminder
export const create_reminder = async (formData) => {
  return (
    await axios.post(`${URL}/v1/reminders`, formData, { withCredentials: true })
  ).data;
};

export const edit_reminder = async (id, formData) => {
  return (
    await axios.patch(`${URL}/v1/reminders/${id}`, formData, {
      withCredentials: true,
    })
  ).data;
};

export const delete_reminder = async (formData) => {
  return (
    await axios.post(`${URL}/v1/reminders`, formData, { withCredentials: true })
  ).data;
};

export const logout = async () => {
  return (
    await axios.post(`${URL}/v1/user/logout`, {}, { withCredentials: true })
  ).data;
};
export const resetPassword = async (password) => {
  return await axios.post(
    `${URL}/v1/user/resetPassword`,
    { password },
    { withCredentials: true }
  );
};

//Budget planner
export const budgetPlannerAddEvent = async (event) => {
  return (await axios.post(`${URL}/v1/event`, event, { withCredentials: true }))
    .data;
};
export const budgetPlannerDeleteEvent = async (id) => {
  return (
    await axios.delete(`${URL}/v1/event/${id}`, { withCredentials: true })
  ).data;
};
export const budgetPlannerUpdateEvent = async (eventId, data) => {
  return (
    await axios.patch(`${URL}/v1/event/${eventId}`, data, {
      withCredentials: true,
    })
  ).data;
};

export const create_log = async (log, userId) => {
  try {
    return (
      await axios.post(
        `${URL}/v1/logs`,
        { log, user: userId },
        { withCredentials: true }
      )
    ).data;
  } catch (error) {
    console.log(error);
  }
};
