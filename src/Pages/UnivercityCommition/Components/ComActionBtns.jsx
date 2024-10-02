import { Modal } from "antd";
import { useSelector } from "react-redux";
import { useState } from "react";
import PrimaryBlueBtn from "../../../Components/Buttons/PrimaryBlueBtn";
import SecondaryBtn from "../../../Components/Buttons/SecondaryBtn";

function ComActionsBtns() {
  const { universitySelectedItems } = useSelector((state) => state.university);
  return (
    <div className="commition__actions">
      <PrimaryBlueBtn
        style={{
          fontWeight: "700",
          padding: "1rem 3rem",
          fontFamily: "Roboto",
          width: "15rem",
        }}
      >
        + New Entry
      </PrimaryBlueBtn>
      <PrimaryBlueBtn
        style={{ padding: "1rem 2rem" }}
        disabled={universitySelectedItems.length !== 1}
      >
        Edit
      </PrimaryBlueBtn>

      <SecondaryBtn style={{ padding: "1rem 2rem" }}>Log</SecondaryBtn>
    </div>
  );
}

export default ComActionsBtns;
