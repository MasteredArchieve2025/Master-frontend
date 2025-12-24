import axios from "axios";
import { baseUrl } from "../../Api/baseUrl";

export const loginApi = async (data) => {
  const res = await axios.post(`${baseUrl}/api/auth/login`, data);
  return res.data;
};

export const signupApi = async (data) => {
  const res = await axios.post(`${baseUrl}/api/auth/signup`, data);
  return res.data;
};

export const forgotPasswordApi = async (data) => {
  const res = await axios.post(
    `${baseUrl}/api/auth/forgot-password`,
    data
  );
  return res.data;
};
