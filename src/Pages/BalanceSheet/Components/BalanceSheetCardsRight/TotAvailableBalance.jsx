import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBankDetails } from "../../../../Global-Variables/fetch/details";
import { formatCurrency } from "../../../../Services/amountFormatter";
import { Skeleton } from "antd";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setBranchWiseShowTotal } from "../../../../Global-Variables/features/BranchWisePnlSlice/branchWIsePnlSlice";

const TotAvailableBalance = () => {
  const { banks, loading, error, bankBalances } = useSelector(
    (state) => state.bank
  );
  const { branchWiseShowTotal } = useSelector((state) => state.branchwise);
  const dispatch = useDispatch();

  const handleShow = () => {
    dispatch(setBranchWiseShowTotal(!branchWiseShowTotal));
  };

  useEffect(() => {
    if (!banks.length) {
      dispatch(fetchBankDetails());
    }
  }, [dispatch, banks.length]);

  const balances = {
    RBL: bankBalances?.RBL?.balance || 0,
    ICICI: bankBalances?.ICICI?.balance || 0,
    RAK: bankBalances?.RAK?.balance || 0,
    HDFC: bankBalances?.HDFC?.balance || 0,
    CASH: bankBalances?.CASH?.balance || 0,
    BANDAN: bankBalances?.BANDAN?.balance || 0,
  };

  const totals = Object.values(balances).reduce(
    (acc, balance) => acc + balance,
    0
  );

  const renderBalance = (balance) =>
    branchWiseShowTotal ? formatCurrency(balance) : "****";

  return (
    <div
      className="balance-container"
      style={{ fontFamily: "Inter, 'Open Sans', Roboto" }}
    >
      <h4 className="balance-title">Total Available Balance</h4>
      <div className="underline-balance-heading"></div>

      {branchWiseShowTotal ? (
        <FaEye className="eye-btn" onClick={handleShow} />
      ) : (
        <FaEyeSlash className="eye-btn" onClick={handleShow} />
      )}

      {loading ? (
        Array(5)
          .fill()
          .map((_, index) => (
            <div className="balance_card" key={index}>
              <Skeleton.Input
                key={index}
                active
                style={{ height: "25px", width: 238 }}
              />
            </div>
          ))
      ) : error ? (
        <div className="error">
          <span>{error}</span>
        </div>
      ) : (
        <>
          {Object.entries(balances).map(([bank, balance], index) => (
            <React.Fragment key={bank}>
              <div className="balance_card">
                <div
                  className={`balance-name balance-name-${bank.toLowerCase()}`}
                >
                  {bank}
                </div>
                <div className="balance-amount">{renderBalance(balance)}</div>
              </div>
              {index < Object.entries(balances).length - 1 && (
                <div className="underline-balance"></div>
              )}
            </React.Fragment>
          ))}
          <div
            className="totals"
            style={
              totals != null && totals <= 0
                ? { backgroundColor: "rgb(134, 4, 4)" }
                : null
            }
          >
            {branchWiseShowTotal ? totals.toFixed(2) : "****"}
          </div>
        </>
      )}
    </div>
  );
};

export default TotAvailableBalance;
