export default function BankToBankAmount({ amount, setAmount }) {
  return (
    <div className="budget-form-group property-name-group">
      <label className="form-label">Amount</label>
      <input
        className="form-input"
        type="number"
        id="newProperty"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
    </div>
  );
}
