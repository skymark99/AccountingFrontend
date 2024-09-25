function AmountEditContainer({
  handleAmountChange,
  amount,
  index,
  saveAmount,
  type = "number",
}) {
  return (
    <div className="amount-edit-container">
      <input
        type={type}
        value={amount}
        onChange={(e) => handleAmountChange(index, e)}
        autoFocus
      />
      <button className="save-btn" onClick={() => saveAmount(index)}>
        Save
      </button>
    </div>
  );
}

export default AmountEditContainer;
