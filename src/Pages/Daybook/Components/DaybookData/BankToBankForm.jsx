import { useState } from "react";
import { bank } from "../../../../data/generalDatas";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchBankDetails } from "../../../../Global-Variables/fetch/details";

const URL = import.meta.env.VITE_URL;

function BankToBankForm() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating..");

    if (to === from)
      return toast.error("Please Select Different Branches", { id: toastId });
    try {
      setLoading(true);
      await axios.post(
        `${URL}/v1/bank/bank-transfer`,
        { from, to, amount },
        { withCredentials: true }
      );
      dispatch(fetchBankDetails());
      toast.success("Succesfully transfered", { id: toastId });
    } catch (err) {
      toast.error("Something went Wrong...", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div className="property-form">
      <form className="property-form-inner" onSubmit={handleSubmit}>
        <div className="property-fields">
          <div className="budget-form-group">
            <label className="form-label" htmlFor="amount">
              From
            </label>
            <select
              className="form-select"
              id="branch"
              required
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              <option value="">Select a Bank</option>
              {bank.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
          <div className="budget-form-group">
            <label className="form-label" htmlFor="branch">
              To
            </label>
            <select
              className="form-select"
              id="branch"
              required
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              <option value="">Select a branch</option>
              {bank.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
        </div>

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
        <div className="budget-form-group">
          <button
            className="submit-button"
            type="submit"
            disabled={loading}
            style={{ opacity: loading ? 0.5 : 1 }}
          >
            {loading ? "Transfering..." : "Transfer"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BankToBankForm;
