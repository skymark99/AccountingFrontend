import { calculateDateRange, today } from "./dateFormatter";

export default function particularFinder(catagories, particular, catagory) {
  const curCat = catagories.find((cat) => cat._id === catagory);
  return curCat?.particulars.find((part) => part.name === particular);
}

export const dateFinder = (selectedDate) => {
  const date = today();
  let startDate = new Date(date);
  let endDate = new Date(date);

  switch (selectedDate) {
    case "Today":
      break;
    case "Yesterday": {
      const { startDate: yesterday } = calculateDateRange(1);
      startDate = new Date(yesterday);
      endDate = new Date(yesterday);
      break;
    }
    case "Last 30 Days": {
      const { startDate: thirtyDays } = calculateDateRange(30);
      startDate = new Date(thirtyDays);
      break;
    }
    case "Last 60 Days": {
      const { startDate: sixty } = calculateDateRange(60);
      startDate = new Date(sixty);
      break;
    }
    case "All": {
      startDate = new Date(new Date().getFullYear(), 0, 1);
      endDate = new Date(today());
      break;
    }
    default: {
      startDate = new Date(new Date().getFullYear(), 0, 1);
      endDate = new Date(new Date(new Date().getFullYear(), 0, 1));
    }
  }
  return { startDate, endDate };
};

export const catagoryFinder = (catagories, catagory) => {
  return catagories.find((cat) => cat?._id === catagory);
};
