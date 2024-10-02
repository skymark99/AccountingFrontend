import { truncateText } from "../../Services/truncateFormatter";

export default function ComDataItems({ item }) {
  return (
    <div className="commition__data-items">
      <input type="checkbox" />
      <span className="commition__data-headerItems commitionDate data-items">
        <h4> {item?.formattedDate}</h4>
      </span>
      <span className="commition__data-headerItems commition__student data-items">
        <h4>{truncateText(item?.student, 15)}</h4>
      </span>
      <span className="commition__data-headerItems data-items">
        <h4>{item?.branch}</h4>
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
        <h4>{truncateText(item?.agent, 15)}</h4>
      </span>
    </div>
  );
}
