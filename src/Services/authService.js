import axios from "axios";

const URL = import.meta.env.VITE_URL;

export const sendOtp = async (email) => {
  return await axios.post(
    `${URL}/v1/user/login-otp`,
    { email },
    { withCredentials: true }
  );
};
export const verifyOtp = async (email, otp) => {
  return await axios.post(
    `${URL}/v1/user/verify-otp`,
    { email, otp },
    { withCredentials: true }
  );
};
