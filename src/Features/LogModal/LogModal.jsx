import { Modal } from "antd";
import DaybookLog from "../../Pages/Daybook/Components/DaybookData/DaybookLogs";

function LogModal({ isLog, handleIsLog }) {
  return (
    <Modal
      open={isLog}
      onCancel={handleIsLog}
      footer={null}
      className="daybook-log-modal"
    >
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div
          className="modal-header"
          style={{ padding: "1rem", borderBottom: "1px solid #e8e8e8" }}
        >
          <span>Logs</span>
        </div>
        <div style={{ flexGrow: 1, overflow: "hidden" }}>
          <DaybookLog />
        </div>
      </div>
    </Modal>
  );
}

export default LogModal;
