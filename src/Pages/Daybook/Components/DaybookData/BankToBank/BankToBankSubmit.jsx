export default function BankToBankSubmit({ loading }) {
  return (
    <button
      className="submit-button"
      type="submit"
      disabled={loading}
      style={{ opacity: loading ? 0.5 : 1 }}
    >
      {loading ? "Transfering..." : "Transfer"}
    </button>
  );
}
