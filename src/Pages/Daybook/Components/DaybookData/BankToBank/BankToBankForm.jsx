import { useState } from "react";
import { bank, branches } from "../../../../../data/generalDatas";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchBankDetails } from "../../../../../Global-Variables/fetch/details";
import BankToBankAmount from "./BankToBankAmount";
import BankToBankSelector from "./BankToBankSelector";
import BankToBankSubmit from "./BankToBankSubmit";

const URL = import.meta.env.VITE_URL;

function BankToBankForm() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (1 === 1) return toast.error("Under Maintenance");
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
  const [fromBranch, setFromBranch] = useState("");
  const [toBranch, setToBranch] = useState("");

  return (
    <div className="property-form">
      <form className="property-form-inner" onSubmit={handleSubmit}>
        <div className="property-fields">
          <div className="budget-form-group">
            <label className="form-label" htmlFor="amount">
              From
            </label>

            <BankToBankSelector
              value={fromBranch}
              setValue={setFromBranch}
              options={branches.slice(1)}
              text="Select a Branch"
            />
            <BankToBankSelector
              value={from}
              setValue={setFrom}
              options={bank}
            />
          </div>
          <div className="budget-form-group">
            <label className="form-label" htmlFor="BankToBankTo">
              To
            </label>
            <BankToBankSelector
              value={toBranch}
              setValue={setToBranch}
              options={branches.slice(1)}
              text="Select a branch"
            />
            <BankToBankSelector value={to} setValue={setTo} options={bank} />
          </div>
        </div>
        <BankToBankAmount amount={amount} setAmount={setAmount} />
        <div className="budget-form-group">
          <BankToBankSubmit />
        </div>
      </form>
    </div>
  );
}

export default BankToBankForm;
