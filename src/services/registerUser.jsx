import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast

const baseUrl = process.env.REACT_APP_SERVER;

const registerUser = async (input) => {
  const response = await axios.post(`${baseUrl}register`, input);
  return response.data; 
};

// Custom Hook untuk register dengan React Query
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registrasi Berhasil! Silakan login.", {
        position: "top-center"
      });
      navigate("/"); 
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ,{
        position: "top-center"
      });
    },
  });
};
