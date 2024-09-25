import { resetCredits } from "../Global-Variables/features/dayBookSlice/creditSlice";
import { setIsAllSelected } from "../Global-Variables/features/dayBookSlice/dayBookSlice";
import { resetDebits } from "../Global-Variables/features/dayBookSlice/debitSlice";
import { resetTransactions } from "../Global-Variables/features/dayBookSlice/transactionSlice";
import { resetLiability } from "../Global-Variables/features/liabilitySlice/liabilitySlice";
import { resetOutStanding } from "../Global-Variables/features/liabilitySlice/outstandingSlice";
import { resetReminders } from "../Global-Variables/features/remindersSlice/remindersSlice.";

export function resetDayBook(dispatch) {
  dispatch(resetCredits());
  dispatch(resetTransactions());
  dispatch(resetDebits());
  dispatch(setIsAllSelected(false));
}

export function resetAll(dispatch) {
  resetDayBook(dispatch);
  dispatch(resetLiability());
  dispatch(resetOutStanding());
  dispatch(resetReminders());
}
