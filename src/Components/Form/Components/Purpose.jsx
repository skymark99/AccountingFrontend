import Branches from "../Branches";
import BranchGroup from "../BranchGroup";

export function Purpose({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="purpose">Purpose</label>
      <input
        type="text"
        id="purpose"
        {...register("purpose", {
          required: "Purpose is required",
        })}
      />
      {errors.purpose && (
        <span className="form-group-error">{errors.purpose.message}</span>
      )}
    </div>
  );
}

export function Remark({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="remark">Remark</label>
      <textarea
        id="remark"
        {...register("remark", { required: "Remark is required" })}
      ></textarea>
      {errors.remark && (
        <span className="form-group-error">{errors.remark.message}</span>
      )}
    </div>
  );
}

export function Bank({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="bank">Bank</label>
      <select id="bank" {...register("bank", { required: "Bank is required" })}>
        <option value="">Select Bank</option>
        <option value="HDFC">HDFC</option>
        <option value="RAK">RAK</option>
        <option value="ICICI">ICICI</option>
        <option value="RBL">RBL</option>
        <option value="CASH">CASH</option>
        <option value="BANDAN">BANDAN</option>
      </select>
      {errors.bank && (
        <span className="form-group-error">{errors.bank.message}</span>
      )}
    </div>
  );
}

export function Radio({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="Type">Type</label>
      <div className="type-options">
        <label className="type-option">
          <input
            type="radio"
            value="Debit"
            {...register("type", {
              required: "Select a type",
            })}
          />
          Debited
        </label>
        <label className="type-option">
          <input
            type="radio"
            value="Credit"
            {...register("type", {
              required: "Select a type",
            })}
          />
          Credited
        </label>
      </div>
      {errors.type && (
        <span className="form-group-error">{errors.type.message}</span>
      )}
    </div>
  );
}

export function DateSel({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="date">Date</label>
      <input
        type="date"
        id="date"
        max={new Date().toISOString().split("T")[0]}
        {...register("date", { required: "Date is required" })}
      />
      {errors.date && (
        <span className="form-group-error">{errors.date.message}</span>
      )}
    </div>
  );
}

export function StatusSel({ register, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="status">Status</label>
      <select
        id="status"
        {...register("status", { required: "Select a status" })}
      >
        <option value="">Select Status</option>
        <option value="Paid">Paid</option>
        <option value="Unpaid">Unpaid</option>
        <option value="Postponed">Postponed</option>
      </select>
      {errors.status && (
        <span className="form-group-error">{errors.status.message}</span>
      )}
    </div>
  );
}

export function BranchComponent({
  setSelectedBranches,
  clearErrors,
  selectedBranches,
  errors,
  register,
}) {
  return (
    <div className="form-section">
      <div className="form-row">
        <BranchGroup
          setSelectedBranches={setSelectedBranches}
          clearErrors={clearErrors}
          selectedBranches={selectedBranches}
        />
      </div>
      {errors.branches && (
        <span className="form-group-error">{errors.branches.message}</span>
      )}
      <div className="form-section">
        {selectedBranches.length > 0 && (
          <>
            <h5>Selected Branches and Amounts</h5>
            <div className="grid-container">
              {selectedBranches.map((branch) => (
                <Branches
                  key={branch}
                  branch={branch}
                  register={register}
                  errors={errors}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
