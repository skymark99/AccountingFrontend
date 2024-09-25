import { Skeleton } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const BalanceSheet = ({ title, balances }) => {
  const { loading, error } = useSelector((state) => state.bank);

  const balanceCardclassNamees = {
    RBL: "balance-name-rbl",
    ICICI: "balance-name-icici",
    RAK: "balance-name-rak",
    HDFC: "balance-name-hdfc",
    CASH: "balance-name-cash",
  };

  const sortedOrder = Object.keys(balanceCardclassNamees);

  const sortedBalances = [...balances].sort((a, b) => {
    return sortedOrder.indexOf(a.name) - sortedOrder.indexOf(b.name);
  });

  return (
    <div className="balance-container">
      <h4 className="balance-title">{title}</h4>
      <div className="underline-balance-heading"></div>
      {loading ? (
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
      ) : error ? (
        <div className="error">
          <span>{error}</span>
        </div>
      ) : (
        <>
          {sortedBalances.map((balance, index) => (
            <React.Fragment key={index}>
              <div className="balance_card">
                <div
                  className={`balance-name ${
                    balanceCardclassNamees[balance.name]
                  }`}
                >
                  {balance.name}
                </div>
                <div className="balance-amount">{balance.balance}</div>
              </div>
              <div className="underline-balance"></div>
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default BalanceSheet;
