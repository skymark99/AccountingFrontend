import { useDispatch, useSelector } from "react-redux";
import ArrowUpBtn from "./ArrowUpBtn";
import Percentage from "./Percentage";
import { useEffect } from "react";
import { fetchBankDetails } from "../Global-Variables/fetch/details";

import { formatCurrency } from "../Services/amountFormatter";
import { Skeleton } from "antd";

function CurrentBalance() {
  const { totalBalance, loading, error, percentageHike } = useSelector(
    (state) => state.bank
  );
  const { initialStatus } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialStatus !== "Success") {
      dispatch(fetchBankDetails());
    }
  }, [dispatch, totalBalance, initialStatus]);

  return (
    <div className="balance-card">
      <div className="balance-card__header">
        <p className="balance-card__title">Current Balance</p>
      </div>
      {loading ? (
        <>
          <div className="balance-card__amount-container">
            <Skeleton.Input
              active
              style={{ width: 150, height: 40, borderRadius: 4 }}
            />
            <Skeleton.Button
              active
              style={{ width: 60, height: 60, borderRadius: "4px" }} // Perfect square box
            />
          </div>
          <Skeleton.Input
            active
            style={{ width: 200, height: 24, marginTop: "1rem" }}
          />
        </>
      ) : (
        <>
          <div className="balance-card__amount-container">
            <span className="balance-card__amount">
              {formatCurrency(totalBalance)}
            </span>
          </div>
          <Percentage type={"pos"} size="1.5rem" percent={true}>
            {percentageHike}
          </Percentage>
        </>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default CurrentBalance;
