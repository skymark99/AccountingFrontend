import React, { useEffect } from "react";
import BalanceSheet from "./BalanceSheet";
import BranchesYearlyPNL from "./BranchesYearlyPNL";
import { useDispatch, useSelector } from "react-redux";
import { fetchBankDetails } from "../../../Global-Variables/fetch/details";
import { fetchBranchWise } from "../../../Global-Variables/features/BranchWisePnlSlice/branchWIsePnlSlice";
import BranchDetails from "./BranchDetails";
import TotAvailableBalance from "../../BalanceSheet/Components/BalanceSheetCardsRight/TotAvailableBalance";

const BranchPNL_Cards = () => {
  const { banks } = useSelector((state) => state.bank);
  const { curBranch } = useSelector((state) => state.branchwise);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!banks.length) {
      dispatch(fetchBankDetails());
    }
  }, [dispatch, banks.length]);

  useEffect(() => {
    dispatch(fetchBranchWise(`/v1/branch?name=${curBranch}`));
  }, [dispatch, curBranch]);

  return (
    <>
      <div className="branch_card_group">
        <div className="balance_sheet_group">
          <BranchDetails title={`${curBranch} Branch Balance`} />
          <TotAvailableBalance />
        </div>
        <BranchesYearlyPNL />
      </div>
    </>
  );
};

export default BranchPNL_Cards;
