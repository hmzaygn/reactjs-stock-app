import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = "http://127.0.0.1:8000/";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const useAxios = () => {
  const { token } = useSelector((state) => state.auth);

  const axiosWithToken = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Token ${token}` },
  });

  return { axiosWithToken };
};

export default useAxios;
