import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBankDetails } from "../../../../Global-Variables/fetch/details";
import { formatCurrency } from "../../../../Services/amountFormatter";
import { Skeleton } from "antd"; // Import Ant Design Skeleton

const TotAvailableBalance = () => {
  const { banks, loading, error, bankBalances } = useSelector(
    (state) => state.bank
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!banks.length) {
      dispatch(fetchBankDetails());
    }
  }, [dispatch, banks.length]);

  const rbiBalance = bankBalances?.RBL?.balance || 0;
  const iciciBalance = bankBalances?.ICICI?.balance || 0;
  const rakBalance = bankBalances?.RAK?.balance || 0;
  const hdfcBalance = bankBalances?.HDFC?.balance || 0;
  const cashBalance = bankBalances?.CASH?.balance || 0;
  const bundanBalance = bankBalances?.BANDAN?.balance || 0;

  const totals =
    rbiBalance +
    iciciBalance +
    rakBalance +
    hdfcBalance +
    cashBalance +
    bundanBalance;

  return (
    <div
      className="balance-container"
      style={{ fontFamily: "Inter, 'Open Sans', Roboto" }}
    >
      <h4 className="balance-title">Total Available Balance</h4>
      <div className="underline-balance-heading"></div>

      {loading ? (
        <>
          {Array(5)
            .fill()
            .map((_, index) => (
              <div className="balance_card" key={index}>
                <Skeleton.Input
                  key={index}
                  active
                  style={{ height: "25px", width: 238 }}
                />
              </div>
            ))}
        </>
      ) : error ? (
        <div className="error">
          <span>{error}</span>
        </div>
      ) : (
        <>
          <div className="balance_card">
            <div className="balance-name balance-name-rbl">RBL</div>
            <div className="balance-amount">{formatCurrency(rbiBalance)}</div>
          </div>
          <div className="underline-balance"></div>

          <div className="balance_card">
            <div className="balance-name balance-name-icici">ICICI</div>
            <div className="balance-amount">{formatCurrency(iciciBalance)}</div>
          </div>
          <div className="underline-balance"></div>

          <div className="balance_card">
            <div className="balance-name balance-name-rak">RAK</div>
            <div className="balance-amount">{formatCurrency(rakBalance)}</div>
          </div>
          <div className="underline-balance"></div>

          <div className="balance_card">
            <div className="balance-name balance-name-hdfc">HDFC</div>
            <div className="balance-amount">{formatCurrency(hdfcBalance)}</div>
          </div>
          <div className="underline-balance"></div>

          <div className="balance_card">
            <div className="balance-name balance-name-cash">CASH</div>
            <div className="balance-amount">{formatCurrency(cashBalance)}</div>
          </div>
          <div className="underline-balance"></div>
          <div className="balance_card">
            <div className="balance-name balance-name-bandan">BANDAN</div>
            <div className="balance-amount">
              {formatCurrency(bundanBalance)}
            </div>
          </div>
          <div className="underline-balance"></div>
          <div
            className="totals"
            style={
              totals != null && totals <= 0
                ? { backgroundColor: "rgb(134, 4, 4)" }
                : null
            }
          >
            {totals?.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default TotAvailableBalance;
