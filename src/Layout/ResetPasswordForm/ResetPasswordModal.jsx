import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import "./ResetPasswordModal.css"; // Import custom styles
import { setIsNewPassword } from "../../Global-Variables/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Services/AxiosService";
import toast from "react-hot-toast";

function ResetPasswordModal() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isNewPassword } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setIsNewPassword(false));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const toasetId = toast.loading("Updating password");
    if (password != confirmPassword) {
      toast.error("Password did not matching", { id: toasetId });
      return;
    }

    try {
      await resetPassword(password);
      toast.success("Password updated Successfully", { id: toasetId });
      setIsLoading(false);
      handleClose();
    } catch (err) {
      toast.error("Something went wrong", { id: toasetId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={isNewPassword}
      footer={null}
      className="reset-password-modal"
      onCancel={handleClose}
    >
      <div className="modal-content">
        <h2 className="modal-title">Reset Your Password</h2>
        <Form
          name="reset_password"
          className="reset-form"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your new password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="reset-btn"
              size="large"
              block
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default ResetPasswordModal;
