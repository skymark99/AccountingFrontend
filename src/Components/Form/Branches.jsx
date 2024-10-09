function Branches({ branch, register, errors, defaultValue = "" }) {
  return (
    <div key={branch} className="grid-item">
      <label htmlFor={`amount_${branch}`}>{branch}</label>
      <div className="amount-field ">
        <input
          type="number"
          id={`amount_${branch}`}
          step="any"
          defaultValue={defaultValue}
          {...register(`amount_${branch}`, {
            required: "Amount is required",
            min: {
              value: 0,
              message: "Amount must be positive",
            },
          })}
        />
      </div>
      {errors[`amount_${branch}`] && (
        <span className="form-group-error">
          {errors[`amount_${branch}`].message}
        </span>
      )}
    </div>
  );
}

export default Branches;
