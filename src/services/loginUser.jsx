import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_SERVER;

const loginUser = async (input) => {
  const response = await axios.post(`${baseUrl}login`, input);
  return response.data; // { token: "QpwL5tke4Pnpja7X4" }
};

// Custom Hook untuk login dengan React Query
export const useLogin = () => {
  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate(); // Gunakan useNavigate

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setCookie("token", data.token, { path: "/", expires: new Date(Date.now() + 86400000) });
      toast.success("Login Berhasil!",{
        position: "top-center"
      });
      navigate("/transaksi"); 
    },
    onError: (error) => {
        toast.error((error.response?.data?.error || error.message),{
            position: "top-center"
        });
    },
  });
};
