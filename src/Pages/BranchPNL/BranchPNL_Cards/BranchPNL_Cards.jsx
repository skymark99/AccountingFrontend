import React, { useEffect } from "react";
import BalanceSheet from "./BalanceSheet";
import BranchesYearlyPNL from "./BranchesYearlyPNL";
import { useDispatch, useSelector } from "react-redux";
import { fetchBankDetails } from "../../../Global-Variables/fetch/details";
import { fetchBranchWise } from "../../../Global-Variables/features/BranchWisePnlSlice/branchWIsePnlSlice";
import BranchDetails from "./BranchDetails";

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
          <BalanceSheet title="Total Balance" balances={banks} />
        </div>
        <BranchesYearlyPNL />
      </div>
    </>
  );
};

export default BranchPNL_Cards;
