import { toast } from "react-toastify";
const ToastCustomize = (message ) => {
  return toast(`🦄 ${message}!`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export default ToastCustomize;