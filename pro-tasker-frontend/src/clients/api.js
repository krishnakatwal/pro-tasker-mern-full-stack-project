// A library used to make HTTP requests (like GET, POST, etc.) to your backend.
import axios from "axios";

//helper function, gets the JWT token from the browser’s localStorage, Whenever you call token(), it returns the saved token.
//Token Function

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const token = () => localStorage.getItem("token");

//Creating userClient
const userClient = axios.create({
  baseURL: `${BASE_URL}/api/users`,
  headers: {
    Authorization: `Bearer ${token()}`,
  },
});

//Creating projectClient
export const projectClient = axios.create({
  baseURL: `${BASE_URL}/api/projects`,
});

//Interceptor
// use the latest version of the token in local storage
projectClient.interceptors.request.use((req) => {
  if (token()) req.headers.Authorization = `Bearer ${token()}`;
  return req;
});

//Creating taskClient
export const taskClient = axios.create({
  baseURL: `${BASE_URL}/api/tasks`,
});

taskClient.interceptors.request.use((req) => {
  if (token()) req.headers.Authorization = `Bearer ${token()}`;
  return req;
});
