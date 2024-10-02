export default function ComDataHeader() {
  return (
    <div className="commition__data-header">
      <input type="checkbox" />
      <span className="commition__data-headerItems commitionDate">Date</span>
      <span className="commition__data-headerItems commition__student">
        Student
      </span>
      <span className="commition__data-headerItems">Branch</span>
      <span className="commition__data-headerItems">Course Fee</span>
      <span className="commition__data-headerItems">Receivable</span>
      <span className="commition__data-headerItems">Status</span>
      <span className="commition__data-headerItems">Agent</span>
    </div>
  );
}
