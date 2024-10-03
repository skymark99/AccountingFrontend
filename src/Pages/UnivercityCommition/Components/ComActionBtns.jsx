import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import PrimaryBlueBtn from "../../../Components/Buttons/PrimaryBlueBtn";
import DeleteBtn from "../../../Components/Buttons/DeleteBtn";
import UniversityForm from "../Forms/UniversityForm";
import UniversityEditForm from "../Forms/UniversityEditForm";
import { delete_commition } from "../../../Services/AxiosService";
import toast from "react-hot-toast";
import {
  resetUniversity,
  setUniversitySelectedItems,
} from "../../../Global-Variables/features/university/universitySlice";

function ComActionsBtns() {
  const { universitySelectedItems } = useSelector((state) => state.university);
  const [loadingDel, setLoadingDel] = useState(false);
  const [isNewEntri, setIsNewEntri] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const handleNewEntri = () => {
    setIsNewEntri((val) => !val);
  };
  const handleEdit = () => {
    setIsEdit((val) => !val);
  };

  const handleDelete = async () => {
    const [item] = universitySelectedItems;
    if (!item) {
      return; // exit if no item is selected
    }

    setLoadingDel(true); // Set loading state to true
    const toastId = toast.loading("Deleting item...");

    try {
      await delete_commition(item?._id);

      dispatch(resetUniversity());
      dispatch(setUniversitySelectedItems([]));

      // If toast.update is unavailable, use dismiss and success
      toast.dismiss(toastId);
      toast.success("Item deleted successfully", {
        autoClose: 3000,
      });
    } catch (e) {
      // Handle errors appropriately
      toast.dismiss(toastId);
      toast.error("Error deleting item", {
        autoClose: 3000,
      });
      console.error("Error during deletion:", e);
    } finally {
      setLoadingDel(false); // Ensure loading state is cleared regardless of success or failure
    }
  };
  return (
    <div className="commition__actions">
      <PrimaryBlueBtn
        onClick={handleNewEntri}
        style={{
          fontWeight: "700",
          padding: "1rem 3rem",
          fontFamily: "Roboto",
          width: "15rem",
        }}
      >
        + New Entry
      </PrimaryBlueBtn>

      <Modal
        open={isNewEntri}
        onCancel={handleNewEntri}
        footer={null}
        width={"50%"}
      >
        <h4 className="form-head">New entry for Commition</h4>
        <UniversityForm />
      </Modal>

      <PrimaryBlueBtn
        onClick={handleEdit}
        style={{ padding: "1rem 2rem" }}
        disabled={universitySelectedItems.length !== 1}
      >
        Edit
      </PrimaryBlueBtn>

      <Modal open={isEdit} onCancel={handleEdit} footer={null} width={"50%"}>
        <h4 className="form-head">Edit Commition Details</h4>
        {isEdit && <UniversityEditForm />}
      </Modal>

      <DeleteBtn
        onClick={handleDelete}
        disabled={universitySelectedItems.length !== 1 || loadingDel}
        style={{ padding: "1rem 2rem" }}
      >
        Delete
      </DeleteBtn>
    </div>
  );
}

export default ComActionsBtns;
