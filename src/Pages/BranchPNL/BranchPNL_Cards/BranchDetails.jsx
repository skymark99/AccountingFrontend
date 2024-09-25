import { Skeleton } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function BranchDetails({ title }) {
  const { branchData, branchLoading, branchError } = useSelector(
    (state) => state.branchwise
  );
  const [data] = branchData;

  return (
    <div className="balance-container">
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
          <React.Fragment>
            <div className="balance_card">
              <div className={`balance-name balance-name-rbl`}>RBL</div>
              <div className="balance-amount">{data?.RBL}</div>
            </div>
            <div className="underline-balance"></div>
          </React.Fragment>
          <React.Fragment>
            <div className="balance_card">
              <div className={`balance-name balance-name-icici`}>ICICI</div>
              <div className="balance-amount">{data?.ICICI}</div>
            </div>
            <div className="underline-balance"></div>
          </React.Fragment>
          <React.Fragment>
            <div className="balance_card">
              <div className={`balance-name balance-name-rak`}>RAK</div>
              <div className="balance-amount">{data?.RAK}</div>
            </div>
            <div className="underline-balance"></div>
          </React.Fragment>
          <React.Fragment>
            <div className="balance_card">
              <div className={`balance-name balance-name-hdfc`}>HDFC</div>
              <div className="balance-amount">{data?.HDFC}</div>
            </div>
            <div className="underline-balance"></div>
          </React.Fragment>
          <React.Fragment>
            <div className="balance_card">
              <div className={`balance-name balance-name-cash`}>CASH</div>
              <div className="balance-amount">{data?.CASH}</div>
            </div>
            <div className="underline-balance"></div>
          </React.Fragment>
        </>
      )}
    </div>
  );
}

export default BranchDetails;
