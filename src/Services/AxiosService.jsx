import axios from "axios";
const URL = import.meta.env.VITE_URL;
import Cookies from "js-cookie";

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
  const clearBrowserCache = () => {
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }
  };

  clearBrowserCache();
  Cookies.remove("token");
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
  } catch (error) {}
};
export const create_commition = async (formData) => {
  return await axios.post(`${URL}/v1/university`, formData, {
    withCredentials: true,
  });
};
export const update_commition = async (id, formData) => {
  return await axios.patch(`${URL}/v1/university/${id}`, formData, {
    withCredentials: true,
  });
};
export const delete_commition = async (id) => {
  return await axios.delete(`${URL}/v1/university/${id}`, {
    withCredentials: true,
  });
};
