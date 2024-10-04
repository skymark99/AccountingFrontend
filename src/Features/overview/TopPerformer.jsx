import { useSelector } from "react-redux";
import Percentage from "../../Components/Percentage";
import { Skeleton } from "antd";

function TopPerformer() {
  const { topPerformerProfit, topPerformer, loading, error } = useSelector(
    (state) => state.dashboard
  );
  return (
    <div className="overview-item">
      <span
        style={{
          color: "black",
          fontWeight: "700",
          fontFamily: "Open Sans",
        }}
      >
        Top Performer
      </span>
      {loading ? (
        <Skeleton.Input
          active
          style={{
            display: "block",
            fontSize: "1.2rem",
            marginTop: "1.5rem",
            lineHeight: ".8rem",
            width: 200,
          }}
        />
      ) : (
        <>
          <span
            style={{
              display: "block",
              fontSize: "1.2rem",
              marginTop: "1.5rem",
              lineHeight: ".8rem",
            }}
          >
            {topPerformer}
          </span>
          <Percentage>{`₹ ${topPerformerProfit}/Profit`}</Percentage>
        </>
      )}
    </div>
  );
}

export default TopPerformer;
