import moment from "moment-timezone";
import formatDate from "./formatDate";

export default function formatDateTime(isoDateString) {
  // Convert the ISO date string to a Date object
  const date = new Date(isoDateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return ["Invalid Date", "Invalid Time"];
  }

  // Create a formatter for the date in dd-mm-yyyy format
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Create a formatter for the time in HH:mm format (24-hour)
  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // Format the date and time
  const formattedDate = dateFormatter.format(date).split("/").join("-");
  const formattedTime = timeFormatter.format(date);

  // Convert 24-hour time to 12-hour format with AM/PM
  const [hours, minutes] = formattedTime.split(":");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  const time12 = `${hours12.toString().padStart(2, "0")}:${minutes} ${ampm}`;

  return [formattedDate, time12];
}

export const calculateDateRange = (daysAgo) => {
  const startDate = formatDate(
    new Date(new Date().setDate(new Date().getDate() - daysAgo))
  );
  const endDate = formatDate(new Date());
  return { startDate, endDate };
};

export const today = () =>
  new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

export const currentDateFormatter = (date) => {
  // If no date is passed, use the current date in IST
  if (!date) {
    date = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  }

  // Parse the date
  const parsedDate = new Date(date);

  // Extract day, month, and year with leading zeros for day and month
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const year = String(parsedDate.getFullYear());

  // Return as an object
  return { day, month, year };
};

export function addCurrentTimeToDate(inputDate) {
  const date = new Date(inputDate); // Parse input date
  const currentTime = new Date(); // Get the current time

  // Set the current time to the input date
  date.setHours(currentTime.getHours());
  date.setMinutes(currentTime.getMinutes());
  date.setSeconds(currentTime.getSeconds());
  date.setMilliseconds(currentTime.getMilliseconds());
  return date.toISOString(); // Return the date in ISO 8601 format
}

export function combineDateWithCurrentTime(date) {
  const frontendDate = moment(date);
  const currentIndianTime = moment().tz("Asia/Kolkata");

  return moment
    .tz(
      {
        year: frontendDate.year(),
        month: frontendDate.month(),
        date: frontendDate.date(),
        hour: currentIndianTime.hour(),
        minute: currentIndianTime.minute(),
        second: currentIndianTime.second(),
        millisecond: currentIndianTime.millisecond(),
      },
      "Asia/Kolkata"
    )
    .format("MMMM Do YYYY, h:mm a");
}
