import { truncateText } from "../../Services/truncateFormatter";

export default function ComDataItems({ item }) {
  return (
    <div className="commition__data-items">
      <input type="checkbox" />
      <span className="commition__data-headerItems commitionDate data-items">
        <h4> {item?.formattedDate}</h4>
      </span>
      <span className="commition__data-headerItems commition__student data-items">
        <div>
          <h4>{truncateText(item?.student, 15)}</h4>
          <div className="text">{item?.country}</div>
          <div className="text">{item?.counsillor}</div>
          <div className="text">
            {item?.intakeMonth} | {item?.intake}
          </div>
          <div className="text">{item?.university}</div>
        </div>
      </span>
      <span className="commition__data-headerItems data-items">
        <h4>{item?.branchName}</h4>
      </span>
      <span className="commition__data-headerItems data-items">
        <h4>{item?.courseFee}</h4>
      </span>
      <span className="commition__data-headerItems data-items">
        <h4>Revievable</h4>
      </span>
      <span className="commition__data-headerItems data-items">
        <h4>{item?.status}</h4>
      </span>
      <span className="commition__data-headerItems data-items">
        <h4>{truncateText(item?.agent, 25)}</h4>
      </span>
    </div>
  );
}
