import axios from "axios";
import { toast } from "react-toastify";

const displayError = (error : unknown) => {
  const message = axios.isAxiosError(error) && error.response?.data?.error
        ? error.response.data.error
        : 'Something went wrong';
        toast.error(message);
}

export default displayError;