import { useState, useEffect } from "react";
import { sendOtp, verifyOtp } from "../../Services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsNewPassword } from "../../Global-Variables/features/auth/authSlice";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [seconds, setSeconds] = useState(600);
  const [isResendAvailable, setIsResendAvailable] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Start countdown timer after OTP is sent
  useEffect(() => {
    let timer;
    if (isOtpSent && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsResendAvailable(true);
      setIsOtpSent(false);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, seconds]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const loadingToastId = toast.loading("Sending OTP..."); // Show loading toast
    try {
      await sendOtp(email);
      toast.success("OTP sent to your email", { id: loadingToastId });
      setIsOtpSent(true);
      setIsResendAvailable(false);
      setSeconds(600);
    } catch (err) {
      toast.error(err.response.data.message, { id: loadingToastId }); // Replace loading toast with error
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    const loadingToastId = toast.loading("Verifying OTP..."); // Show loading toast
    try {
      await verifyOtp(email, otp);
      toast.success("OTP Verified!", { id: loadingToastId });
      dispatch(setIsNewPassword(true));
      navigate("/");
      setIsOtpVerified(true);
    } catch (err) {
      toast.error(err.response.data.message, { id: loadingToastId });
    } finally {
      setIsVerifying(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  return (
    <div className="login-section">
      {!isOtpVerified ? (
        <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}>
          <label
            style={{ textWrap: "nowrap" }}
            htmlFor="chk"
            aria-hidden="true"
            className="forgot-password-label"
          >
            Forgot Password
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isOtpSent || isSending} // Disable email input when OTP is sent or sending
          />
          {isOtpSent && seconds > 0 && (
            <>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={isVerifying} // Disable OTP input when verifying
              />
              <div className="timer">
                <p className="resend-otp-text">
                  Resend OTP in: {formatTime(seconds)}
                </p>
              </div>
            </>
          )}
          {isOtpSent && seconds > 0 ? (
            <button
              type="submit"
              disabled={isVerifying}
              style={isSending ? { opacity: "0.5" } : { opacity: "1" }}
            >
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSending}
              style={isSending ? { opacity: "0.5" } : { opacity: "1" }}
            >
              {isSending ? "Sending..." : "Send OTP"}
            </button>
          )}
        </form>
      ) : (
        <p>OTP Verified! You can now reset your password.</p>
      )}
    </div>
  );
}

export default ForgotPassword;
