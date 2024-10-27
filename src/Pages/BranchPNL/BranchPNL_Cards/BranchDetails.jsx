import { Skeleton } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function BranchDetails({ title }) {
  const { branchData, branchLoading, branchError } = useSelector(
    (state) => state.branchwise
  );
  const [data] = branchData;

  const totals =
    data?.RBL +
    data?.ICICI +
    data?.RAK +
    data?.CASH +
    data?.HDFC +
    data?.BANDAN;

  return (
    <div
      className="balance-container"
      style={{ fontFamily: "Inter, 'Open Sans', Roboto" }}
    >
      <span className="balance-title">{title}</span>
      <div className="underline-balance-heading"></div>
      {branchLoading ? (
        <>
          {Array(5)
            .fill()
            .map((_, index) => (
              <div className="balance-item" key={index}>
                <Skeleton.Input
                  key={index}
                  active
                  style={{ height: "25px", width: 200 }}
                />
              </div>
            ))}
        </>
      ) : branchError ? (
        <div className="error">
          <span>{branchError}</span>
        </div>
      ) : (
        <>
          <div className="balance_card">
            <div className={`balance-name balance-name-rbl`}>RBL</div>
            <div className="balance-amount">{data?.RBL?.toFixed(2)}</div>
          </div>
          <div className="underline-balance"></div>

          <div className="balance_card">
            <div className={`balance-name balance-name-icici`}>ICICI</div>
            <div className="balance-amount">{data?.ICICI?.toFixed(2)}</div>
          </div>
          <div className="underline-balance"></div>

          <div className="balance_card">
            <div className={`balance-name balance-name-rak`}>RAK</div>
            <div className="balance-amount">{data?.RAK?.toFixed(2)}</div>
          </div>
          <div className="underline-balance"></div>

          <div className="balance_card">
            <div className={`balance-name balance-name-hdfc`}>HDFC</div>
            <div className="balance-amount">{data?.HDFC?.toFixed(2)}</div>
          </div>
          <div className="underline-balance"></div>

          <div className="balance_card">
            <div className={`balance-name balance-name-cash`}>CASH</div>
            <div className="balance-amount">{data?.CASH?.toFixed(2)}</div>
          </div>
          <div className="underline-balance"></div>

          <div className="balance_card">
            <div className={`balance-name balance-name-cash`}>BANDAN</div>
            <div className="balance-amount">{data?.BANDAN?.toFixed(2)}</div>
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
}

export default BranchDetails;
