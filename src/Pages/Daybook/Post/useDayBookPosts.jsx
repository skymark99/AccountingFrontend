import axios from "axios";

const URL = import.meta.evn.VITE_URL;

export async function createTransaction(formData) {
  try {
    await axios.post(`${URL}/v1/transaction`, formData);
  } catch (err) {
    return err.response;
  }
}
