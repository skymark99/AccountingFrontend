import { branches } from "../../data/generalDatas";
import BranchesSelector from "../Buttons/BranchesSelector";
import { toggleBranch } from "./HelperFunctions";

function BranchGroup({ setSelectedBranches, clearErrors, selectedBranches }) {
  return (
    <div className="form-group">
      <div htmlFor="Branches" className="branch-label">
        Branches
      </div>
      <div className="branch-group">
        {branches.slice(1).map((branch) => (
          <BranchesSelector
            key={branch}
            isActive={selectedBranches.includes(branch)}
            onClick={() =>
              toggleBranch(
                branch,
                setSelectedBranches,
                clearErrors,
                selectedBranches.length
              )
            }
          >
            {branch}
          </BranchesSelector>
        ))}
      </div>
    </div>
  );
}

export default BranchGroup;
