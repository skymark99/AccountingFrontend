export function toggleBranch(branch, setSelectedBranches, clearErrors, length) {
  setSelectedBranches((prev) =>
    prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch]
  );

  if (length === 0) {
    clearErrors("branches");
  }
}

export const validateBranches = (length, setError) => {
  if (length === 0) {
    setError("branches", {
      type: "manual",
      message: "At least one branch must be selected",
    });
    return false;
  }
  return true;
};
