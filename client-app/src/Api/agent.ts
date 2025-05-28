// src/Api/agent.ts

import axios from "axios";
import { LogInFormValues, RegisterFormValues } from "../Models/User";

export const baseURL = "https://localhost:44376/";

export const RegisterUserApi = async (values: RegisterFormValues) => {
  return axios.post(`${baseURL}api/User/register`, values, {
    headers: { "Content-Type": "application/json" },
  });
};

export const LogInUserApi = async (values: LogInFormValues) => {
  return axios.post(`${baseURL}api/User/login`, values, {
    headers: { "Content-Type": "application/json" },
  });
};

export const GetAllUsersApi = async () => {
  return axios.get(`${baseURL}api/User/GetAllUsers`);
};

export const GetUserDetailsApi = (id: string) => {
  return axios.get(`${baseURL}api/User/${id}`);
};

export const DeleteUserApi = (id: string) => {
  return axios.delete(`${baseURL}api/User/${id}`);
};

// ✅ NEW: Get users by role
export const GetUsersByRoleApi = (role: string) => {
  return axios.get(`${baseURL}api/User/GetUsersByRole/${role}`);
};

