import { useSelector } from "react-redux";
import { Skeleton } from "antd";

function Outstanding() {
  const { totalOutstanding, loading, error } = useSelector(
    (state) => state.dashboard
  );

  return (
    <div className="overview-item">
      {loading ? (
        // <HorizontalLoader />
        <Skeleton.Input active style={{ width: 200, height: 26 }} />
      ) : (
        <>
          <span
            style={{
              color: "black",
              fontWeight: "700",
              fontSize: "1.9rem",
              fontFamily: "inter, Open Sans, Roboto",
            }}
          >
            {totalOutstanding}
          </span>
          <span
            style={{
              display: "block",
              fontSize: "1.2rem",
              marginTop: "1.5rem",
              lineHeight: ".8rem",
            }}
          >
            Total oustanding
          </span>
          <span className="small-text">This Month</span>
        </>
      )}
    </div>
  );
}

export default Outstanding;
