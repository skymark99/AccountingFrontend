import { useEffect } from "react";
import BranchPNL_Header from "./BranchPNL_Header/BranchPNL_Header";
import BranchPNL_Cards from "./BranchPNL_Cards/BranchPNL_Cards";
import MonthlyPNLChart from "./BranchPNL_Cards/MonthlyPNLChart";
import BranchPNL_Table from "./BranchPNL_Cards/BranchPNL_Table";
import PageNavigate from "../../Components/PageNavigate/PageNavigate";
import Navbar from "../../Components/Navbar";
import GraphSkelton from "../../Components/GraphSkelton";
import { useDispatch, useSelector } from "react-redux";
import {
  setBranchCurrentPage,
  setBranchWisePNLAllSelected,
  setBranchWisePNLSelectedItems,
} from "../../Global-Variables/features/BranchWisePnlSlice/branchWIsePnlSlice";
import { useBranchWise } from "../../Hooks/useBranchWise/useBranchwise";

function BranchPNL() {
  const {
    transactionData,
    curBranch,
    startPage,
    currentPage,
    dataset1,
    dataset2,
    chartError,
    chartLoading,
    branchwisePNLSelectedItems,
    branchWisePNLAllSelected,
  } = useSelector((state) => state.branchwise);

  const dispatch = useDispatch();

  useBranchWise();

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const datasets = [
    {
      label: "Expense",
      data: dataset1,
      gradientStart: "rgba(60, 135, 167, 1)",
      gradientEnd: "rgba(27, 54, 134, 1)",
    },
    {
      label: "Income",
      data: dataset2,
      gradientStart: "rgba(71, 202, 52, 1)",
      gradientEnd: "rgba(71, 202, 52, 1)",
    },
  ];

  const viewSix = transactionData.slice(startPage, startPage + 6);
  const btnDisable = viewSix.length < 6;
  const showThisData = viewSix.map(
    ({
      particular,
      purpose,
      amount,
      remark,
      status,
      branches,
      date,
      type,
      bank,
      catagory,
      _id,
    }) => ({
      particular,
      purpose,
      amount,
      remark,
      status,
      branches,
      date,
      type,
      bank,
      _id,
      catagory,
    })
  );

  useEffect(() => {
    if (
      branchwisePNLSelectedItems.length === showThisData.length &&
      showThisData.length > 0
    ) {
      dispatch(setBranchWisePNLAllSelected(true));
    } else {
      dispatch(setBranchWisePNLAllSelected(false));
    }
  }, [branchwisePNLSelectedItems.length, showThisData.length, dispatch]);

  useEffect(() => {
    if (branchWisePNLAllSelected) {
      dispatch(setBranchWisePNLSelectedItems(showThisData));
    } else if (branchwisePNLSelectedItems.length === showThisData.length) {
      dispatch(setBranchWisePNLSelectedItems([]));
    }
  }, [branchWisePNLAllSelected, dispatch]);
  return (
    <div className="scroll-body branchwise">
      <div className="responsive-nav">
        <Navbar />
      </div>
      <div className="header">
        <h2>Branch Wise PNL</h2>
      </div>

      {/* scss styles used from liability , branchwise & common */}
      <div className="branchwise_body">
        <BranchPNL_Header width="89%" />
        <div className="branch_sub_body">
          <BranchPNL_Table data={showThisData} />
          <div className="branch_wise_footer">
            <PageNavigate
              setCurrentPage={setBranchCurrentPage}
              currentPage={currentPage}
              totalPages={length}
              btnDisable={btnDisable}
            />
          </div>
          <div className="branch-card-header">
            <BranchPNL_Cards />
            <div className="graph-container">
              {chartLoading ? (
                <GraphSkelton />
              ) : (
                <>
                  <span className="graph-head">Monthly PNL of {curBranch}</span>
                  <MonthlyPNLChart labels={labels} datasets={datasets} />;
                </>
              )}
              {chartError && (
                <div className="error error-fullpage ">{chartError}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BranchPNL;
