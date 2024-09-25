import { createSlice } from "@reduxjs/toolkit";
import formatDate from "../../../Services/formatDate";
import { today } from "../../../Services/dateFormatter";
import { dateFinder } from "../../../Services/helperFunctions";
import { branches, dateOptions } from "../../../data/generalDatas";

const initialState = {
  currentDayBookState: "all",
  currentDayBookBranch: "All Branch",
  branches,
  dateOptions,
  selectedDate: "All",
  selected: [],
  allSelected: false,
  dayBookStartDate: formatDate(new Date(new Date().getFullYear(), 0, 1)),
  dayBookEndDate: today(),
  selectedCatagory: "All Categories",
  selectedParticular: "All Particulars",
  query: "",
};
const dayBook = createSlice({
  name: "daybook",
  initialState,
  reducers: {
    setDayBookQuery(state, action) {
      state.query = action.payload;
    },
    setSelectedCatagory(state, action) {
      state.selectedCatagory = action.payload;
      state.selectedParticular = "All Particulars";
    },
    setSelectedParticular(state, action) {
      state.selectedParticular = action.payload;
    },

    setDayBookSelectedDate(state, action) {
      state.selectedDate = action.payload;
      const { startDate, endDate } = dateFinder(state.selectedDate);
      state.dayBookStartDate = formatDate(startDate);
      state.dayBookEndDate = formatDate(endDate);
    },

    setDayBookStartDate(state, action) {
      state.dayBookStartDate = action.payload;
      // state.selectedDate = "Date";
      state.selectedDate = "Reset";
    },
    setDayBookEndDate(state, action) {
      state.dayBookEndDate = action.payload;
      // state.selectedDate = "Date";
      state.selectedDate = "Reset";
    },
    setCurrentDayBookState(state, action) {
      state.currentDayBookState = action.payload;
    },
    setCurrentDayBookBranch(state, action) {
      state.currentDayBookBranch = action.payload;
    },
    setSelected(state, action) {
      state.selected = action.payload;
    },
    setIsAllSelected(state, action) {
      state.allSelected = action.payload;
    },
    dayBookResetDate(state) {
      state.dayBookStartDate = formatDate(
        new Date(new Date().setDate(new Date().getDate() - 30))
      );
      state.dayBookEndDate = formatDate(new Date());
    },
  },
});

export const {
  setSelectedParticular,
  setSelectedCatagory,
  setCurrentDayBookState,
  setCurrentDayBookBranch,
  setSelected,
  setIsAllSelected,
  setDayBookEndDate,
  setDayBookStartDate,
  dayBookResetDate,
  setDayBookSelectedDate,
  setDayBookQuery,
} = dayBook.actions;

export default dayBook.reducer;
