import toast from "react-hot-toast";

export default function toasting(type = "success", message) {
  if (type === "success") {
    toast.success(message, {
      duration: 3000,
      position: "top-center",
      style: {
        background: "white",
        color: "green",
        fontSize: "1.5rem",
      },
    });
  } else if (type === "error") {
    toast.error(message, {
      duration: 3000,
      position: "top-center",
      style: {
        background: "white",
        color: "red",
        fontSize: "1.5rem",
      },
    });
  }
}
