import axios from "axios";
import { combineDateWithCurrentTime } from "./dateFormatter";

const baseUrl = import.meta.env.VITE_URL;

export const downloadTransactionReport = async (startDate, endDate) => {
  try {
    const response = await axios.get(
      `${baseUrl}/v1/transaction/download?startDate=${startDate}&endDate=${endDate}`,
      {
        responseType: "blob",
        withCredentials: true,
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute(
      "download",
      `transaction-report_${combineDateWithCurrentTime(
        startDate
      )}_${combineDateWithCurrentTime(endDate)}.pdf`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {}
};

export const downloadLiabilityReport = async (startDate, endDate, type) => {
  try {
    const response = await axios.get(
      `${baseUrl}/v1/liability/download?type=${type}&startDate=${startDate}&endDate=${endDate}`,
      {
        responseType: "blob",
        withCredentials: true,
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute(
      "download",
      `${
        type === "liability" ? "liability" : "outstanding"
      }-report_${combineDateWithCurrentTime(
        startDate
      )}_${combineDateWithCurrentTime(endDate)}.pdf`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {}
};

export const downloadReminderReport = async (startDate, endDate) => {
  try {
    const response = await axios.get(
      `${baseUrl}/v1/reminders/download?startDate=${startDate}&endDate=${endDate}`,
      {
        responseType: "blob",
        withCredentials: true,
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute(
      "download",
      `reminder-report_${combineDateWithCurrentTime(
        startDate
      )}_${combineDateWithCurrentTime(endDate)}.pdf`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {}
};
