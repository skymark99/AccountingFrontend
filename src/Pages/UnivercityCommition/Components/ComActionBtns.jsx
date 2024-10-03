import { Modal } from "antd";
import { useSelector } from "react-redux";
import { useState } from "react";
import PrimaryBlueBtn from "../../../Components/Buttons/PrimaryBlueBtn";
import DeleteBtn from "../../../Components/Buttons/DeleteBtn";
import UniversityForm from "../Forms/UniversityForm";
import UniversityEditForm from "../Forms/UniversityEditForm";

function ComActionsBtns() {
  const { universitySelectedItems } = useSelector((state) => state.university);

  const [isNewEntri, setIsNewEntri] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleNewEntri = () => {
    setIsNewEntri((val) => !val);
  };
  const handleEdit = () => {
    setIsEdit((val) => !val);
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
        <UniversityEditForm />
      </Modal>

      <DeleteBtn
        disabled={universitySelectedItems.length < 1}
        style={{ padding: "1rem 2rem" }}
      >
        Delete
      </DeleteBtn>
    </div>
  );
}

export default ComActionsBtns;
