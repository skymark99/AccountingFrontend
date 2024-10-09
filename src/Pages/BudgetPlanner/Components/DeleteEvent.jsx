import { Popconfirm } from "antd";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { QuestionCircleOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { budgetPlannerDeleteEvent } from "../../../Services/AxiosService";
import { useDispatch } from "react-redux";
import { getCalcBudget } from "../../../Global-Variables/features/BudgetPlannerSlice/budgetPlannerSlice";

function DeleteEvent({ id }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await budgetPlannerDeleteEvent(id);
      dispatch(getCalcBudget());
      toast.success("Plan deleted successfully");
    } catch (error) {
      toast.error("Error while deleting event");
    }
  };
  return (
    <Popconfirm
      title="Delete the plan"
      description="Are you sure to delete this plan?"
      onConfirm={() => handleDelete(id)}
      icon={
        <QuestionCircleOutlined
          style={{
            color: "red",
          }}
        />
      }
    >
      <MdOutlineDeleteSweep title="Delete" className="delete-planner" />
    </Popconfirm>
  );
}

export default DeleteEvent;
