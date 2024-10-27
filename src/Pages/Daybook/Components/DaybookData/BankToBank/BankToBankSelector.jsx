export default function BankToBankSelector({
  value,
  setValue,
  options,
  text = "Select a Bank",
}) {
  return (
    <select
      className="form-select"
      id="BankToBankB"
      required
      value={value}
      style={{ marginBottom: "1rem" }}
      onChange={(e) => setValue(e.target.value)}
    >
      <option value="">{text}</option>
      {options.map((curBank, index) => (
        <option key={index} value={curBank}>
          {curBank}
        </option>
      ))}
    </select>
  );
}
